/**
 * 微博数据格式校验
 */

const validator = require('./_validate');

// TODO: 如果输入的content和image都为空，应该判断为失败
const Schema = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
    },
    image: {
      type: 'string',
      maxLength: 255,
    },
  },
  minProperties: 1,
};

/**
 * 校验微博数据格式
 * @param {Object} data 微博数据
 */
function blogValidate(data) {
  return validator(Schema, data);
}

module.exports = blogValidate;
