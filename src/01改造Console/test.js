const { transformFileSync } = require("@babel/core"); // 同步转换文件内容
const insertConsolePlugin = require("./insertConsolePlugin");
const path = require("path");

const { code } = transformFileSync(path.join(__dirname, "./sourceCode.js"), {
  plugins: [insertConsolePlugin],
  parserOpts: {
    sourceType: "unambiguous",
    plugins: ["jsx"],
  },
});

console.log(code);
