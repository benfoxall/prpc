const AWS = require("aws-sdk")
const WSAPI = new AWS.ApiGatewayManagementApi({
    apiVersion: "2018-11-29",
    endpoint: process.env.WS_ENDPOINT
})

const client = require('twilio')(process.env.TWILLIO_SID, process.env.TWILLIO_AUTH);

exports.handler = async (event) => {

    await WSAPI.postToConnection({
        ConnectionId: event.requestContext.connectionId,
        Data: JSON.stringify({
            type: 'twillio',
            body: await client.tokens.create()
        })
    }).promise()

    return {
        statusCode: 200,
        body: twillio
    }
};
