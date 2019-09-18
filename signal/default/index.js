const crypto = require('crypto');
const AWS = require("aws-sdk")
const DDB = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const WSAPI = new AWS.ApiGatewayManagementApi({
    apiVersion: "2018-11-29",
    endpoint: process.env.WS_ENDPOINT
})

/*
    Initialise a connection

    cases: 
        1. new client - create client if uuid not exists
            {"type": "setup", "uuid": "foobar"}

        2. returning client - (check token) update
            {"type": "setup", "uuid": "foobar", "token": "abc"}
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


    console.log("Q: ", JSON.stringify(params))

    try {
        await DDB.putItem(params).promise()

        const resp = { uuid, token }

        await WSAPI.postToConnection({ ConnectionId, Data: "COOL: " + JSON.stringify(resp) }).promise()

    } catch (e) {
        if (e.code == 'ConditionalCheckFailedException') {
            // TODO - check response based on returning

            await WSAPI.postToConnection({ ConnectionId, Data: "NOPE: " + JSON.stringify(e) }).promise()
        } else {
            throw e
        }
    }

    return {
        statusCode: 200,
        body: "ok"
    }
}


/*
    Send a message
        {type: "send", from: 'foobar', to: 'asdfas', body: 'helo'}
*/
const handleSend = async (message, ConnectionId) => {
    const { from, to, body } = message;

    // TODO - check that the client is who they say they are
    // ignore self-checking for now
    // THIS IS WHY JWT WOULD BE GOOD

    const response = await DDB.getItem({
        Key: {
            "Uuid": {
                S: to
            },
        },
        TableName: process.env.TABLE_NAME
    }).promise();

    console.log("RES", JSON.stringify(response));


    await WSAPI.postToConnection({
        ConnectionId: response.Item.ConnectionId.S,
        Data: body
    }).promise()


    return {
        statusCode: 200,
        body: "ok"
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

    } catch (e) {

        // tmp
        await WSAPI.postToConnection({
            ConnectionId: event.requestContext.connectionId, Data: "ERROR: " + JSON.stringify(e)
        }).promise()


        return {
            statusCode: 500,
            body: e.stack
        }
    }
};
