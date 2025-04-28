'use strict';
exports.main = async (event, context) => {
  // 初始化 uniCloud 数据库实例
  const db = uniCloud.database();
  const collection = db.collection('content-table'); // 指定集合名称

  try {
    // 校验传入的 _id 是否存在
    if (!event.id) {
      throw new Error('缺少必要参数 _id');
    }

    // 执行删除操作
    const result = await collection.doc(event.id).remove();

    // 返回操作结果
    return {
      code: 200,
      message: `成功删除 ${result.deleted} 条记录`,
      data: result
    };
  } catch (err) {
    // 错误处理
    console.error('删除失败:', err);
    return {
      code: 500,
      message: '删除失败',
      error: err.message
    };
  }
};