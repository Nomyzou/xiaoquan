const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const { id } = event
	
	// 如果没有提供ID，返回错误
	if (!id) {
		return {
			code: -1,
			msg: '未提供职位ID',
			data: null
		}
	}
	
	try {
		// 从content-table中查询对应ID的职位信息
		const jobData = await db.collection('content-table')
			.doc(id)
			.get()
		
		// 返回查询结果
		return {
			code: 0,
			msg: '获取成功',
			data: jobData.data[0]
		}
	} catch (error) {
		console.error('获取职位详情失败:', error)
		return {
			code: -1,
			msg: '获取职位详情失败',
			data: null
		}
	}
};