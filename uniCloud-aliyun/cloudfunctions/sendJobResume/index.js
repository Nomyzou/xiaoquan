const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const { jobId, resumeId, employerInfo } = event
	
	// 验证必要参数
	if (!jobId || !resumeId) {
		return {
			code: -1,
			msg: '缺少必要参数',
			data: null
		}
	}
	
	try {
		// 获取用户信息
		const userInfo = context.OPENID ? await db.collection('uni-id-users').where({
			_id: context.OPENID
		}).get().then(res => res.data[0]) : null;
		
		if (!userInfo) {
			return {
				code: -2,
				msg: '用户未登录',
				data: null
			}
		}
		
		// 获取简历信息
		const resumeInfo = await db.collection('user-resumes').where({
			_id: resumeId,
			user_id: userInfo._id
		}).get().then(res => res.data[0]);
		
		if (!resumeInfo) {
			return {
				code: -3,
				msg: '简历不存在',
				data: null
			}
		}
		
		// 获取职位信息
		const jobInfo = await db.collection('content-table').doc(jobId).get().then(res => res.data[0]);
		
		if (!jobInfo) {
			return {
				code: -4,
				msg: '职位不存在',
				data: null
			}
		}
		
		// 记录投递记录
		const result = await db.collection('job-applications').add({
			jobId,
			resumeId,
			userId: userInfo._id,
			employerInfo: {
				...employerInfo,
				jobTitle: jobInfo.jobTitle || '未知职位'
			},
			resumeInfo: {
				name: resumeInfo.name,
				updateTime: resumeInfo.updateTime
			},
			status: 'pending', // 投递状态：pending-待处理，viewed-已查看，interview-邀请面试，rejected-已拒绝
			createTime: Date.now(),
			updateTime: Date.now()
		});
		
		// 返回成功结果
		return {
			code: 0,
			msg: '简历投递成功',
			data: {
				applicationId: result.id
			}
		}
	} catch (error) {
		console.error('投递简历失败:', error)
		return {
			code: -1,
			msg: '投递简历失败',
			data: null
		}
	}
}; 