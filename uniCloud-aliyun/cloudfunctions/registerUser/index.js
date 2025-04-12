'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { code } = event;

  try {
    // 模拟生成 openid
    const openid = `mock-openid-${Date.now()}`;

    // 查询用户是否已注册
    const userCollection = db.collection('users');
    const user = await userCollection.where({
      openid: openid
    }).get();

    if (user.data.length === 0) {
      // 用户未注册，进行注册
	  console.log('后端',user.data)
      await userCollection.add({
        openid: openid,
        createTime: Date.now()
      });
    }

    // 生成 token 并返回
    const token = generateToken(openid);
    return {
      code: 0,
      message: '登录成功',
      token: token
    };
  } catch (err) {
    console.error('登录失败：', err);
    return {
      code: -1,
      message: '登录失败'
    };
  }
};

// 生成 token 的简单示例
function generateToken(openid) {
  // 这里可以使用 JWT 或其他方式生成 token
  return `mock-token-${openid}`;
} 