const Crypto = require('crypto');

function genCodesArray(num = 10) {
  if (!num) {
    num = 10
  }
  let out = [];

  for (let i = 0; i < num; i ++) {
    out.push({ code: genCode() });
  }
  return out;
}

function genCode() {
  let size = 14
  return Crypto
    .randomBytes(14)
    .toString('base64')
    .slice(0, size)
}

exports.genCodesArray = genCodesArray;
