
const twillio = require('twilio');
const client = twillio(process.env.TWILLIO_SID, process.env.TWILLIO_AUTH);

exports.handler = async () => ({
    body: JSON.stringify({
        type: 'twillio',
        token: await client.tokens.create()
    })
})
