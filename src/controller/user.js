const {
  getUserInfo,
  createUser,
  updateUser,
  updatePwd,
} = require('../services/user');
const {SuccessModel, ErrorModel} = require('../model/ResModel');
const doCrypto = require('../utils/crypto');
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  changeInfoFailInfo,
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

/**
 * 退出登录
 * @param {Object} ctx
*/
async function logout (ctx) {
  delete ctx.session.userInfo;
  return new SuccessModel()
}

/**
 * 补充用户信息
 * @param {String} nickName 用户昵称
 * @param {String} city 城市
 * @param {String} picture 头像地址
 */
async function changeInfo({ctx, nickName, city, picture}) {
  const {userName, id} = ctx.session.userInfo;
  if (!nickName) {
    nickName = userName;
  }
  const res = await updateUser({
    newNickName: nickName,
    newCity: city,
    newPicture: picture,
    userName,
    userId: id,
  });
  if (res) {
    return new SuccessModel();
  }
  return new ErrorModel(changeInfoFailInfo);
}

/**
 * 修改密码
 * @param {Object} ctx koa 上下文
 * @param {String} password 原密码
 * @param {String} newPassword 新密码
 */
async function changePwd({ctx, password, newPassword}) {
  const res = await updatePwd(password, newPassword);
  if (res) {
    return new SuccessModel();
  }
  return new ErrorModel({
    errno: 10000,
    message: '密码修改失败，请检查原密码是否正确！',
  });
}

module.exports = {
  isExist,
  register,
  login,
  changeInfo,
  changePwd,
  logout
};
