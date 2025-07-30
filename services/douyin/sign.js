import {createRequire} from 'module';

const require = createRequire(import.meta.url);
const vm = require('vm');
const fs = require('fs');

export function signature(room_id, unique_id) {
  const str = `,live_id=1,aid=6383,version_code=180800,webcast_sdk_version=1.3.0,room_id=${room_id},sub_room_id=,sub_channel_id=,did_rule=3,user_unique_id=${unique_id},device_platform=web,device_type=,ac=,identity=audience`;
  const jsCode = fs.readFileSync('public/javascripts/wss_sign.js', 'utf-8');
  const sandbox = vm.createContext({});
  vm.runInContext(jsCode, sandbox);

  return sandbox.test(str)
}