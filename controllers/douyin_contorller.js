const {sign} = require("../public/javascripts/wss_sign");

exports.signature = (req, res) => {
  try {
    const {roomId, uniqueId} = req.body;
    if (!roomId || !uniqueId) {
      res.status(200).json({
        code: 1, data: "", message: "error-miss params"
      })
    }
    const str = `,live_id=1,aid=6383,version_code=180800,webcast_sdk_version=1.3.0,room_id=${roomId},sub_room_id=,sub_channel_id=,did_rule=3,user_unique_id=${uniqueId},device_platform=web,device_type=,ac=,identity=audience`;
    const sign_res = sign(str)
    res.status(200).json({
      code: 0, data: {
        "signature": sign_res
      }
    })
  } catch (e) {
    console.log("error", e);
    res.status(200).json({
      code: 2, data: "", message: "error"
    })
  }
};