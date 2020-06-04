const blog = require('../db/model/Blog');

/**
 * 创建微博
 */
async function createBlog(userId, content, image) {
  const res = await blog.create({
    userId,
    content,
    image,
  });
  console.log(res);
  return res.dataValues;
}

module.exports = {
  createBlog,
};
