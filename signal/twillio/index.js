
const client = require('twilio')(process.env.TWILLIO_SID, process.env.TWILLIO_AUTH);

exports.handler = () => ({
    body: JSON.stringify({
        type: 'twillio',
        token: await client.tokens.create()
    })
})
