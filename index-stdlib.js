/**
* Bitrix24 to Discord data courier
*/

const fetch = require('node-fetch')

module.exports = async function (context) {
  console.log('Hello, it`/s bitrix24 to Discord data courier\n')
  console.log('This is a new request')

  let incomingLeadId = context.params['data[FIELDS][ID]']

  console.log(typeof (incomingLeadId))
  console.log(incomingLeadId)

  // incomingLeadId = incomingLeadId !== undefined && typeof (incomingLeadId) === 'string' ? incomingLeadId : false
  // if (incomingLeadId) {
  fetch('https://discordapp.com/api/webhooks/525296886060679169/Soicvoi3qNA7FS8XDQGB8xYi117rpm20hIqOleG0Bhn65HsZK2yLCGTf8utg3x3mErXM', {
    method: 'POST',
    content: JSON.stringify(incomingLeadId),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
    // .then(res.status => console.log (res.status))
    .then(res => res.json())
    .then(json => console.log(json))
  // } else {
  //   throw new Error(`Error, requst did not contain any lead id information of lead id information type did not mutch "string",${incomingLeadId}`)
  // }
}
