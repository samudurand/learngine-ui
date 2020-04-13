import '@testing-library/jest-dom/extend-expect';
import 'jest-extended';
import "jest-enzyme";
import jjj from "jest-fetch-mock";

import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EventSource from 'eventsourcemock';

Object.defineProperty(window, 'EventSource', {
    value: EventSource
});

configure({adapter: new Adapter()});
jjj.enableMocks();