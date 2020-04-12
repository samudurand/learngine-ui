import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import FlagIcon from "../common/FlagIcon";
import {Language} from "../common/Language";
import {LANGUAGES} from "../common/Common";

export function LanguageDropdown(props) {
    const {language} = props;
    return (
        <Dropdown
            onSelect={eventKey => this.handleLanguageChange(eventKey)}>
            <Dropdown.Toggle variant="light" id="languageDropdown" className="text-left">
                {<FlagIcon code={Language.findByCode(LANGUAGES, language).country}/>}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {LANGUAGES.map(lang => (
                    <Dropdown.Item key={lang.code} eventKey={lang.code}>
                        <FlagIcon className="dropdownFlag" code={lang.country}/> {lang.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}