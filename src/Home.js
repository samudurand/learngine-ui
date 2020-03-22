import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import React from "react";
import SearchForm from "./SearchForm";
import {Logo} from "./Logo";
import {withRouter} from "react-router-dom";

class Home extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.searchAction = this.searchAction.bind(this);
    }

    searchAction(title) {
        this.props.history.push(`/search/movie?title=${title}&audio=en`);
    }

    render() {
        return <Container id="homePage" fluid>
            <Row id="titleRow">
                <Col xs={{offset: 3, span: 6}}>
                    <Logo/>
                </Col>
            </Row>
            <Row>
                <Col xs={{offset: 3, span: 6}}>
                    <SearchForm onSubmitAction={this.searchAction} inlineLanguages={false}/>
                </Col>
            </Row>
        </Container>;
    }
}

export default withRouter(Home);