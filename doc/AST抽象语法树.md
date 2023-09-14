# 常见的 AST

[AST 转换工具](https://astexplorer.net/)

babel 编译的第一步是把源码 parse 成抽象语法树 AST （Abstract Syntax Tree），后续对这个 AST 进行转换。

AST 是对源码的抽象，字面量、标识符、表达式、语句、模块语法、class 语法都有各自的 AST。

## Literal

Literal 是字面量的意思，比如 let name = 'Ann'中，'Ann'就是一个字符串字面量 StringLiteral，相应的还有其他字面量类型，具体大致如下

大概的字面量类型（省略了很多）:

- 字符串字面量 StringLiteral
- 数字字面量 NumericLiteral
- 布尔字面量 BooleanLiteral
- 字符串字面量 StringLiteral
- 正则表达式字面量 RegExpLiteral
- null 字面量 NullLiteral
- 模版字符串字面量 TemplateLiteral
- BigInt 字面量 BigIntLiteral

## Identifier

Identifier 是标识符的意思，变量名、属性名、参数名等各种声明和引用的名字，都是 Identifier。

## Statement

statement 是语句，它是可以独立执行的单位，比如 break、continue、debugger、return 或者 if 语句、while 语句、for 语句，还有声明语句，表达式语句等。我们写的每一条可以独立执行的代码都是语句。

语句末尾一般会加一个分号分隔，或者用换行分隔。

下面这些我们经常写的代码，每一行都是一个 Statement：

```js
break;
continue;
return;
debugger;
throw Error();
{}
try {} catch(e) {} finally{}
for (let key in obj) {}
for (let i = 0;i < 10;i ++) {}
while (true) {}
do {} while (true)
switch (v){case 1: break;default:;}
label: console.log();
with (a){}

```

## Declaration

声明语句是一种特殊的语句，它执行的逻辑是在作用域内声明一个变量、函数、class、import、export 等。声明语句用于定义变量，这也是代码中一个基础组成部分。

比如下面这些语句都是声明语句：

```js
const a = 1;
function b() {}
class C {}

import d from "e";

export default e = 1;
export { e };
export * from "e";
```

## Expression

expression 是表达式，特点是执行完以后有返回值，这是和语句 (statement) 的区别。

下面是一些常见的表达式

```js
[1,2,3]
a = 1
1 + 2;
-1;
function(){};
() => {};
class{};
a;
this;
super;
a::b;

```

## Class

Class 语法有专门的 AST 节点来表示。
整个 class 的内容是 ClassBody，属性是 ClassProperty，方法是 ClassMethod（通过 kind 属性来区分是 constructor 还是 method）。

比如下面的代码

```js
class Guang extends Person {
  name = "guang";
  constructor() {}
  eat() {}
}
```

```json
{
  "type": "Program",
  "start": 0,
  "end": 82,
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 81,
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 11,
        "name": "Guang"
      },
      "superClass": {
        "type": "Identifier",
        "start": 20,
        "end": 26,
        "name": "Person"
      },
      "body": {
        "type": "ClassBody",
        "start": 26,
        "end": 81,
        "body": [
          {
            "type": "PropertyDefinition",
            "start": 32,
            "end": 45,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 32,
              "end": 36,
              "name": "name"
            },
            "value": {
              "type": "Literal",
              "start": 39,
              "end": 44,
              "value": "ann",
              "raw": "'ann'"
            }
          },
          {
            "type": "MethodDefinition",
            "start": 50,
            "end": 66,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 50,
              "end": 61,
              "name": "constructor"
            },
            "kind": "constructor",
            "value": {
              "type": "FunctionExpression",
              "start": 61,
              "end": 66,
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 64,
                "end": 66,
                "body": []
              }
            }
          },
          {
            "type": "MethodDefinition",
            "start": 71,
            "end": 79,
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 71,
              "end": 74,
              "name": "eat"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 74,
              "end": 79,
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 77,
                "end": 79,
                "body": []
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "module"
}
```

## Module

es module 是语法级别的模块规范，所以也有专门的 AST 节点。

关于 AST 的太多了，懒得写了，具体去开头的 AST 转换工具中转换就知道了

## AST 的公共属性

- type： AST 节点的类型
- start、end、loc：start 和 end 代表该节点在源码中的开始和结束下标。而 loc 属性是一个对象，有 line 和 column 属性分别记录开始和结束的行列号。
- leadingComments、innerComments、trailingComments： 表示开始的注释、中间的注释、结尾的注释，每个 AST 节点中都可能存在注释，而且可能在开始、中间、结束这三种位置，想拿到某个 AST 的注释就通过这三个属性。
