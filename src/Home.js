import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FlagIcon from "./FlagIcon";
import Container from "react-bootstrap/Container";
import React from "react";
import SearchForm from "./SearchForm";

class Home extends React.Component {
    render() {
        return <Container id="homePage" fluid>
            <Row id="titleRow">
                <Col xs={{offset: 3, span: 6}}>
                    <h1 className="text-center" id="mainLogo">Learngine</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={{offset: 3, span: 6}}>
                    <SearchForm/>
                </Col>
            </Row>
            <Row id="flagsRow">
                <Col className="text-center" xs={{offset: 3, span: 6}}>
                    <Form.Group>
                        {['es', 'fr', 'gb', 'it'].map(country => (
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
        </Container>;
    }
}

export default Home;