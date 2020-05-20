const redis = require('redis');
const {REDIS_CONF} = require('../conf/db');

// 创建客户端
const {port, host} = REDIS_CONF;
const redisClient = redis.createClient(port, host);
redisClient.on('error', (err) => {
  console.log('redis error');
});

/**
 * @param {string} key key
 * @param {string} val value
 * @param {number} timeout 过期时间
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val);
  redisClient.expire(key, timeout);
}

function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val == null) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(val));
      } catch (error) {
        reject(val);
      }
    });
  });
}

export default {
  set,
  get,
};
