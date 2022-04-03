"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || (`get` in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, `default`, { enumerable: true, value: v });
} : function(o, v) {
    o[`default`] = v;
});
var __importStar = this && this.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== `default` && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, `__esModule`, { value: true });
exports.happyBirthdayService = exports.buildEmail = exports.isHappyBirthday = exports.splitDate = exports.isLeapYear = void 0;
const T                      = __importStar(require(`./types`));
const R                      = __importStar(require(`ramda`));
const Papa                   = __importStar(require(`papaparse`));
const fp_ts_1                = require(`fp-ts`);
const io_ts_reporters_1      = require(`io-ts-reporters`);
const isLeapYear             = year => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
exports.isLeapYear           = isLeapYear;
const splitDate              = date => date.split(`/`).map(Number);
exports.splitDate            = splitDate;
const isHappyBirthday        = (date, birthDate) => {
    const [, month, day]            = (0, exports.splitDate)(birthDate);
    const [todayYear, ...todayDate] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    return !(0, exports.isLeapYear)(todayYear) && R.equals([month, day], [2, 29])
        ? R.equals([month, day - 1], todayDate)
        : R.equals([month, day], todayDate);
};
exports.isHappyBirthday      = isHappyBirthday;
const buildEmail             = person => ({
    from    : `me@happyFace.com`,
    to      : person.email,
    subject : `Happy birthday!`,
    text    : `Happy birthday, dear ${person.firstName}!`,
});
exports.buildEmail           = buildEmail;
const happyBirthdayService   = (today, rawData) => fp_ts_1.function.pipe(Papa.parse(rawData, { header: true, delimiter: `, ` }).data, R.map(raw => T.PersonCodec.decode({
    lastName    : raw.last_name,
    firstName   : raw.first_name,
    dateOfBirth : raw.date_of_birth,
    email       : raw.email,
})), fp_ts_1.array.filter(fp_ts_1.either.fold(R.T, p => (0, exports.isHappyBirthday)(today, p.dateOfBirth))), fp_ts_1.array.map(fp_ts_1.either.map(exports.buildEmail)), fp_ts_1.array.map(fp_ts_1.either.mapLeft(io_ts_reporters_1.formatValidationErrors)));
exports.happyBirthdayService = happyBirthdayService;
