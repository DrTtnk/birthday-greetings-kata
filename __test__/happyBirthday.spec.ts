import * as HB from "../src/happyBirthday";
import * as T  from "../src/types.js";

describe(`isLeapYear`, () => {
    it(`matches leap years`, () => {
        expect(HB.isLeapYear(2000)).toBe(true);
        expect(HB.isLeapYear(4)).toBe(true);
        expect(HB.isLeapYear(400)).toBe(true);
    });

    it(`does not match non-leap years`, () => {
        expect(HB.isLeapYear(1900)).toBe(false);
        expect(HB.isLeapYear(2100)).toBe(false);
        expect(HB.isLeapYear(2001)).toBe(false);
        expect(HB.isLeapYear(100)).toBe(false);
    });
});

describe(`isHappyBirthday`, () => {
    it(`Matches when today is the person birthday`, () => {
        expect(HB.isHappyBirthday(new Date(2000, 0, 1), `2000/01/01` as T.StringDate)).toBe(true);
    });

    it(`Does not match when today is not the person birthday`, () => {
        expect(HB.isHappyBirthday(new Date(2000, 0, 2), `2000/01/01` as T.StringDate)).toBe(false);
    });

    it(`Matches when the person was born in a leap year and "today" is a leap year`, () => {
        expect(HB.isHappyBirthday(new Date(2000, 1, 29), `2000/02/29` as T.StringDate)).toBe(true);
    });

    it(`Matches when the person was born in a leap year and "today" is not a leap year`, () => {
        expect(HB.isHappyBirthday(new Date(1999, 1, 28), `2000/02/29` as T.StringDate)).toBe(true);
    });
});

describe(`happyBirthdayService`, () => {

    it(`returns the mail ready to be sent to the person`, () => {
        const test = `last_name, first_name, date_of_birth, email
Doe, John, 1982/10/08, john.doe@foobar.com
Ann, Mary, 1975/09/11, mary.ann@foobar.com`;

        const mail = HB.happyBirthdayService(new Date(2000, 9, 8), test);

        expect(mail).toStrictEqual([{
            _tag  : `Right`,
            right : {
                from    : `me@happyFace.com`,
                to      : `john.doe@foobar.com`,
                subject : `Happy birthday!`,
                text    : `Happy birthday, dear John!`,
            },
        }]);
    });
});
