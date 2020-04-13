import {SourcePanel} from "./SourcePanel";
import ReactDOM from "react-dom";
import React from "react";
import {shallow} from "enzyme";
import {StreamCard} from "./StreamCard";

describe('SourcePanel', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <SourcePanel
                source="solarmovie"
                streams={[fightClub, fightClub2]}
            />, div);
    });

    it('renders all streams', () => {
        const wrapper = shallow(<SourcePanel
            source="solarmovie"
            streams={[fightClub, fightClub2]}
        />);

        // eslint-disable-next-line no-magic-numbers
        expect(wrapper.find(StreamCard)).toHaveLength(2);
    });

    it('finds the source logo url', () => {
        expect(SourcePanel.getSourceLogo("altadefinizione")).toBe("/sources/altadefinizione.png")
    });

    const fightClub = {
        title: "Fight Club",
        link: "https://altadefinizione.rocks/fightclub/",
        imageUrl: "http://imgur/fc.jpg",
        sourceId: "solarrmovie",
        source: "Solar Movie"
    };

    const fightClub2 = {
        title: "Women Fight Club",
        link: "https://altadefinizione.rocks/wfightclub/",
        imageUrl: "http://imgur/wfc.jpg",
        sourceId: "solarrmovie",
        source: "Solar Movie"
    };
});