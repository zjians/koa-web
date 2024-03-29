/**
 * 公共方法
 */
const router = require('koa-router')();
const {loginCheck} = require('../../middlewares/loginChecks');
const koaFrom = require('formidable-upload-koa');
const {saveFile} = require('../../controller/utils');

router.prefix('/api/utils');

router.post('/upload', loginCheck, koaFrom(), async (ctx, next) => {
  const file = ctx.req.files['file'];
  const {size, path, name, type} = file;
  const res = await saveFile({size, filePath: path, name, type});
  ctx.body = res;
});

module.exports = router;
