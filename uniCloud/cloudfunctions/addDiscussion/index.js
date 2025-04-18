'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { detail, picurls, hType, token } = event;

  try {
    // 根据 token 查询用户的 openid
    const tokenRes = await db.collection('user_tokens').where({
      token: token
    }).get();

    if (tokenRes.data.length === 0) {
      return {
        code: -1,
        message: '未找到用户信息'
      };
    }

    const { openid } = tokenRes.data[0];

    // 在 content-table 中插入记录
    const contentRes = await db.collection('content-table').add({
      head,
      detail,
      picUrls,
      hType,
      createTime: Date.now()
    });

    // 获取插入记录的 _id
    const contentId = contentRes.id;

    // 在 discussion-inner 表中插入记录，共享 _id
    await db.collection('discussion-inner').add({
      _id: contentId, // 共享 _id
      head,
      detail,
      createTime: Date.now()
    });

    return {
      code: 0,
      message: '提交成功',
      data: contentId
    };
  } catch (err) {
    console.error('提交失败：', err);
    return {
      code: -1,
      message: '提交失败'
    };
  }
}; 