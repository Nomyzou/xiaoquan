'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { token, userInfo } = event;

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

    // 更新 user 表中的用户信息
    const res = await db.collection('users').where({
      openid: openid
    }).update({
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl
    });

    if (res.updated === 1) {
      return {
        code: 0,
        message: '用户信息更新成功'
      };
    } else {
      return {
        code: -1,
        message: '用户信息更新失败'
      };
    }
  } catch (err) {
    console.error('更新用户信息失败：', err);
    return {
      code: -1,
      message: '更新用户信息失败'
    };
  }
}; 