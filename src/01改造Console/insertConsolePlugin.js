const generate = require("@babel/generator").default;

// 判断是否为console，且方法名是否为log、info、error、debug
const targetCalleeName = ["log", "info", "error", "debug"].map(
  (item) => `console.${item}`
);

// 改造成babel插件
module.exports = function ({ types, template }) {
  return {
    visitor: {
      CallExpression(path, state) {
        if (path.node.isNew) {
          return;
        }

        const calleeName = generate(path.node.callee).code;

        if (targetCalleeName.includes(calleeName)) {
          const { line, column } = path.node.loc.start;

          const newNode = template.expression(
            `console.log("${
              state.filename || "unkown filename"
            }: (${line}, ${column})")`
          )();
          newNode.isNew = true;

          if (path.findParent((path) => path.isJSXElement())) {
            path.replaceWith(types.arrayExpression([newNode, path.node]));
            path.skip();
          } else {
            path.insertBefore(newNode);
          }
        }
      },
    },
  };
};
