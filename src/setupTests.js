import "@testing-library/jest-dom/extend-expect";
import "jest-extended";
import "jest-enzyme";
import jjj from "jest-fetch-mock";

import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import EventSource from "eventsourcemock";

Object.defineProperty(window, "EventSource", {
    value: EventSource
});

configure({adapter: new Adapter()});
jjj.enableMocks();

const originalConsoleError = global.console.error;

beforeEach(() => {
    global.console.error = (...args) => {
        // eslint-disable-next-line require-unicode-regexp
        const propTypeFailures = [/Failed prop type/, /Warning: Received/];

        if (propTypeFailures.some((propF) => propF.test(args[0]))) {
            throw new Error(args[0]);
        }

        originalConsoleError(...args);
    };
});