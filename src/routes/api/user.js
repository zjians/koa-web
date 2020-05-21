const router = require('koa-router')();
const {isExist, register, login} = require('../../controller/user');
const {userValidate} = require('../../validator/user');
const {genValidator} = require('../../middlewares/validator');
router.prefix('/api/user');

/**
 * 判断用户名是否存在
 */
router.post('/isExist', async (ctx, next) => {
  const {userName} = ctx.request.body;
  ctx.body = await isExist(userName);
});

/**
 * 注册用户
 */
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const params = ctx.request.body || {};
  ctx.body = await register(params);
});

/**
 * 用户登录
 */
router.post('/login', genValidator(userValidate), async (ctx, next) => {
  const params = ctx.request.body || {};
  ctx.body = await login({ctx, ...params});
});

module.exports = router;
