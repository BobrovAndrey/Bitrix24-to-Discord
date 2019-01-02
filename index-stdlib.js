// /**
// * Bitrix24 to Discord data courier
// */

// const fetch = require('node-fetch')
const got = require('got')

module.exports = async function (context) {
  console.log('Hello, it`/s bitrix24 to Discord data courier\n')
  console.log('This is a new request')
  try {
    let leadId = context.params['data[FIELDS][ID]']
    let bitrixDomain = context.params['auth[domain]']

    let leadUrl = `https://${bitrixDomain}/crm/lead/details/${leadId}/`

    // let gotData = {"content": `${leadId}`}
    let gotData = { 'embeds': [
      {
        'title': `New lead was recently created #${leadId}`,
        // 'description': 'Request for invoice',
        'url': leadUrl,
        'author': {
          'name': bitrixDomain
        }
      }
    ]
    }

    leadId = leadId !== undefined && typeof (leadId) === 'string' ? leadId : false

    if (leadId) {
      await got.post('https://discordapp.com/api/webhooks/525296886060679169/Soicvoi3qNA7FS8XDQGB8xYi117rpm20hIqOleG0Bhn65HsZK2yLCGTf8utg3x3mErXM', {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify(gotData)
      })
    } else {
      throw new Error(`Error, requst did not contain any lead id information of lead id information type did not mutch "string" type,${leadId}`)
    }
  } catch (error) {
    console.error('Error, while asign "incomingLeadId"', error)
  }
}
