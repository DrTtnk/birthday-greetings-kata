import * as T from '../src/types';

describe(`Utils Codec`, () => {
    it(`should confirm valid inputs`, () => {
        const codec = T.NamedStringCodec(`Number`, n => /^\d+$/.test(n));
        expect(codec.decode(`123`)._tag).toEqual(`Right`);
    });

    it(`should reject invalid inputs`, () => {
        const codec = T.NamedStringCodec(`Number`, n => /^\d+$/.test(n));
        expect(codec.decode(`abc`)._tag).toEqual(`Left`);
    });
});

describe(`Business logic codec`, () => {
    describe(`PersonCodec`, () => {
        const validPerson = {
            lastName    : `Smith`,
            firstName   : `John`,
            dateOfBirth : `1990/01/01`,
            email       : `john.smith@gmail.com`,
        };
        it(`should confirm valid inputs`, () => {
            expect(T.PersonCodec.decode(validPerson)._tag).toEqual(`Right`);
        });

        it(`should reject invalid mails`, () => {
            const person = { ...validPerson, email: `john.smith.gmail.com` };
            expect(T.PersonCodec.decode(person)._tag).toEqual(`Left`);
        });

        it(`should reject invalid dates`, () => {
            const person = { ...validPerson, dateOfBirth: `2001/02/29` };
            expect(T.PersonCodec.decode(person)._tag).toEqual(`Left`);
        });

        it(`should reject data with missing fields`, () => {
            const { lastName: _, ...person } = validPerson;
            expect(T.PersonCodec.decode(person)._tag).toEqual(`Left`);
        });
    });
});

