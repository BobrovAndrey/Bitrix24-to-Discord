const got = require('got')

module.exports = async function (context) {
  console.log('Hello, it`/s bitrix24 to Discord data courier\n')
  console.log('This is a new request')

  let incomingLeadId = context.params['data[FIELDS][ID]']
  let gotData = {"content": `${incomingLeadId}`}
  console.log(typeof (incomingLeadId))
  console.log(incomingLeadId)

  // incomingLeadId = incomingLeadId !== undefined && typeof (incomingLeadId) === 'string' ? incomingLeadId : false
  // if (incomingLeadId) {
  const response = await got.post('https://discordapp.com/api/webhooks/525296886060679169/Soicvoi3qNA7FS8XDQGB8xYi117rpm20hIqOleG0Bhn65HsZK2yLCGTf8utg3x3mErXM', {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify(gotData)
  })
  console.log(response.body)