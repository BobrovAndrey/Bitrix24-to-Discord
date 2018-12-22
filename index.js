/*
* Bitrix24 to Discord data courier
* ver 0.2
* made by Bobrov Andrey
* https://github.com/BobrovAndrey
*/

// Dependencies
const http = require('http')
const querystring = require('querystring')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

// Init the server
let server = {}

// Init HTTP request
let xhr = new XMLHttpRequest()

// Init the HTTPS server
server = http.createServer(function (req, res) {
  // server.unifiedServer(req,res);
  res.end('Hello, it`/s bitrix24 to Discord data courier\n')

  // Get the parsed URL
  let parsedUrl = req.url

  // Get the pathname
  let path = parsedUrl.pathname

  // Get the query string
  let queryStringObj = parsedUrl.query

  // Get the headers
  let headers = req.headers

  // Get the HTTP method
  let method = req.method.toLowerCase()

  // Get the payload
  let buffer = ''
  req.on('data', (data) => {
    buffer += data
  })

  // After request got 'end' status -> main logic
  req.on('end', () => {
    let leadId = Object.values(querystring.parse(buffer))[1]
    let bittrexRawAddress = Object.values(querystring.parse(buffer))[3]
    let bittrexAdress = `https://${bittrexRawAddress}/crm/lead/details/${leadId}/`
    let requestBody = {
      'name': 'Bitrix24 to Discord data courier',
      'channel_id': '525295956720222238',
      'token': 'Soicvoi3qNA7FS8XDQGB8xYi117rpm20hIqOleG0Bhn65HsZK2yLCGTf8utg3x3mErXM',
      'avatar': 'http://www.ceo.ru/files/news/news_pics/410.png',
      'guild_id': '525295956720222234',
      'id': '525296886060679169',
      'content': `Lead with ID ${leadId} was created at your Bittrex24 ${bittrexAdress} account`
    }
    let requestBodyTrue = JSON.stringify(requestBody)

    // Logging all data, that may be useful
    console.log(`Request method: ${method}`)
    console.log(`Path is: `, path)
    console.log(`Query String Object`, queryStringObj)
    console.log(`Request received with headers: ${headers}`)
    console.log(`Request received with payload: ${buffer}`)
    console.log('Birrex24: ', bittrexAdress)
    console.log('Lead ID is: ', leadId)

    xhr.open('POST','https://discordapp.com/api/webhooks/525296886060679169/Soicvoi3qNA7FS8XDQGB8xYi117rpm20hIqOleG0Bhn65HsZK2yLCGTf8utg3x3mErXM',false);

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
   
    console.log(requestBodyTrue);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          console.log('Success:', xhr.readyState);
        } else {
          console.log('Error', xhr.readyState);
        }
      }

    xhr.send(requestBodyTrue);
  });
});

//Start the server + tell him to listen
server.listen(80, function(){
  console.log('The server is listening on port 80 now');
});