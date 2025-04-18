'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	let {detail,picurls,hType,token} = event

  try {
    // 在 content-table 中插入记录
    const contentRes = await db.collection('content-table').add({
    
	  posttime:Date.now(),
	  picurls,
	  hType,
	  ...detail
    });

    // 获取插入记录的 _id
    const contentId = contentRes.id;

    // 在 discussion-inner 表中插入记录，共享 _id
    await db.collection('discussion-inner').add({
      _id: contentId, // 共享 _id
      ...detail,
	  token,
      createTime: Date.now()
    });

    return {
      code: 0,
      message: '提交成功',
      data: contentId
    };
  } catch (err) {
    console.error('云端提交失败：', err);
    return {
      code: -1,
      message: '云端提交失败return'
    };
  }
};