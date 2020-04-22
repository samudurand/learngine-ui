import ReactDOM from "react-dom";
import React from "react";
import StreamSourceModal from "./StreamSourceModal";

describe("StreamSourceModal", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <StreamSourceModal
                handleClose={jest.fn()}
                show={false}
                sourceName="Solar Movie"
                sourceUrl="https://altadefinizione.rocks/fightclub/"
            />, div);
    });
});