import React from "react";
import SearchForm from "./SearchForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SearchMovie() {
    return (
        <Container id="searchMoviePage">
            <Row id="searchRow">
                <Col xs={3}>
                    <h1 id="mainLogo">Learngine</h1>
                </Col>
                <Col xs={7}>
                    <SearchForm className="align-middle"/>
                </Col>
            </Row>

        </Container>
    );
}

export default SearchMovie;