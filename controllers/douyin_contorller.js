const {signature} = require("../services/douyin/sign");

exports.signature = (req, res) => {
  try {
    const {roomId, uniqueId} = req.body;
    if (!roomId || !uniqueId) {
      res.status(200).json({
        code: 1, data: "", message: "error-miss params"
      })
    }
    const sign = signature(roomId,uniqueId)
    res.status(200).json({
      code: 0, data: {
        "signature": sign
      }
    })

  } catch (e) {
    console.log("error", e);
    res.status(200).json({
      code: 2, data: "", message: "error"
    })
  }
};