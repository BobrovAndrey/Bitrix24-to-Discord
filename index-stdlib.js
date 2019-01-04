const parser = require('../parser.js')
const sender = require('../sender.js')
// const got = require('got')
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL

module.exports = async function (context) {
  console.log('NEW REQUEST--------------------')
  try {
    const leadId = parser.data(context).leadId
    const bitrixDomain = parser.data(context).bitrixDomain

    let payload = parser.embeds(`New lead was recently created #${leadId}`, `https://${bitrixDomain}/crm/lead/details/${leadId}`, bitrixDomain)
    // let payload2 = { 'embeds': [
    //   {
    //     'title': `New lead was recently created #${leadId}`,
    //     'url': `https://${bitrixDomain}/crm/lead/details/${leadId}/`,
    //     'author': {
    //       'name': bitrixDomain
    //     }
    //   }
    // ] }
    // let payload3 = parser.payload('Bitrix24 to Discord data courier', '525295956720222238', 'Soicvoi3qNA7FS8XDQGB8xYi117rpm20hIqOleG0Bhn65HsZK2yLCGTf8utg3x3mErXM', 'http://www.ceo.ru/files/news/news_pics/410.png', '525295956720222234', '525296886060679169', `Lead with ID was created at your Bittrex24 account`)
    // console.log('Payload is: ', payload3)

    // const sender = {}
    // sender.gotPost = async 
    // let sender = 
    // async function (DISCORD_WEBHOOK_URL, payload) {
      await got.post(DISCORD_WEBHOOK_URL, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify(payload)
      }, console.log('Payload is: ', payload))
    //  }

    // // sender.gotPost(DISCORD_WEBHOOK_URL, payload3)
    sender.post(DISCORD_WEBHOOK_URL, payload)
  } catch (error) {
    throw new Error(error)
  }
}
