var http = require('http');

http.createServer(function(req, res) {
  res.write("✅ Bot is up");
  res.end();
  console.log('⚙️ 24/7 Module in place.')
}).listen(8080);
