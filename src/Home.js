import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import React from "react";
import SearchMoviesForm from "./form/SearchMoviesForm";
import {Logo} from "./common/Logo";
import {withRouter} from "react-router-dom";
import {trimAndLowerCaseString} from "./utils/StringUtils";
import {SEARCH_MODES} from "./common/Common";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {resources} from "./common/i18n";

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: "en",
        resources: resources
    });

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.searchMovieOrStreamOnSubmit = this.searchMovieOrStreamOnSubmit.bind(this);
    }

    shouldComponentUpdate() {
        return true;
    }

    searchMovieOrStreamOnSubmit(title, audio, searchMode) {
        if (searchMode === SEARCH_MODES.MOVIEDB) {
            this.props.history.push(`/search/movie?title=${trimAndLowerCaseString(title)}&audio=${audio}`);
        } else {
            this.props.history.push(`/search/stream?title=${trimAndLowerCaseString(title)}&audio=${audio}`);
        }
    }

    render() {
        return <Container id="homePage">
            <Row id="titleRow">
                <Col md={{offset: 2, span: 8}} xs={{offset: 3, span: 6}}>
                    <Logo/>
                </Col>
            </Row>
            <Row>
                <Col className="text-center lead mt-4" md={{offset: 2, span: 8}}>
                    <p className="mb-0 d-none d-sm-block">
                        This website is for anyone studying a language and wishing
                        to improve their skills by watching dubbed or subtitled movies
                    </p>
                    <p className="mb-0 small d-block d-sm-none">
                        For all language students wishing to improve their skills by watching movies
                    </p>
                </Col>
            </Row>
            <Row>
                <Col className="mt-2 mt-sm-5" md={{offset: 3, span: 6}} xs={{offset: 1, span: 10}}>
                    <SearchMoviesForm
                        handleSubmit={this.searchMovieOrStreamOnSubmit}
                        showLanguageDropdown={false}
                        showLanguageRadios
                        showSearchModeToggle/>
                </Col>
            </Row>
        </Container>;
    }
}

export default withRouter(Home);