/**
* Bitrix24 to Discord data courier
* @param {string} req Who you're saying hello to
*/
// // Dependencies
const http = require('http')
const querystring = require('querystring')
// const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const lib = require('lib')

// const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL
const DISCORD_WEBHOOK_URL = 'https://discordapp.com/api/webhooks/525296886060679169/Soicvoi3qNA7FS8XDQGB8xYi117rpm20hIqOleG0Bhn65HsZK2yLCGTf8utg3x3mErXM'

// Buffer example const buffer = 'event=ONCRMLEADADD&data%5BFIELDS%5D%5BID%5D=365&ts=1545851621&auth%5Bdomain%5D=b24-46hovy.bitrix24.ru&auth%5Bclient_endpoint%5D=https%3A%2F%2Fb24-46hovy.bitrix24.ru%2Frest%2F&auth%5Bserver_endpoint%5D=https%3A%2F%2Foauth.bitrix.info%2Frest%2F&auth%5Bmember_id%5D=1b87798bc2d16c4b7f2a604e0c899a34&auth%5Bapplication_token%5D=o8kfcne3du24sfvoeahh43uf9oygu2x3'

module.exports = async function (reqest = '', response = '') {
  // Init the HTTPS server
  http.createServer(function (req, res) {
    this.req = reqest
    this.res = response

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
        let data = querystring.parse(buffer)
        console.log(buffer)
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
  }).listen(8170, function () {
    console.log('The server is listening on port 8170 now')
  })
}
