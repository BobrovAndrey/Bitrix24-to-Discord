/**
* Bitrix24 to Discord data courier
*/

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

module.exports = async function (context) {
  // Dependencies
  console.log('Hello, it`/s bitrix24 to Discord data courier\n')
  // const newPost = (post) => {
  //   let options = {
  //     method: 'POST',
  //     'embeds': [
  //       {
  //         'title': `New lead #${incomingLeadId}`,
  //         // 'description': 'Request for invoice',
  //         'url': incomingLeadId,
  //         'author': {
  //           'name': 'ACME Inc.'
  //         }
  //       }
  //     ],
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   }
  //   return got('https://discordapp.com/api/webhooks/525296886060679169/Soicvoi3qNA7FS8XDQGB8xYi117rpm20hIqOleG0Bhn65HsZK2yLCGTf8utg3x3mErXM', options)
  //     .then(console.log('SEND'))
  //     .cath(error => console.error(`Error ${error}`))
  // }

  let incomingLeadId = context.params['data[FIELDS][ID]']

  console.log(typeof (incomingLeadId))
  
  incomingLeadId = incomingLeadId !== undefined && typeof (incomingLeadId) === 'string' ? incomingLeadId : false
  if (incomingLeadId) {
    let xhr = new XMLHttpRequest()
    console.log('1')
    xhr.open('POST', 'https://discordapp.com/api/webhooks/525296886060679169/Soicvoi3qNA7FS8XDQGB8xYi117rpm20hIqOleG0Bhn65HsZK2yLCGTf8utg3x3mErXM', false)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    console.log('2')
    let payload = {
      'embeds': [
        {
          'title': `New lead #${incomingLeadId}`,
          // 'description': 'Request for invoice',
          'url': incomingLeadId,
          'author': {
            'name': 'ACME Inc.'
          }
        }
      ]
    }
    console.log('3')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 204) {
        console.log(`Notification for lead ${incomingLeadId} was sent successfully with payload: `, payload)
      } else {
        throw new Error(`Sending data to Discord unsuccessful.\nXHR readyState: ${xhr.readyState}\nXHR status: ${xhr.status}`)
      }
    }
    console.log('4')
    xhr.send(JSON.stringify(incomingLeadId))
    console.log('5')
  } else {
    throw new Error(`Error, requst did not contain any lead id information of lead id information type did not mutch "string",${incomingLeadId}`)
  }
}
