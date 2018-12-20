/*
* From bitrix24 to discord channel data poster
* ver 0.1  
*
*
*/

//Dependencies
  const https = require ('https');

https.get('https://discordapp.com/api/webhooks/525296886060679169/Soicvoi3qNA7FS8XDQGB8xYi117rpm20hIqOleG0Bhn65HsZK2yLCGTf8utg3x3mErXM',(resp)  =>  {
  let receivedData = '';

  console.log('statusCode:', resp.statusCode);
  console.log('-----------------------------');

  console.log('headers:', resp.headers);
  console.log('-----------------------------');
  
  //When received data 
  resp.on('data',(chunk)=>{
    receivedData += chunk;
  })
  // Print out the results
  resp.on('end', ()=>{
    console.log('-----------------------------');
    console.log(receivedData);
    console.log('-----------------------------');
    console.log(JSON.parse(receivedData));
  });

  }).on('error', (err)=>{
    console.log(err);
    console.log('Error', err.message);
  });
