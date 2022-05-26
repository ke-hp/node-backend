const schedule = require("node-schedule");
const requireDirectory = require("require-directory");

const ruleObj = requireDirectory(module);

/**
 * *  *  *  *  *  *
 ┬  ┬  ┬  ┬  ┬  ┬
 │  │  │  │  │  |
 │  │  │  │  │  └ 星期几，取值：0 - 7，其中 0 和 7 都表示是周日
 │  │  │  │  └─── 月份，取值：1 - 12
 │  │  │  └────── 日期，取值：1 - 31
 │  │  └───────── 时，取值：0 - 23
 │  └──────────── 分，取值：0 - 59
 └─────────────── 秒，取值：0 - 59（可选）
 */

// 每 10 秒运行一次
let rule = new schedule.RecurrenceRule();
rule.second = [0, 10, 20, 30, 40, 50];

// 定时任务
schedule.scheduleJob(rule, ruleObj.test);
