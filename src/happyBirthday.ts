import * as T    from './types';
import * as R    from "ramda";
import * as Papa from "papaparse";
import {
    either as E,
    function as F,
    array as A,
} from "fp-ts";
import { formatValidationErrors } from 'io-ts-reporters';

export const isLeapYear = (year: number) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

export const splitDate = (date: T.StringDate) => date.split(`/`).map(Number) as [year: number, month: number, day: number];

export const isHappyBirthday = (date: Date, birthDate: T.StringDate) => {
    const [, month, day]            = splitDate(birthDate);
    const [todayYear, ...todayDate] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];

    return !isLeapYear(todayYear) && R.equals([month, day], [2, 29])
        ? R.equals([month, day - 1], todayDate)
        : R.equals([month, day],     todayDate);
};

export const buildEmail = (person: T.Person) => ({
    from    : `me@happyFace.com`,
    to      : person.email,
    subject : `Happy birthday!`,
    text    : `Happy birthday, dear ${person.firstName}!`,
});

export const happyBirthdayService = (today: Date, rawData: string) => F.pipe(
    Papa.parse<any>(rawData, { header: true, delimiter: `, ` }).data,
    R.map(raw => T.PersonCodec.decode({
        lastName    : raw.last_name,
        firstName   : raw.first_name,
        dateOfBirth : raw.date_of_birth,
        email       : raw.email,
    })),
    A.filter(E.fold(R.T, p => isHappyBirthday(today, p.dateOfBirth))),
    A.map(E.map(buildEmail)),
    A.map(E.mapLeft(formatValidationErrors)),
);
