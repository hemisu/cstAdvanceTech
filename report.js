const fs = require('fs');
const xlsx = require('node-xlsx');

const file = fs.readFileSync(`./log`, 'utf8');
const mochaJSON = "./mochawesome-report/mochawesome.json";
const testResult= JSON.parse(fs.readFileSync(mochaJSON));

const lineReg = /^Lines.+/mg;
const branchReg = /^Branches.+/mg;
const functionReg = /^Functions.+/mg;
const statementReg = /^Statements.+/mg;
const resultReg = /\S+的第(\d).+/g;

const line = file.match(lineReg);
const branch = file.match(branchReg);
const functions = file.match(functionReg);
const statement = file.match(statementReg);

var result = [];
testResult.allTests.forEach((data, index) => {
  result[index] = [];
  result[index][0] = data.title;
  result[index][1] = data.state;
});

const lent = testResult.allTests.length;
// console.log(result);
result[lent] = [];
result[lent][0] = 'Statements';
result[lent][1] = statement[0].split(':')[1].trim();
result[lent + 1] = [];
result[lent + 1][0] = 'Branches';
result[lent + 1][1] = branch[0].split(':')[1].trim();
result[lent + 2] = [];
result[lent + 2][0] = 'Functions';
result[lent + 2][1] = functions[0].split(':')[1].trim();
result[lent + 3] = [];
result[lent + 3][0] = 'Lines';
result[lent + 3][1] = line[0].split(':')[1].trim();

const buffer = xlsx.build([{name: "worksheet", data: result}]);
fs.writeFileSync('result.xlsx', buffer, 'binary');
console.log('测试结果已输出到result.xlsx');
