const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const { jobId, content, userInfo, createTime } = event
	
	// 验证必要参数
	if (!jobId || !content) {
		return {
			code: -1,
			msg: '缺少必要参数',
			data: null
		}
	}
	
	try {
		// 添加问答到job-answers表
		const result = await db.collection('job-answers').add({
			jobId,
			content,
			userInfo,
			createTime: createTime || Date.now(),
			status: 'active' // 问答状态，可用于后续管理
		})
		
		// 返回成功结果
		return {
			code: 0,
			msg: '添加成功',
			data: result
		}
	} catch (error) {
		console.error('添加职位问答失败:', error)
		return {
			code: -1,
			msg: '添加职位问答失败',
			data: null
		}
	}
}; 