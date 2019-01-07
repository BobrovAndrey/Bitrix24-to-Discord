const { data, embeds } = require('../bitrix-parser.js')
const { post } = require('../bitrix-sender')
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL

module.exports = async function (context) {
  try {
    const leadId = data(context).leadId
    const bitrixDomain = data(context).bitrixDomain

    let payload = embeds(`New lead was recently created #${leadId}`, `https://${bitrixDomain}/crm/lead/details/${leadId}`, bitrixDomain)
    await post(DISCORD_WEBHOOK_URL, payload)
      .then(responce => console.log(responce))
      .catch(err => console.log(err))
  } catch (error) {
    throw new Error(error)
  }
}
