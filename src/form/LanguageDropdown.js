import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import FlagIcon from "../common/FlagIcon";
import {Language} from "../common/Language";
import {LANGUAGES} from "../common/Common";
import PropTypes from "prop-types";

export function LanguageDropdown(props) {
    const {language, handleChange} = props;
    return (
        <Dropdown onSelect={(eventKey) => handleChange(eventKey)}>
            {/* eslint-disable-next-line react/forbid-component-props */}
            <Dropdown.Toggle className="text-left" id="languageDropdown" variant="light">
                <FlagIcon code={Language.findByCode(LANGUAGES, language).country}/>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {LANGUAGES.map((lang) =>
                    <Dropdown.Item eventKey={lang.code} key={lang.code}>
                        {/* eslint-disable-next-line react/forbid-component-props */}
                        <FlagIcon className="dropdownFlag" code={lang.country}/> {lang.label}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}

LanguageDropdown.propTypes = {
    handleChange: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired
};