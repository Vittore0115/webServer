const Path = require('path')
const wwwRoot = Path.join(__dirname,'www')
module.exports = {
	indexFile: ["/log.html","/chat.html","/index.html","/test.js","/index.js","/index.php"],
	illealExt: [".json", ".conf"],
	port: 8090,
	wwwRoot
}