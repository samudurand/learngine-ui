import PropTypes from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChrome, faEdge, faFirefox} from "@fortawesome/fontawesome-free-brands";
import React from "react";

export default function AdBlockersDropdown(props) {
    const {adblocker} = props;
    const {name, logo, urls} = adblocker;

    return (
        <div className="adblockerDropdown">
            <Dropdown>
                <Dropdown.Toggle size="sm" variant="primary">
                    <img alt={name} className="adblockerLogo" src={`/adblockers/${logo}`}/> {name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href={urls.chrome} target="_blank">
                        <FontAwesomeIcon icon={faChrome}/> Chrome
                    </Dropdown.Item>
                    <Dropdown.Item href={urls.firefox}>
                        <FontAwesomeIcon icon={faFirefox}/> Firefox
                    </Dropdown.Item>
                    <Dropdown.Item href={urls.edge}>
                        <FontAwesomeIcon icon={faEdge}/> Edge
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

AdBlockersDropdown.propTypes = {
    adblocker: PropTypes.object.isRequired
};