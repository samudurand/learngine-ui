import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {LANGUAGES} from "../common/Common";
import FlagIcon from "../common/FlagIcon";
import React from "react";

export function FlagsRow(props) {
    const {currentLanguage, handleChange} = props;
    return (
        <Row id="flagsRow">
            <Col className="text-center">
                <Form.Group>
                    {LANGUAGES.map(language => (
                        <Form.Check
                            inline
                            className="countryButton"
                            id={language.country + "RadioSearch"}
                            key={language.country + "RadioSearch"}
                            name="language"
                            type="radio"
                            value={language.code}
                            checked={currentLanguage === language.code}
                            onChange={handleChange}
                            title={language.label}
                            label={<FlagIcon className="countryIcon" code={language.country}
                                             size="lg"/>}
                        />
                    ))}
                </Form.Group>
            </Col>
        </Row>
    );
}