const vm = require('vm')
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
    const sandbox = vm.createContext({});
    const result = vm.runInContext(`${html};ub98484234();`, sandbox);
    const t10 = String(Math.trunc(Date.now() / 1000))
    const vMatch = result.match(/v=(\d+)/);
    const v = vMatch ? vMatch[1] : null;
    const rb = crypto.createHash('md5').update(rid + did + t10 + v, "utf8").digest("hex");
    let func_sign = result.replace(/return rt;}\);?/, 'return rt;}');
    func_sign = func_sign.replace('(function (', 'function sign(');
    func_sign = func_sign.replace('CryptoJS.MD5(cb).toString()', `"${rb}"`);
    vm.runInContext(func_sign, sandox);
    const params = sandbox.sign(rid, did, t10)
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