import ReactDOM from "react-dom";
import React from "react";
import StreamModal from "./StreamModal";
import {shallow} from "enzyme";
import {AD_BLOCKERS, SUBTITLES} from "../common/Common";
import {Language} from "../common/Language";

describe("StreamModal renders", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <StreamModal
                handleClose={jest.fn()}
                show={false}
                sources={sources}
                stream={{sourceId: "sourceProvidedSubs"}}
            />, div);
    });
});

describe("StreamModal", () => {
    it("displays the available subtitles", () => {
        const wrapper = shallow(
            <StreamModal handleClose={jest.fn()} show sources={sources}
                         stream={{
                             link: "http://link.com",
                             source: "Alta Definizione",
                             sourceId: "sourceProvidedSubs",
                             title: "matrix"
                         }}/>,
            {disableLifecycleMethods: true}
        );

        expect(wrapper.text()).toMatch(/English, Spanish/u);
    });

    it("indicates that subtitles might be there or not", () => {
        const wrapper = shallow(
            <StreamModal handleClose={jest.fn()} show sources={sources}
                         stream={{
                             link: "http://link.com",
                             source: "Alta Definizione",
                             sourceId: "sourceMaybeSubs",
                             title: "matrix"
                         }}/>,
            {disableLifecycleMethods: true}
        );

        expect(wrapper.text()).toMatch(/Unknown/u);
    });

    it("indicates that subtitles can be loaded", () => {
        const wrapper = shallow(
            <StreamModal handleClose={jest.fn()} show sources={sources}
                         stream={{
                             link: "http://link.com",
                             source: "Alta Definizione",
                             sourceId: "sourceLoadableSubs",
                             title: "matrix"
                         }}/>,
            {disableLifecycleMethods: true}
        );

        expect(wrapper.text()).toMatch(/can be loaded/u);
    });
});

const sources = {
    sourceLoadableSubs: {
        adblockers: [AD_BLOCKERS.ublock],
        instructions: "No special instructions",
        logo: "source.png",
        subtitles: {
            presence: SUBTITLES.LOADABLE
        }
    },
    sourceMaybeSubs: {
        adblockers: [AD_BLOCKERS.ublock],
        instructions: "No special instructions",
        logo: "source.png",
        subtitles: {
            presence: SUBTITLES.MAYBE
        }
    },
    sourceNoneSubs: {
        adblockers: [AD_BLOCKERS.ublock],
        instructions: "No special instructions",
        logo: "source.png",
        subtitles: {
            presence: SUBTITLES.NONE
        }
    },
    sourceProvidedSubs: {
        adblockers: [AD_BLOCKERS.ublock],
        instructions: "No special instructions",
        logo: "source.png",
        subtitles: {
            languages: [
                new Language("en", "us", "English"),
                new Language("es", "es", "Spanish")
            ],
            presence: SUBTITLES.PROVIDED
        }
    }
};