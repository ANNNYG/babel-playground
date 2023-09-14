// 在console.log(1)前面插入一行代码，输出文件名和行号
// 通过babel实现代码转换
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const types = require("@babel/types");

const sourceCode = `
    console.log(1);

    function func() {
        console.info(2);
    }

    export default class Clazz {
        say() {
            console.debug(3);
        }
        render() {
            return <div>{console.error(4)}</div>
        }
    }
`;

// sourceType指明代码解析的模式，有两种模式：script和module,unambiguous表示自动判断
const ast = parser.parse(sourceCode, {
  sourceType: "unambiguous",
  plugins: ["jsx"],
});

// 判断是否为console，且方法名是否为log、info、error、debug
const targetCalleeName = ["log", "info", "error", "debug"].map(
  (item) => `console.${item}`
);

traverse(ast, {
  CallExpression(path, state) {
    const calleeName = generate(path.node.callee).code;

    if (targetCalleeName.includes(calleeName)) {
      const { line, column } = path.node.loc.start;
      path.node.arguments.unshift(
        types.stringLiteral(`filename: (${line}, ${column})`)
      );
    }
  },
});

const { code, map } = generate(ast);
console.log(code);
