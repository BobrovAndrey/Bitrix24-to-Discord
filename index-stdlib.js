const got = require('got')
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL

module.exports = async function (context) {
  try {
    let leadId = context.params['data[FIELDS][ID]']
    let bitrixDomain = context.params['auth[domain]']

    let payload = { 'embeds': [
      {
        'title': `New lead was recently created #${leadId}`,
        'url': `https://${bitrixDomain}/crm/lead/details/${leadId}/`,
        'author': {
          'name': bitrixDomain
        }
      }
    ] }

    if (leadId > 0) {
      await got.post(DISCORD_WEBHOOK_URL, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify(payload)
      })
    } else {
      throw new Error(`Incoming webhook payload did not contain valid leadId parameter, got "${leadId}" instead`)
    }
  } catch (error) {
    throw new Error(error)
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
