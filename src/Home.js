import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import React from "react";
import SearchMoviesForm from "./SearchMoviesForm";
import {Logo} from "./Logo";
import {withRouter} from "react-router-dom";
import {sanitizedString} from "./Sanitizer";
import {SearchModes} from "./Common";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.searchAction = this.searchAction.bind(this);
    }

    searchAction(title, audio, searchMode) {
        if (searchMode === SearchModes.MOVIEDB) {
            this.props.history.push(`/search/movie?title=${sanitizedString(title)}&audio=${audio}`);
        } else {
            this.props.history.push(`/search/stream?title=${sanitizedString(title)}&audio=${audio}`);
        }
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
                    <SearchMoviesForm onSubmitAction={this.searchAction}
                                      showLanguageDropdown={false}
                                      showLanguageRadios={true}
                                      showSearchMode={true}
                    />
                </Col>
            </Row>
        </Container>;
    }
}

export default withRouter(Home);