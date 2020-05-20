const router = require('koa-router')();
const {isExist, register} = require('../../controller/user');
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

module.exports = router;
