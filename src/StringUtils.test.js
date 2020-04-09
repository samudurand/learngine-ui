import React from 'react';
import {trimAndLowerCaseString} from "./utils/StringUtils";

test('remove trailing spaces and apply case formatting to String', () => {
    expect(trimAndLowerCaseString(" the Matrix  ")).toBe("the matrix");
});
