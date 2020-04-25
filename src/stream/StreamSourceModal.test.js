import ReactDOM from "react-dom";
import React from "react";
import StreamModal from "./StreamModal";

describe("StreamSourceModal", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <StreamModal
                handleClose={jest.fn()}
                show={false}
                sourceName="Solar Movie"
                sourceUrl="https://altadefinizione.rocks/fightclub/"
            />, div);
    });
});