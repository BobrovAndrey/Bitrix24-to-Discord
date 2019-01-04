const got = require('got')
// const fetch = require('node-fetch')
const sender = {}

// sender.post = async function (discordWebhookUrl, payload) {
//   await fetch(discordWebhookUrl, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     body: JSON.stringify(payload)
//   })
//   console.log(response.body)
//     .then(res => res.json())
//     .then(json => console.log(json))
//   console.log(response.body)
// } 
  
sender.gotPost = async function (discordWebhookUrl, payload) {
  await got.post(discordWebhookUrl, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify(payload)
  })
  return (sender.gotPost.body)
}


module.exports = sender

