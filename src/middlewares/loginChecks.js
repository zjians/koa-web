/**
 * 中间件 用于检测用户是否登录
 */

/**
 * api 登录验证
 * @param {*} ctx
 * @param {*} next
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    await next();
    return;
  }
  ctx.status = 401;
  ctx.body = {
    errno: 10004,
    message: '未登录',
  };
}

/**
 * 检测页面路由是否登录
 * @param {*} ctx
 * @param {*} next
 */
async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    await next();
    return;
  }
  const curUrl = ctx.url;
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl));
}

module.exports = {
  loginRedirect,
  loginCheck,
};
