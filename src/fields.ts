export enum Version{
    v2 = "2.1",
    v3 = "3.0",
    v4 = "4.0"
}

type FieldKey={
    Name: string,
    Multi: boolean,
    Type: boolean,
    Media: boolean,
    Versions: Array<Version>
    Value: Array<string>|string
}

export const vCardFields: Array<FieldKey>=[
    {
        Name: "ADR",
        Multi: true,
        Type: true,
        Media: false,
        Versions: [Version.v2,Version.v3,Version.v4],
        Value: [
            "addrPOBox",
            "addrApartNum",
            "addrStreet",
            "addrCity",
            "addrState",
            "addrZip",
            "addrCountry"
        ]
    },
    {
        Name: "CALURI",
        Multi: false,
        Type: false,
        Media: false,
        Versions: [Version.v4],
        Value: "calendar"
    },
    {
        Name: "EMAIL",
        Multi: true,
        Type: true,
        Media: false,
        Versions: [Version.v2,Version.v3,Version.v4],
        Value: "email"
    },
    {
        Name: "FN",
        Multi: false,
        Type: false,
        Media: false,
        Versions: [Version.v2,Version.v3,Version.v4],
        Value: "name"
    },
    {
        Name: "IMPP",
        Multi: true,
        Type: true,
        Media: false,
        Versions: [Version.v3,Version.v4],
        Value: "messenger"
    },
    {
        Name: "KEY",
        Multi: false,
        Type: false,
        Media: false,
        Versions: [Version.v2,Version.v3,Version.v4],
        Value: "pgpkey"
    },
    {
        Name: "LANG",
        Multi: false,
        Type: false,
        Media: false,
        Versions: [Version.v4],
        Value: "language"
    },
    {
        Name: "LOGO",
        Multi: false,
        Media: true,
        Type: false,
        Versions: [Version.v2,Version.v3,Version.v4],
        Value: "logo"
    },
    {
        Name: "N",
        Multi: false,
        Type: false,
        Media: false,
        Versions: [Version.v2,Version.v3,Version.v4],
        Value: [
            "familyName",
            "givenName",
            "middleName",
            "suffixName",
            "prefixName",
        ]
    },
    {
        Name: "NICKNAME",
        Multi: false,
        Type: false,
        Media: false,
        Versions: [Version.v3,Version.v4],
        Value: "nickname"
    },
    {
        Name: "NOTE",
        Multi: false,
        Type: false,
        Media: false,
        Versions: [Version.v2,Version.v3,Version.v4],
        Value: "note"
    },
    {
        Name: "ORG",
        Multi: false,
        Type: false,
        Media: false,
        Versions: [Version.v2,Version.v3,Version.v4],
        Value: "organization"
    },
    {
        Name: "PHOTO",
        Multi: false,
        Type: false,
        Media: true,
        Versions: [Version.v2,Version.v3,Version.v4],
        Value: "photo"
    },
    {
        Name: "ROLE",
        Multi: false,
        Type: false,
        Media: false,
        Versions: [Version.v2,Version.v3,Version.v4],
        Value: "role"
    },
    {
        Name: "TEL",
        Multi: true,
        Type: true,
        Media: false,
        Versions: [Version.v2,Version.v3,Version.v4],
        Value: "phone"
    },
    {
        Name: "TITLE",
        Multi: false,
        Type: false,
        Media: false,
        Versions: [Version.v2,Version.v3,Version.v4],
        Value: "title"
    },
    {
        Name: "URL",
        Multi: true,
        Type: false,
        Media: false,
        Versions: [Version.v2,Version.v3,Version.v4],
        Value: "url"
    }
]
