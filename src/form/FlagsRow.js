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
                    {LANGUAGES.map((language) =>
                        <Form.Check
                            checked={currentLanguage === language.code}
                            className="countryButton"
                            id={`${language.country}RadioSearch`}
                            inline
                            key={`${language.country}RadioSearch`}
                            label={<FlagIcon className="countryIcon"
                                             code={language.country}
                                             size="lg"/>}
                            name="language"
                            onChange={handleChange}
                            title={language.label}
                            type="radio"
                            value={language.code}
                        />
                    )}
                </Form.Group>
            </Col>
        </Row>
    );
}