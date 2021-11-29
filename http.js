var http = require("http");
var server = http.createServer((request, response) => {
    response.write("Http in action")
    response.end()
})
server.listen(5000)