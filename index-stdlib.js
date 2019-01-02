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

    let gotData = { 'embeds': [
      {
        'title': `New lead was recently created #${leadId}`,
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

/*
// bitrix-to-discord-notify

const discord = require('discord-sender')
const bitrixParser = require('bitrix-webhook-parser')
const bitrix = require('@2bad/iris.crm.bitrix)

module.exports = async function (context) {
    let { leadId, bitrixDomain } = bitrixParser.parseWebhookBody(context.params)
    let leadData = bitrix.fetch('crm.lead.find', leadId)

    let payload = {leadData.id, leadData.Name}

    await discord.send(WEBHOOK_URL, payload )
    await sms.send(NUMBER, payload)
}



let parseWebhookData = function (data) {
    return {
        leadId: data['data[FIELDS][ID]']
        ...

    }
}

*/
