import ReactDOM from "react-dom";
import React from "react";
import AdBlockersDropdown from "./AdBlockersDropdown";
import {AD_BLOCKERS} from "../common/Common";

describe("AdBlockersDropdown", () => {

    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<AdBlockersDropdown adblocker={AD_BLOCKERS.ublock}/>, div);
    });
});