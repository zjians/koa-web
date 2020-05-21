const {getUserInfo, createUser} = require('../services/user');
const {SuccessModel, ErrorModel} = require('../model/ResModel');
const doCrypto = require('../utils/crypto');
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
} = require('../model/ErrorInfo');

/**
 * 判断用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    // 存在
    return new SuccessModel(userInfo);
  } else {
    // 不存在
    return new ErrorModel(registerUserNameNotExistInfo);
  }
}

/**
 * 注册用户
 */
async function register({userName, password, gender}) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo);
  }
  try {
    const res = await createUser({userName, password, gender});
    if (res) {
      return new SuccessModel();
    }
  } catch (error) {
    console.error(error.message, error.stack);
    return new ErrorModel(registerFailInfo);
  }
}

/**
 * 登录
 */
async function login({userName, password, ctx}) {
  const userInfo = await getUserInfo(userName, doCrypto(password));
  if (userInfo) {
    ctx.session.userInfo = userInfo;
    return new SuccessModel(userInfo);
  }
  return new ErrorModel(registerUserNameNotExistInfo);
}

module.exports = {
  isExist,
  register,
  login,
};
