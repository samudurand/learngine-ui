import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Language} from "../common/Language";
import {LANGUAGES} from "../common/Common";
import React from "react";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

export function AlternativeTitlesRow(props) {
    const {titles} = props;
    const targetLanguage = useSelector((state) => state.targetLanguage);
    return (
        <Row id="alternativeTitlesRow">
            <Col>
                <Accordion>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            <FontAwesomeIcon icon={faBars} id="barsIcon"/>
                            Not finding what you want ? Try again with one of those titles
                            (<b>{titles.length}</b> possible match
                            in {Language.findByCode(LANGUAGES, targetLanguage).label})
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {
                                    titles.sort().map((title) =>
                                        <div className="altTitle" key={title}>
                                            <a href={`/search/stream?title=${title}&audio=${targetLanguage}`}>
                                                <FontAwesomeIcon icon={faSearch}/> {title}
                                            </a>
                                        </div>
                                    )
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Col>
        </Row>
    );
}

AlternativeTitlesRow.propTypes = {
    titles: PropTypes.array.isRequired
};