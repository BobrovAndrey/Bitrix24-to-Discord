const got = require('got')
let sender = async function (discordWebhookUrl, leadId, payload) {
  discordWebhookUrl = discordWebhookUrl || null
  leadId = leadId || null
  payload = payload || null

  if (leadId !== null && payload !== null) {
    await got.post(discordWebhookUrl, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: JSON.stringify(payload)
    })
  }
}

module.exports = sender
