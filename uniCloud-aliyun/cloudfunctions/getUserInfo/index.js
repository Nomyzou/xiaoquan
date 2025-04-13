'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { token } = event;

  try {
    // 查询 token 对应的 openid 和 session_key
    const tokenInfo = await db.collection('user_tokens').where({
      token: token
    }).get();

    if (tokenInfo.data.length === 0) {
      return {
        code: -1,
        message: '无效的登录态'
      };
    }

    const { openid, session_key } = tokenInfo.data[0];

    // 根据 openid 查询业务数据
    const userInfo = await db.collection('users').where({
      openid: openid
    }).get();

    return {
      code: 0,
      message: '获取业务数据成功',
      data: userInfo.data
    };
  } catch (err) {
    console.error('云端获取业务数据失败：', err);
    return {
      code: -1,
      message: '获取业务数据失败'
    };
  }
};