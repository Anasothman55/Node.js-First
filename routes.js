const fs = require('fs')

function requestHandler(req,res){
  const url = req.url;
  const method = req.method;
  if(url === '/'){
    res.write('<html><body> <h1>Main Page Enter Message</h1> <form action="/message" method="POST"><input type="text" name="message" /> <button type="submit">Send</button></form></body></html>');
    return res.end()
  }
  if(url === '/message' && method === 'POST'){
    const body =[]
    req.on('data', (chunk)=>{
      console.log(chunk)
      body.push(chunk)
    });
    return req.on('end', ()=>{
      const parseBody = Buffer.concat(body).toString()
      const message = parseBody.split('=')[1]
      fs.writeFile('message.txt', message, (error)=>{
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end()
      })
    }) 
  }
}

  exports= {
  handler:requestHandler
};