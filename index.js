/*
* Bitrix24 to Discord data courier
* ver 0.5.0.2
* made by Bobrov Andrey
* https://github.com/BobrovAndrey
*/

// Dependencies
const http = require('http')
const querystring = require('querystring')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL

// Init the HTTPS server
let server = http.createServer(function (req, res) {
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
})

// Start the server + tell him to listen
server.listen(80, function () {
  console.log('The server is listening on port 80 now')
})
