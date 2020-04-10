import React from 'react';
import {trimAndLowerCaseString} from "./utils/StringUtils";

describe('String utils', () => {
    test('remove trailing spaces and apply case formatting to String', () => {
        expect(trimAndLowerCaseString(" the Matrix  ")).toBe("the matrix");
    });

    test('returns an empty string if no value provided', () => {
        expect(trimAndLowerCaseString(" the Matrix  ")).toBe("the matrix");
    });
});
