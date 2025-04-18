'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { tableName, id } = event;

  try {
    // 查询对应表的数据
    const res = await db.collection(tableName).doc(id).get();
    if (res.data) {
      return {
        code: 0,
        message: '获取讨论详情成功',
        data: res.data
      };
    } else {
      return {
        code: -1,
        message: '未找到讨论详情'
      };
    }
  } catch (err) {
    console.error('获取讨论详情失败：', err);
    return {
      code: -1,
      message: '获取讨论详情失败'
    };
  }
};