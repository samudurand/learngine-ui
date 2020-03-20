import React from 'react';
import MoviesList from "./MoviesList";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FlagIcon from "./FlagIcon";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";

function App() {
  return (
    <Container fluid>
        <Row id="titleRow">
            <Col xs={{offset: 3, span: 6}}><h1 className="text-center" id="mainTitle">Learngine</h1></Col>
        </Row>
        <Row>
            <Col xs={{offset: 3, span: 6}}>
                <Form id="searchForm">
                    <InputGroup className="mb-3">
                        <Form.Control id="searchBox" type="text" placeholder="Movie or Series title"/>
                        <InputGroup.Append>
                            <Button variant="outline-dark"><FontAwesomeIcon icon={faSearch} /></Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
            </Col>
        </Row>
        <Row id="flagsRow">
            <Col className="text-center" xs={{offset: 3, span: 6}}>
                <Form.Group>
                    {['es', 'fr', 'gb', 'fr', 'it'].map(country => (
                        <Form.Check
                            inline
                            className="countryButton"
                            id={country + "RadioSearch"}
                            name="countryRadio"
                            type="radio"
                            label={<FlagIcon className="countryIcon" code={country} size="lg"/>}
                        />
                    ))}
                </Form.Group>
            </Col>
        </Row>

        {/*<MoviesList/>*/}
    </Container>
  );
}

export default App;
