'use strict';
const db = uniCloud.database();
const { ObjectId } = require('mongodb'); // 引入 ObjectId

exports.main = async (event, context) => {
  const { discussionId, content, picUrls } = event;

  try {
    // 获取当前用户的 openid
    const openid = `mock-openid-${Date.now()}`;

    // 创建回答对象
    const answer = {
      content,
      picUrls,
      openid,
      createTime: Date.now()
    };

    // 调试日志
    console.log('discussionId:', discussionId);
    const doc = await db.collection('discussion-inner').doc(ObjectId(discussionId)).get();
    console.log('doc:', doc);

    // 更新 discussion-inner 表，将回答添加到 answers 数组
    const res = await db.collection('discussion-inner').doc(ObjectId(discussionId)).update({
      answers: db.command.push(answer)
    });

    return {
      code: 0,
      message: '回答提交成功',
      data: res
    };
  } catch (err) {
    console.error('回答提交失败：', err);
    return {
      code: -1,
      message: '回答提交失败'
    };
  }
}; 