const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// return await db.collection("user_table").get()
	
	let {id,name,picurls} = event
	
	db.collection('content-table').add({
		posttime:Date.now(),
		picurls,
		id,
		name
	})
	//返回数据给客户端
	return event
};
