import {SourcePanel} from "./SourcePanel";
import ReactDOM from "react-dom";
import React from "react";
import {shallow} from "enzyme";
import {StreamCard} from "./StreamCard";

describe("SourcePanel", () => {

    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <SourcePanel
                source="solarmovie"
                streams={[fightClub, fightClub2]}
            />, div);
    });

    it("renders all streams", () => {
        const wrapper = shallow(
            <SourcePanel source="solarmovie" streams={[fightClub, fightClub2]}/>
        );

        // eslint-disable-next-line no-magic-numbers
        expect(wrapper.find(StreamCard)).toHaveLength(2);
    });

    it("finds the source logo url", () => {
        expect(SourcePanel.getSourceLogo("altadefinizione")).toBe("/sources/altadefinizione.png");
    });

    const fightClub = {
        imageUrl: "http://imgur/fc.jpg",
        link: "https://altadefinizione.rocks/fightclub/",
        source: "Solar Movie",
        sourceId: "solarrmovie",
        title: "Fight Club"
    };

    const fightClub2 = {
        imageUrl: "http://imgur/wfc.jpg",
        link: "https://altadefinizione.rocks/wfightclub/",
        source: "Solar Movie",
        sourceId: "solarrmovie",
        title: "Women Fight Club"
    };
});