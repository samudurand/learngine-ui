import getCoverUrlOrDefaultCover from "./TemplateUtils";

describe("TemplateUtils", () => {
    it("gets cover url when available", () => {
        expect(getCoverUrlOrDefaultCover("http://my/img.jpg")).toBe("http://my/img.jpg");
    });

    it("gets defaut cover when cover url is empty", () => {
        expect(getCoverUrlOrDefaultCover("")).toBe("/no-cover.jpg");
    });

    it("gets defaut cover when cover url is missing", () => {
        expect(getCoverUrlOrDefaultCover(null)).toBe("/no-cover.jpg");
    });
});
