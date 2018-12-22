/*
* From bitrix24 to discord channel data courier
* ver 0.1  
*
*
*/

//Dependencies
  const https = require ('https');
  const http = require('http');
  const url = require('url');
  const StringDecoder = require('string_decoder').StringDecoder;
  // const querystring = require('querystring');
  const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// Init the server 

let server = {};

//Init HTTP request
let xhr = new XMLHttpRequest();


// Init the HTTPS server

server = http.createServer(function(req,res){
  // server.unifiedServer(req,res);
  res.end('ITS ME, MOTHERFUCKER!\n');

  // //Get the parsed URL
  let parsedUrl = req.url;
  let path = parsedUrl.pathname;


  //Get the query string
  let queryStringObj = parsedUrl.query; // Undefined
  
  // Get the headers
  let headers = req.headers;

  //Get the HTTP method
  let method = req.method.toLowerCase();

  //Get the payload 
  const decoder = new StringDecoder('utf-8');
  // let buffer = '';
  // req.on('data', (data) => {
  //   buffer += decoder.write(data);
  // });
  // req.on('end',() => {
  //   buffer += decoder.end();
  //   let finalBuffer = querystring.parse(buffer);

    let buffer = '';
  req.on('data', (data) => {
    buffer += data;
  });

  req.on('end',() => {
    // let finalBuffer = querystring.parse (buffer);
    // let leadID = Object.values(finalBuffer)[1];
    let leadId = Object.values(querystring.parse(buffer))[1];
    let requestBody = {
      "name": "Bitrix24LeadHook",
      "channel_id": "525295956720222238",
      "token": "Soicvoi3qNA7FS8XDQGB8xYi117rpm20hIqOleG0Bhn65HsZK2yLCGTf8utg3x3mErXM",
      "avatar": "https://m.bitrix24.ru/images/b24_logo_mobile_ru.png",
      "guild_id": "525295956720222234",
      "id": "525296886060679169",
      "content" : leadId
    };
    let requestBodyTrue = JSON.stringify(requestBody); 

    // console.log(`Request method: ${ method}`);
    // console.log(`Path is: `,  path);
    // console.log(`Query String Object`, queryStringObj);
    // console.log(`Request received with headers: ${ headers}`);
    // console.log(`Request received with payload: ${ buffer}`);
    // console.log(`---------------------------------------------------------------------`);
    // console.log(finalBuffer);
    // console.log(`---------------------------------------------------------------------`);
    // console.log(Object.keys(finalBuffer));
    console.log('Lead ID is: ',leadId);

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










// //Dependencies
//   const https = require ('https');

// https.get('https://discordapp.com/api/webhooks/525296886060679169/Soicvoi3qNA7FS8XDQGB8xYi117rpm20hIqOleG0Bhn65HsZK2yLCGTf8utg3x3mErXM',(resp)  =>  {
//   let receivedData = '';

//   console.log('statusCode:', resp.statusCode);
//   console.log('-----------------------------');

//   console.log('headers:', resp.headers);
//   console.log('-----------------------------');
  
//   //When received data 
//   resp.on('data',(chunk)=>{
//     receivedData += chunk;
//   })
//   // Print out the results
//   resp.on('end', ()=>{
//     console.log('-----------------------------');
//     console.log(receivedData);
//     console.log('-----------------------------');
//     console.log(JSON.parse(receivedData));
//   });

//   }).on('error', (err)=>{
//     console.log(err);
//     console.log('Error', err.message);
//   });
