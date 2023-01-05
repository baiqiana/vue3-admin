// 读取.env.环境变量，注入全局变量中
const path = require("path");
const fs = require("fs");
const mode = process.env.NODE_ENV;

const absPath = path.join(__dirname, `.env.${mode}`);
let globalVar = {};
try {
  const fileStr = fs.readFileSync(absPath, { encoding: "utf-8" });
  let strTrim = fileStr.replace(/\r/g, ",").replace(/\n/g, ",");
  strTrim.split(",").map((i) => {
    let variableArr = i.split("=");
    let key = variableArr[0];
    let val = variableArr[1];
    if (key && global && key.startsWith("BQBLOG")) {
      val = val.replace(/(\"|\')/g, "");
      globalVar[key.trim()] = val.trim();
    }
  });
} catch (error) {
  throw new Error(`injectGloablVar: ${absPath} file is not exist`);
}

module.exports = globalVar;
