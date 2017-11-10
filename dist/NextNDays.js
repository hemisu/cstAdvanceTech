'use strict';

var Month = [[0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], // 平年每月天数
[0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]];

/**
 * 检验年月日和天数是否符合要求
 * @param y 年
 * @param m 月
 * @param d 日
 * @param n 天数
 */
function validYearMonthDayAndN(y, m, d, n) {
  var regNum = /^[1-9]\d*$/;
  var regNumber = /^-?[0-9]\d*$/;
  if (!(regNum.test(y) && regNum.test(m) && regNum.test(d))) // 正整数
    throw new Error('年/月/日不是正整数');
  if (!/^-?[1-9]\d*$/.test(n)) // 整数
    throw new Error('n不是整数');
  // 检测月份边界
  if (m > 12) throw new Error('月份不应超过12月');
  // 检测日期边界
  if (d > Month[isLeapYear(y)][m]) throw new Error(('\n        \u6708\u4EFD\u4E0D\u5E94\u8BE5\u8D85\u8FC7\u5F53\u524D\u6708\u4EFD\u7684\u6700\u5927\u5929\u6570:\n        ' + m + '\u6708\u4E00\u5171\u6709' + Month[isLeapYear(y)][m] + '\u5929\n        \u76EE\u524D\u8F93\u5165:' + y + '/' + m + '/' + d + '\n        ').trim());
}

/**
 * 显示y/m/d 的第n天是
 * @param y 年
 * @param m 月
 * @param d 日
 * @param n 天
 * @returns {string} n天后的日期
 */
function nextNDays(y, m, d, n) {
  if (n == 0) return [y, m, d].join('/');
  validYearMonthDayAndN(y, m, d, n); // 检测输入
  y = parseInt(y);
  m = parseInt(m);
  d = parseInt(d);
  n = parseInt(n);
  var day = void 0;
  if (n > 0) {
    n += d - 1;
    d = 1;
    day = Month[isLeapYear(y)][m];
    if (n - day >= 0) {
      if (m === 12) {
        y++;
        m = 1;
      } else {
        m++;
      }
      return nextNDays(y, m, d, n - day);
    } else {
      d += n;
    }
  } else {
    if (n + d > 0) {
      d += n;
    } else {
      if (m === 1) {
        y--;
        m = 12;
      } else {
        m--;
      }
      day = Month[isLeapYear(y)][m];
      return nextNDays(y, m, d, n + day);
    }
  }
  // console.log(`${y}/${m}/${d}`);
  return [y, m, d].join('/');
}

/**
 * 判断是否是闰年
 * @param y 年份
 * @returns {number} 若是闰年 返回1
 */
function isLeapYear(y) {
  return y % 4 === 0 && y % 100 !== 0 || y % 400 === 0 ? 1 : 0;
}

// try {
//     console.log(nextNDays(2017, 11, 1, 30));
//     // console.log(/^-?[1-9]\d*$/.test(30));
// } catch (e){
//     console.log(e);
// }

module.exports = nextNDays;
//# sourceMappingURL=NextNDays.js.map