const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let {detail,picurls,hType} = event
	//返回数据给客户端
	await db.collection('content-table').add({
		posttime:Date.now(),
		picurls,
		hType,
		...detail
	})
	return event
};
