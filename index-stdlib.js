// /**
// * Bitrix24 to Discord data courier
// */

const got = require('got')
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL

module.exports = async function (context) {
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
      await got.post(DISCORD_WEBHOOK_URL, {
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
