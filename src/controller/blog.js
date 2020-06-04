const {createBlog} = require('../services/blog');
const {SuccessModel, ErrorModel} = require('../model/ResModel');
const {createBlogFailInfo} = require('../model/ErrorInfo');

/**
 * 创建微博
 */
async function create(userId, content, image) {
  const res = await createBlog(userId, content, image);
  if (res) {
    return new SuccessModel();
  }
  return ErrorModel(createBlogFailInfo);
}

module.exports = {
  create,
};
