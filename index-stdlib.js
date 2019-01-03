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

/*
const parser = require('./parser')

let context = { params: { event: 'ONCRMLEADADD',
  'data[FIELDS][ID]': '709',
  ts: '1546509550',
  'auth[domain]': 'b24-46hovy.bitrix24.ru',
  'auth[client_endpoint]': 'https://b24-46hovy.bitrix24.ru/rest/',
  'auth[server_endpoint]': 'https://oauth.bitrix.info/rest/',
  'auth[member_id]': '1b87798bc2d16c4b7f2a604e0c899a34',
  'auth[application_token]': 'o8kfcne3du24sfvoeahh43uf9oygu2x3' }
}

const payload = parser.Payload(null, '525295956720222238', 'Soicvoi3qNA7FS8XDQGB8xYi117rpm20hIqOleG0Bhn65HsZK2yLCGTf8utg3x3mErXM', 'http://www.ceo.ru/files/news/news_pics/410.png', '525295956720222234', '525296886060679169', `Lead with ID was created at your Bittrex24 account`)
console.log(payload)
*/

