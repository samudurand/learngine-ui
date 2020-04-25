import {isEmptyObject} from "./utils";

describe("IsObjectEmpty", () => {
    it("identifies an empty object", () => {
        expect(isEmptyObject({prop: 1})).toBeFalse();
        expect(isEmptyObject({})).toBeTrue();
    });
});