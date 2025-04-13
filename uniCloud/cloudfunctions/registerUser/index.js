'use strict';
const db = uniCloud.database();
const axios = require('axios');

exports.main = async (event, context) => {
  const { code } = event;

  try {
    // 调用微信 API 获取 openid 和 session_key
    const wxRes = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: 'your-appid', // 替换为你的微信小程序 appid
        secret: 'your-secret', // 替换为你的微信小程序 secret
        js_code: code,
        grant_type: 'authorization_code'
      }
    });

    const { openid, session_key } = wxRes.data;

    // 查询用户是否已注册
    const userCollection = db.collection('users');
    const user = await userCollection.where({
      openid: openid
    }).get();

    if (user.data.length === 0) {
      // 用户未注册，进行注册
      await userCollection.add({
        openid: openid,
        createTime: Date.now()
      });
    }

    // 生成自定义登录态
    const token = generateToken(openid);

    // 将 token 与 openid 和 session_key 关联存储到数据库
    await db.collection('user_tokens').add({
      openid,
      session_key,
      token,
      createTime: Date.now()
    });

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