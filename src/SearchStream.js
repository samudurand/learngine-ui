import React from "react";
import SearchForm from "./SearchForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Logo} from "./Logo";
import Table from "react-bootstrap/Table";

const sources = {
    "5movies": "5movies.png",
    "altadefinizione": "altadefinizione.png",
    "animealtadefinizione": "animealtadefinizione.png",
    "filmfra": "filmfra.jpg",
    "isubsmovies": "isubsmovies.png",
    "netflix": "netflix.png",
    "solarmovie": "solarmovie.png",
    "streamcomplet": "streamcomplet.png"
};

function SearchStream() {
    return (
        <Container id="searchStreamPage">
            <Row id="searchRow">
                <Col xs={3}>
                    <Logo/>
                </Col>
                <Col xs={7}>
                    <SearchForm className="align-middle"/>
                </Col>
            </Row>
            <Row>
                <Table hover>
                    <tbody>

                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                    </tbody>
                </Table>
            </Row>

        </Container>
    );
}

export default SearchStream;