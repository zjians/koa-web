/**
 * 验证用户信息
 */
const validate = require('./_validate');

// 验证规则
const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
      maxLength: 255,
      minLength: 2,
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
    },
    newPassword: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
    },
    nickName: {
      type: 'string',
      maxLength: 255,
    },
    picture: {
      type: 'string',
      maxLength: 255,
    },
    city: {
      type: 'string',
      maxLength: 255,
      minLength: 2,
    },
    gender: {
      type: 'number',
      minimum: 1,
      maximum: 3,
    },
  },
};

/**
 * 验证用户信息格式
 * @param {Object} data
 */
function userValidate(data = {}) {
  return validate(SCHEMA, data);
}

/**
 * 修改密码的验证
 * @param {Object} data
 */
function passwordValidate(data = {}) {
  return validate(
    {
      type: 'object',
      properties: {
        password: {
          type: 'string',
          maxLength: 255,
          minLength: 3,
        },
        newPassword: {
          type: 'string',
          maxLength: 255,
          minLength: 3,
        },
      },
      additionalProperties: true, // json串允许出现除schema定义之外属性
      required: ['password', 'newPassword'],
    },
    data
  );
}

module.exports = {
  userValidate,
  passwordValidate,
};
