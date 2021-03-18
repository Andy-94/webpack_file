import {add} from "./module1.js";
import { subt } from "./module2.js";
import module3 from "./module3.js";
//import json
import json from "../json/hello.json";
//import css
import  "../css/index.less";
//import less
import "../css/iconfont.less";

console.log(add(1,2));
console.log(subt(2,1));
console.log(module3.div(2,1));
console.log(module3.multi(2,2));
console.log(json,typeof json);

setTimeout(() => {
  setTimeout(() => {
    console.log("this is settimeout")
  }, 1000);
}, 1000);
new Promise((resolve)=>{
  resolve(1);
}).then(
  value => console.log('this is success result', value),
  reason => console.log("this is fail result", reason)
)