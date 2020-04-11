import {Language} from "./Language";

it('get language label from language code', () => {
    const languages = [
        new Language("it", "ita", "Italian"),
        new Language("en", "us", "English")
    ]
    expect(Language.findByCode(languages, "en").label).toBe("English");
});