let nextNDays = require('./NextNDays.js');
let expect = require('chai').expect;
let xlsx = require('node-xlsx');
let filepath = './test.xlsx';

let tests = xlsx.parse(filepath);
// console.log(JSON.stringify(tests));
let testsData = tests[0]['data'];
let y, m, d;
describe('常规测试', function () {
    for (let v of testsData) {
        // console.log(v);
        rawDate = String.prototype.split.call(v[0], "/");
        y = rawDate[0];
        m = rawDate[1];
        d = rawDate[2];

        it(`${y}/${m}/${d}的第${v[1]}天应该是${v[2]}`, function () {
            expect(nextNDays(y, m, d, v[1])).to.be.equal(v[2]);
        });
    }
});
