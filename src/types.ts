import * as ts from "io-ts";
import moment  from "moment";

export type Branded<Brand extends string, Type> = Type & { [k in Brand]: never };

export const NamedStringCodec = <T extends string>(name: T, match: (s: string) => boolean) => {
    const tester = (s: unknown): s is Branded<T, string> => typeof s === `string` && match(s);
    return new ts.Type(name, tester, (u, c) => tester(u) ? ts.success(u) : ts.failure(u, c), a => a);
};

export const StringDateCodec = NamedStringCodec(`StringDate`, s => moment(s, `YYYY/MM/DD`).isValid());
export const EmailCo0dec = NamedStringCodec(`Email`, s => !!s.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/));

export type StringDate = ts.TypeOf<typeof StringDateCodec>;
export type Email = ts.TypeOf<typeof EmailCo0dec>;

export const PersonCodec = ts.strict({
    lastName    : ts.string,
    firstName   : ts.string,
    dateOfBirth : StringDateCodec,
    email       : EmailCo0dec,
});

export type Person = ts.TypeOf<typeof PersonCodec>;
