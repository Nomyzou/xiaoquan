'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { content, picUrls } = event;

  try {
    // 获取当前用户的 openid
    const openid = `mock-openid-${Date.now()}`;

    // 添加回答到数据库
    await db.collection('answers').add({
      content,
      picUrls,
      openid,
      createTime: Date.now()
    });

    return {
      code: 0,
      message: '回答提交成功'
    };
  } catch (err) {
    console.error('回答提交失败：', err);
    return {
      code: -1,
      message: '回答提交失败'
    };
  }
}; 