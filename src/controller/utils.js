const fse = require('fs-extra');
const path = require('path');
const {ErrorModel, SuccessModel} = require('../model/ResModel');
const {uploadFileSizeFailInfo} = require('../model/ErrorInfo');

const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles');
const MIX_SIZE = 1024 * 1024 * 1024;

/**
 * 判断文件夹是否存在
 */
fse.pathExists(DIST_FOLDER_PATH).then((exist) => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH);
  }
});

/**
 * 保存文件
 * @param {String} name
 * @param {String} type
 * @param {Numebr} size
 * @param {String} filePath
 */
async function saveFile({name, type, size, filePath}) {
  if (size > MIX_SIZE) {
    await fse.remove(filePath);
    return new ErrorModel(uploadFileSizeFailInfo);
  }
  console.log(filePath);

  // 移动文件
  const fileName = `${Date.now()}.${name}`;
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName);
  await fse.move(filePath, distFilePath);

  return new SuccessModel({
    url: '/' + fileName,
    path: distFilePath,
  });
}

module.exports = {
  saveFile,
};
