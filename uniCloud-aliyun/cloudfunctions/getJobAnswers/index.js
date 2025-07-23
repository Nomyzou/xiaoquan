const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const { jobId } = event
	
	// 如果没有提供jobId，返回错误
	if (!jobId) {
		return {
			code: -1,
			msg: '未提供职位ID',
			data: []
		}
	}
	
	try {
		// 从job-answers表中查询与该职位相关的问答
		const answersData = await db.collection('job-answers')
			.where({
				jobId: jobId
			})
			.orderBy('createTime', 'desc') // 按创建时间降序排列
			.get()
		
		// 返回查询结果
		return {
			code: 0,
			msg: '获取成功',
			data: answersData.data
		}
	} catch (error) {
		console.error('获取职位问答失败:', error)
		return {
			code: -1,
			msg: '获取职位问答失败',
			data: []
		}
	}
}; 