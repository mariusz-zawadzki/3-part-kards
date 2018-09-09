const HUNDRED =  100.0;
const MAX_ZOOM = 4.0;
const MIN_ZOOM = 0.1;
const DEFAULT_ZOOM = 1.0;

module.exports = {
    EMPTY_URL :  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAggAAAGkCAAAAABxoYK3AAAJSUlEQVR42u3d2bKdNhRFUd/9///sPDjlxImbew5qVjP1TlElBgKEtNfH1y+vto/XD6GdbW9conn9LF8/6Ok4B+9AQEKgg7cgICHPwXsQkBDn4E0ISEhz8C4EJIQ5eBsCErIcvA8BCVEOHkBAQpKDJxCQEOTgEQQk5Dh4BgEJMQ4eQkBCioOnEJAQ4uAxBCRkOHgOAQkRDhZAQEKCgxUQkBDgYAkEJPg7WAMBCfYOFkFAgruDVRCQYO5gGQQkeDtYBwEJ1g4WQkCCs4OVEJBg7GApBCT4OlgLAQm2DhZDQIKrg9UQkGDqYDkEJHg6WA8BCZYONkBAgqODHRCQYOhgCwQk+DnYAwEJdg42QUCCm4NdEJBg5mAbBCR4OdgHAQlWDjZCQIKTg50QkGDkYCsEJPg42AsBCTYONkNAgouD3RCQYOJgOwQkeDjYDwEJFg4OQECCg4MTEJBg4OAIBCToOzgDAQnyDg5BQIK6g1MQkCDu4BgEJGg7OAcBCdIODkJAgrKDkxCQIOzgKAQk6Do4CwEJsg4OQ0CCqoPTEJAg6uA4BCRoOjgPAQmSDi5AQIKigxsQkCDo4AoEJOg5uAMBCXIOLkFAgpqDWxCQIObgGgQkaDm4BwEJUg4uQkCCkoObEJAg5OAqBCToOLgLAQkyDi5DQIKKg9sQkCDi4DoEJGg4uA8BCRIOBCAgQcGBAoR6CQoOJCCUS5BwoAGhWoKGAxEIxRJEHKhAqJWg4kAGQqkEGQc6ECol6DgQglAoQciBEoQ6CUoOpCCUSZByoAWhSoKWAzEIRRLEHKhBqJGg5kAOQokEOQd6ECok6DkQhFAgQdCBIoR4CYoOJCGES5B0oAkhWoKmA1EIwRJEHahCiJWg6kAWQqgEWQe6ECIl6DoQhhAoQdiBMoQ4CcoOpCGESZB2oA0hSoK2A3EIQRLEHahDiJGg7kAeQogEeQf6ECIk6DswgBAgwcCBAwR7CQ4OLCCYS7Bw4AHBWoKHAxMIxhJMHLhAsJXg4sAGgqkEGwc+ECwl+DgwgmAowciBEwQ7CU4OrCCYSbBy4AXBSoKXAzMIRhLMHLhBsJHg5sAOgokEOwd+ECwk+DkwhGAgwdCBIwR5CY4OLCGIS7B04AlBWoKnA1MIwhJMHbhCkJXg6sAWgqgEWwe+ECQl+DowhiAowdiBMwQ5Cc4OrCGISbB24A1BSoK3A3MIQhLMHbhDkJHg7sAegogEewf+ECQk+DsIgCAgIcBBAoTrEhIcREC4LCHCQQaEqxIyHIRAuCghxEEKhGsSUhzEQLgkIcZBDoQrEnIcBEG4ICHIQRKE4xKSHERBOCwhykEWhKMSshyEQTgoIcxBGoRjEtIcxEE4JCHOQR6EIxLyHARCOCAh0EEihO0SEh1EQtgsIdJBJoStEjIdhELYKCHUQSqEbRJSHcRC2CQh1kEuhC0Sch0EQ9ggIdhBMoTlEpIdRENYLCHaQTaEpRKyHYRDWCgh3EE6hGUS0h3EQ1gkId5BPoQlEvIdFEBYIKHAQQOExxIaHFRAeCihwkEHhEcSOhyUQHggocRBC4S3JbQ4qIHwpoQaBz0Q3pLQ46AIwhsSihw0QXhZQpODKggvSqhy0AXhJQldDsogvCChzEEbhE9LaHNQB+GTEuoc9EH4lIQ+B4UQPiGh0EEjhD9KaHRQCeEPEioddEL4rYROB6UQfiOh1EErhF9KaHVQC+EXEmod9EL4qYReB8UQfiKh2EEzhP9JaHZQDeE/EqoddEP4QUK3g3II/5JQ7qAdwncJ7Q7qIfwtod4BEL58/cABt8K3PvhCJzAi0IDwfVC8lzUPBK2HIxKA8O0lCQmDgy9IAMI/H03tEgYHSKiH8OMkSreEwQESyiH8f1K1WcLgAAnVEH7+k6VXwuAACcUQfv3TtVXC4AAJtRB+vwijU8LgAAmlEP68KKtRwuAACZUQPrdIs0/C4AAJhRA+v2i7TcLgAAl1EF7bxNElYXCAhDIIr2/qapIwOEBCFYT3Nnn2SBgcIKEIwvubvlskDA6QUAPhWRGIDgmDAySUQHheFKZBwuAACRUQ1hSJypcwOEBCAYR1RePSJQwOkBAPYW0RyWwJgwMkhENYX1Q2WcLgAAnREPYUmc6VMDhAQjCEfUXnUyUMDpAQC2FvCEWmhMEBEkIh7A+lSZQwOEBCJIQzIVV5EgYHSAiEcC60Lk3C4AAJcRDOhlhmSRgcICEMwvlQ2yQJgwMkREG4E3KdI2FwgIQgCPdC71MkDA6QEAPhpoMUCYMDJIRAuO0gQ8LgAAkREBQcJEgYHCAhAIKKA38JgwMk2ENQcuAuYXCABHMIag68JQwOkGANQdGBs4TBARKMIag68JUwOECCLQRlB64SBgdIMIWg7sBTwuAACZYQHBw4ShgcIMEQgosDPwmDAyTYQXBy4CZhcIAEMwhuDrwkDA6QYAXB0YGThMEBEowguDrwkTA4QIINBGcHLhIGB0gwgeDuwEPC4AAJFhASHDhIGBwgwQBCigN9CYMDJMhDSHKgLmFwgARxCGkOtCUMDpAgDSHRgbKEwQEShCGkOtCVMDhAgiyEZAeqEgYHSBCFkO5AU8LgAAmSEBocKEoYHCBBEEKLAz0JgwMkyEFocqAmYXCABDEIbQ60JAwOkCAFodGBkoTBARKEILQ60JEwOECCDIRmByoSBgdIEIHQ7kBDwuAACRIQcKAhYXCABAEIOFCRMDhAwnUIONCRMDhAwmUIOFCSMDhAwlUIONCSMDhAwkUIOFCTMDhAwjUIONCTMDhAwiUIOFCUMDhAwhUIONCUMDhAwgUIOFCVMDhAwnEIONCVMDhAwmEIOFCWMDhAwlEIONCWMDhAwkEIOFCXMDhAwjEIONCXMDhAwiEIOHCQMDhAwhEIOPCQMDhAwgEIOHCRMDhAwnYIOPCRMDhAwmYIOHCSMDhAwlYIOPCSMDhAwkYIOHCTMDhAwjYIOPCTMDhAwiYIOHCUMDhAwhYIOPCUMDhAwgYIOHCVMDhAwnIIOPCVMDhAwmIIOHCWMDhAwlIIOPCWMDhAwkIIOHCXMDhAwjIIOPCXMDhAwiIIOEiQMDhAwhIIOMiQMDhAwgIIOEiRMDhAwmMIOMiRMDhAwkMIOEiSMDhAwiMIOMiSMDhAwgMIOEiTMDhAwtsQcJAnYXCAhDch4CBRwl8Y+kpy0eV4hQAAAABJRU5ErkJggg==",
    EMPTY_URL_SQUARE :  "data:image/png;base64,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",
    CARD_SIZES: {
        width: 520,
        height: 420
    },
    ZOOM : {
        max: MAX_ZOOM,
        min: MIN_ZOOM,
        default: DEFAULT_ZOOM
    },
     ZOOM_PERCENTAGE : {
        max: MAX_ZOOM * HUNDRED,
        min: MIN_ZOOM * HUNDRED,
        default: DEFAULT_ZOOM * HUNDRED
    },
    pixel : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII='
};