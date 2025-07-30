const crypto = require('crypto');

exports.sign = (req, res) => {
  const did = '10000000000000000000000000001501'
  try {
    const {html, rid} = req.body
    if (!html || !rid) {
      res.status(200).json({
        code: 1, data: "", message: "error-miss params"
      })
    }
    const func = new Function(`${html};return ub98484234();`);
    const result = func()
    const t10 = String(Math.trunc(Date.now() / 1000))
    const vMatch = result.match(/v=(\d+)/);
    const v = vMatch ? vMatch[1] : null;
    const rb = crypto.createHash('md5').update(rid + did + t10 + v, "utf8").digest("hex");
    let js_sign = result.replace(/return rt;}\);?/, 'return rt;}');
    js_sign = js_sign.replace('(function (', 'function sign(');
    js_sign = js_sign.replace('CryptoJS.MD5(cb).toString()', `"${rb}"`);
    const func_sign = new Function(`${js_sign};return sign;`);
    const sign = func_sign();
    const params = sign(rid, did, t10);
    res.status(200).json({
      code: 0, data: params
    })
  } catch (e) {
    console.log("error", e)
    res.status(200).json({
      code: 2, data: "", message: "error"
    })
  }
};