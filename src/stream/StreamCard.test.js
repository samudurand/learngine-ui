import ReactDOM from "react-dom";
import React from "react";
import {StreamCard} from "./StreamCard";

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
});