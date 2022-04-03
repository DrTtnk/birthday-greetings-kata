import {
    either as E,
    function as F,
    array as A,
} from "fp-ts";
import { formatValidationErrors } from 'io-ts-reporters';
import * as Papa                  from "papaparse";
import * as R                     from "ramda";

import * as T                     from './types';

const trace = <T>(x: T) => {
    console.log(x);
    return x;
};

export const isLeapYear = (year: number) =>
    year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

export const isHappyBirthday = (date: Date, birthDate: T.StringDate) => {
    const [, month, day]            = birthDate.split(`/`).map(Number);
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

export const dataLoader = (rawData: string) => Papa
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .parse<any>(rawData, { header: true, delimiter: `, `, skipEmptyLines: true }).data
    .map(raw => T.PersonCodec.decode({
        lastName    : raw.last_name,
        firstName   : raw.first_name,
        dateOfBirth : raw.date_of_birth,
        email       : raw.email,
    }))
    .map(E.mapLeft(formatValidationErrors));

export const happyBirthdayService = (today: Date, rawData: string) => F.pipe(
    dataLoader(rawData),
    A.separate,
    trace,
    ({ left: errors, right: people }) => ({
        errors,
        mails: people
            .filter(p => isHappyBirthday(today, p.dateOfBirth))
            .map(buildEmail),
    }),
);

