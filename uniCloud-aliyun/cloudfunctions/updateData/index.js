const db = uniCloud.database()

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {page,pageSize}=event
	const skip=(page-1)*pageSize
	return await db.collection("content-table")
	.limit(pageSize).skip(skip)
	.orderBy('posttime','desc')
	.get()
	//返回数据给客户端
	return event
};
