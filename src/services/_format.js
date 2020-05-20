const {DEFAULT_PICTURE} = require('../conf/constant');

/**
 * 格式化用户头像
 * @param {Object} obj 用户信息
 */
function _formatUserPicture(obj) {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE;
  }
  return obj;
}

/**
 * 格式化用户数据
 * @param {Array|Object}
 */
function formatUser(list) {
  if (list == null) {
    return list;
  }
  if (list instanceof Array) {
    return list.map(_formatUserPicture);
  }
  return _formatUserPicture(list);
}

module.exports = {
  formatUser,
};
