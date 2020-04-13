export class Language {
    constructor(code, country, label) {
        this.code = code;
        this.country = country;
        this.label = label;
    }

    static findByCode(languages, code) {
        return languages.find((lang) => lang.code === code);
    }
}