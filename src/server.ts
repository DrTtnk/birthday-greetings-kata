import * as fs        from "fs";
import * as scheduler from "node-schedule";
import path           from "path";

import * as HB        from "./happyBirthday";

scheduler.scheduleJob({ hour: 0, minute: 0 }, () => {
    const people            = fs.readFileSync(path.join(__dirname, `../people.csv`), `utf8`);
    const { mails, errors } = HB.happyBirthdayService(new Date(), people);

    // this should be an actual call to a mail service
    mails.forEach(mail => console.log(`Sending mail to ${mail.to}`));

    // this should be an actual call to a log service
    errors.forEach(error => console.log(`Error: ${error}`));
});

console.info(`Happy Birthday Service™ started! 🚀`);
