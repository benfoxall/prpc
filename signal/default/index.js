const crypto = require('crypto');
const AWS = require("aws-sdk")
const DDB = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const WSAPI = new AWS.ApiGatewayManagementApi({
    apiVersion: "2018-11-29",
    endpoint: process.env.WS_ENDPOINT
})


const response = (object) => ({
    body: JSON.stringify(object)
})

/*
    Initialise a connection

    cases: 
        1. new client - create client if uuid not exists
            {"type": "setup", "uuid": "foobar"}

        2. returning client - (check token) update
            {"type": "setup", "uuid": "foobar", "token": "abc"}


    responses:
        {"type": "setup", "uuid": "uuid", "token": "token"}

        {"type": "setup", "uuid": "uuid", "error": "already_exists"}
        {"type": "setup", "uuid": "uuid", "error": "invalid_token"}
*/
const handleSetup = async (message, ConnectionId) => {

    const uuid = message.uuid;
    const token = message.token || crypto.randomBytes(24).toString('base64')

    const returning = Boolean(message.token);

    let params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            Uuid: { S: uuid },
            ConnectionId: { S: ConnectionId },
            Token: { S: token }
        },
    }

    if (returning) {
        // check token matches
        params = {
            ...params,
            ConditionExpression: '#t = :t',
            ExpressionAttributeNames: { '#t': 'Token' },
            ExpressionAttributeValues: { ':t': { S: token } }
        }
    } else {
        // check if it's not already taken
        params = {
            ...params,
            ConditionExpression: 'attribute_not_exists(#u)',
            ExpressionAttributeNames: { '#u': 'Uuid' },
        }
    }

    try {
        await DDB.putItem(params).promise()

        return response({
            type: "setup",
            uuid,
            token
        })


    } catch (e) {

        const error =
            e.code == 'ConditionalCheckFailedException' ?
                (returning ? "token_invalid" : "already_exists") :
                'unknown_error';

        return response({
            type: "setup",
            uuid,
            error
        })

    }

}


/*
    Send a message
        {type: "send", from: 'foobar', to: 'asdfas', body: 'helo'}
*/
const handleSend = async (message, ConnectionId) => {

    // TODO - check that the client is who they say they are
    // ignore self-checking for now
    // THIS IS WHY JWT WOULD BE GOOD

    const { from, to, body } = message;

    if (!body) return response({ error: 'Missing "body"' })

    try {
        const target = await DDB.getItem({
            Key: {
                "Uuid": { S: to },
            },
            TableName: process.env.TABLE_NAME
        }).promise();

        if (!target.Item) {
            return response({ type: "send", error: `Couldn't find peer: ${to}` })
        }

        await WSAPI
            .postToConnection({
                ConnectionId: target.Item.ConnectionId.S,
                Data: JSON.stringify({
                    type: "send",
                    from, to, body
                })
            }).promise()

        return response({ type: "send", ok: true })

    } catch (err) {
        return response({ type: "send", error: err.code || err.stack || 'ERROR' })
    }

}



exports.handler = async (event) => {

    try {
        const connectionId = event.requestContext.connectionId;
        const body = JSON.parse(event.body)

        if (body.type === 'setup') {
            return handleSetup(body, connectionId)
        }

        if (body.type === 'send') {
            return handleSend(body, connectionId)
        }

        if (body.type === 'ping') {
            return response({ type: "pong" })
        }

    } catch (e) {

        return response({
            error: e.stack
        })

    }
};
