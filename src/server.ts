import * as HB        from "./happyBirthday";
import * as scheduler from "node-schedule";
import * as fs        from "fs";

scheduler.scheduleJob({ hour: 0, minute: 0 }, () => {
    HB.happyBirthdayService(new Date(), fs.readFileSync(`../people.csv`, `utf8`));
});

console.info(`Happy Birthday Service started! 🚀`);
