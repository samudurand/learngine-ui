import {trimAndLowerCaseString} from "./StringUtils";

describe('Method trimAndLowerCaseString', () => {
    test('remove trailing spaces and apply case formatting to String', () => {
        expect(trimAndLowerCaseString(" the Matrix  ")).toBe("the matrix");
    });

    test('can handle empty strings', () => {
        expect(trimAndLowerCaseString("")).toBe("");
    });
});
