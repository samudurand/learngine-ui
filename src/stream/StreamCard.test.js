import {SourcePanel} from "./SourcePanel";
import ReactDOM from "react-dom";
import React from "react";
import SpinnerRow from "./SpinnerRow";
import {StreamCard} from "./StreamCard";

describe('StreamCard', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<StreamCard stream={{
            title: "Fight Club",
            link: "https://altadefinizione.rocks/fightclub/",
            imageUrl: "http://imgur/fc.jpg",
            sourceId: "solarmovie",
            source: "Solar Movie"
        }}/>, div);
    });
});