import ReactDOM from "react-dom";
import React from "react";
import {StreamCard} from "./StreamCard";
import {shallow} from "enzyme";

describe("StreamCard", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <StreamCard
                stream={{
                    imageUrl: "http://imgur/fc.jpg",
                    link: "https://altadefinizione.rocks/fightclub/",
                    source: "Solar Movie",
                    sourceId: "solarmovie",
                    title: "Fight Club"
                }}
            />, div);
    });

    it("switch the modal display", () => {
        const wrapper = shallow(
            <StreamCard stream={{link: "http://link", source: "source"}}/>,
            {disableLifecycleMethods: true}
        );

        expect(wrapper.state().showSourceModal).toBeFalse();
        wrapper.instance().handleModalShow();
        expect(wrapper.state().showSourceModal).toBeTrue();
    });
});