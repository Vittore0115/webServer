//引进http模块
const Http = require('http')

//自定义端口
const port = 3000

//引进url模块
const url = require('url')
// 创建请求句柄
const requestHandle = (req, res) => {
	// url.parse可以将req.url解析成一个对象,里面包含有pathname和querystring等参数
	const urlObject = url.parse(req.url)

	switch (req.method) {
		case 'GET':
			getGetParam(urlObject, res) //获取参数并返回数据
			break
		case 'POST':
			getPostParam(urlObject, req, res) //获取参数并返回数据
			break
	}
}

//Get请求
const getGetParam = (urlObject, res) => {
	const resData = {
		code: 0,
		msg: 'success',
		data: [
			{ id: 0, name: '张三' },
			{ id: 1, name: '李四' },
		],
	}
	//我们定义以'/api/get'的为Get请求
	if (urlObject.pathname.startsWith('/api/get')) {
		// 再判断路由
		if (urlObject.pathname === '/api/get/users') {
			res.setHeader('Content-Type', 'application/json;charset=UTF-8')
			res.end(JSON.stringify(resData))
		}
	}
}

//POST请求
const getPostParam = (urlObject, req, res) => {
	const resData = {
		code: 0,
		msg: 'success',
		data: [
			{ id: 0, name: '王五', age: 22, sex: '男' },
			{ id: 1, name: '赵六', age: 24, sex: '男' },
		],
	}
	//我们定义一个formData变量，用于暂存请求体信息
	let formData = ''

	//我们定义以'/api/post'的为post请求
	if (urlObject.pathname.startsWith('/api/post')) {
		// 再判断路由
		if (urlObject.pathname === '/api/post/users') {
			//通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量
			//post请求经常会很长，此时会分段传入
			req.on('data', (chunk) => {
				//将段落合并
				formData += chunk
			})
			//当所有数据发送完毕之后，此时将会触发end事件
			req.on('end', () => {
				// 此时可以做一些逻辑处理，如文件写入等等
				let result = JSON.parse(JSON.stringify(formData))
				console.log('result:', result)

				// 打印如下
				// result: ----------------------------360048846796916393599860
				// Content-Disposition: form-data; name="name"

				// 王五
				// ----------------------------360048846796916393599860
				// Content-Disposition: form-data; name="age"

				// 23
				// ----------------------------360048846796916393599860
				// Content-Disposition: form-data; name="sex"

				// 男
				// ----------------------------360048846796916393599860--

				res.setHeader('Content-Type', 'application/json;charset=UTF-8')
				// 这里我们就先不处理，将定义的数据返回
				res.end(JSON.stringify(resData))
			})
		}
	}
}

//创建请求监听者对象（Server）
const Server = Http.createServer(requestHandle)

Server.listen(port, () => {
	console.log(`Server is running on http://127.0.0.1:${port}/`)
})
