const {User} = require('../db/model');
const {formatUser} = require('./_format');
const doCrypto = require('../utils/crypto');

/**
 * 查询用户信息
 * @param {string} userName
 * @param {string} password
 */
async function getUserInfo(userName, password) {
  const params = {
    userName,
  };
  if (password) {
    Object.assign(params, {password});
  }
  const res = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: params,
  });
  if (res == null) {
    return res;
  }
  return formatUser(res.dataValues);
}

/**
 * 创建用户
 * @param {string} userName
 * @param {string} password
 * @param {string} gender
 * @param {string} nickName
 */
async function createUser({userName, password, gender = 3, nickName}) {
  const res = await User.create({
    userName,
    password: doCrypto(password),
    gender,
    nickName: nickName | userName,
  });
  return res.dataValues;
}

module.exports = {
  getUserInfo,
  createUser,
};
