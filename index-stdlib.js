/**
* Bitrix24 to Discord data courier
* @param {string} req Who you're saying hello to
*/
// // Dependencies
// const http = require('http')
// const querystring = require('querystring')
// const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const lib = require('lib')
// const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL
const DISCORD_WEBHOOK_URL = 'https://discordapp.com/api/webhooks/525296886060679169/Soicvoi3qNA7FS8XDQGB8xYi117rpm20hIqOleG0Bhn65HsZK2yLCGTf8utg3x3mErXM'

module.exports = async function (req = '', callback) {
  console.log(typeof (req))
  // Init the HTTPS server
  lib.createServer(function (req, res) {
    res.end('Hello, it`/s bitrix24 to Discord data courier\n')

    let buffer = ''
    req.on('data', (chunk) => {
      buffer += chunk
    })

    if (!DISCORD_WEBHOOK_URL || !DISCORD_WEBHOOK_URL.includes('discordapp.com/api/webhooks')) {
      throw new Error(`"DISCORD_WEBHOOK_URL" environment variable is not set or does not contain a valid Discord webhook url`)
    }

    // After request got 'end' status -> main logic
    req.on('end', () => {
      try {
        // Parse incoming object
        let data = lib.parse(buffer)
        let leadId = data['data[FIELDS][ID]']
        let bitrixDomain = data['auth[domain]']
        let leadUrl = `https://${bitrixDomain}/crm/lead/details/${leadId}/`

        // Build the payload
        if (leadId && leadUrl) {
          let payload = {
            'embeds': [
              {
                'title': `New lead #${leadId}`,
                // 'description': 'Request for invoice',
                'url': leadUrl,
                'author': {
                  'name': 'ACME Inc.'
                }
              }
            ]
          }

          // Send HTTP request
          let xhr = new XMLHttpRequest()
          xhr.open('POST', DISCORD_WEBHOOK_URL, false)
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 204) {
              console.log(`Notification for lead ${leadId} was sent successfully with payload: `, payload)
            } else {
              throw new Error(`Sending data to Discord unsuccessful.\nXHR readyState: ${xhr.readyState}\nXHR status: ${xhr.status}`)
            }
          }

          xhr.send(JSON.stringify(payload))
        } else {
          console.log('leadId and leadUrl are needed to form a payload, corrupted data was provided: ', data)
        }
      } catch (e) {
        throw new Error(e)
      }
    })
  }).listen(80, function () {
    console.log('The server is listening on port 80 now')
  })
  console.log(`Data is: ${req}`)
}
