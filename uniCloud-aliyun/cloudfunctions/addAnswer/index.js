'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  console.log('云函数开始执行');
  console.log('Received event:', JSON.stringify(event, null, 2));

  const { discussionId, content, picUrls, userInfo, token } = event;

  // 确保必要的字段存在
  if (!discussionId || !content) {
    console.error('缺少必要的参数：discussionId 或 content');
    return {
      code: -1,
      message: '缺少必要的参数'
    };
  }

  try {
    // 获取当前用户的 openid（建议使用真实的 openid）
    const openid = context.OPENID || `mock-openid-${Date.now()}`;

    // 创建回答对象
    const answer = {
      content,
      picUrls,
      openid,
      createTime: Date.now(),
      userInfo: {
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl
      }
    };

    console.log('openid:', openid);
    console.log('Answer Object:', answer);

    // 检查文档是否存在
    const docSnapshot = await db.collection('content-table').doc(discussionId).get();
    console.log('Document retrieved, count:', docSnapshot.data.length);

    if (!docSnapshot.data.length) {
      console.error('指定的 discussionId 不存在');
      return {
        code: -1,
        message: '指定的 discussionId 不存在'
      };
    }

    const doc = docSnapshot.data[0];
    console.log('Document:', doc);

    // 更新 discussion-inner 表，将回答添加到 answers 数组
    const res = await db.collection('content-table').doc(discussionId).update({
      answers: db.command.push(answer) // 确保字段名为 answers
    });

    console.log('Update Result:', res);

    return {
      code: 0,
      message: '回答提交成功',
      data: res
    };
  } catch (err) {
    console.error('回答提交失败：', err);
    console.error('错误堆栈：', err.stack);
    return {
      code: -1,
      message: '回答提交失败',
      error: err.message
    };
  }
};