import Dropdown from "react-bootstrap/Dropdown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChrome, faEdge, faFirefox} from "@fortawesome/fontawesome-free-brands";
import React from "react";
import {AD_BLOCKERS} from "../common/Common";

export default function AdBlockersDropdown(props) {
    const {ublock} = AD_BLOCKERS;

    return (
        <div className="adblockerDropdown">
            <Dropdown>
                <Dropdown.Toggle size="sm" variant="success">
                    <img alt={ublock.name} className="adblockerLogo" src={`/adblockers/${ublock.logo}`}/> {ublock.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href={ublock.urls.chrome} target="_blank">
                        <FontAwesomeIcon icon={faChrome}/> Chrome
                    </Dropdown.Item>
                    <Dropdown.Item href={ublock.urls.firefox}>
                        <FontAwesomeIcon icon={faFirefox}/> Firefox
                    </Dropdown.Item>
                    <Dropdown.Item href={ublock.urls.edge}>
                        <FontAwesomeIcon icon={faEdge}/> Edge
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

