const {jsonSchemaFileInfo} = require('../model/ErrorInfo');
const {ErrorModel} = require('../model/ResModel');
/**
 * 验证格式 中间件
 * @param {Function} validateFn 验证函数
 */
function genValidator(validateFn) {
  return async function (ctx, next) {
    const error = validateFn(ctx.request.body);
    if (error) {
      ctx.body = new ErrorModel({
        errno: 10009,
        message: `${error.dataPath} ${error.message}`,
      });
      return;
    }
    await next();
  };
}

module.exports = {
  genValidator,
};
