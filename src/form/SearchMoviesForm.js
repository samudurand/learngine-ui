import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {trimAndLowerCaseString} from "../utils/StringUtils";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {SEARCH_MODES} from "../common/Common";
import {LanguageDropdown} from "./LanguageDropdown";
import {SearchModeToggle} from "./SearchModeToggle";
import {FlagsRow} from "./FlagsRow";
import PropTypes from "prop-types";
import {Logo} from "../common/Logo";
import {connect} from "react-redux";
import {mapLanguageStateToProps, setTargetLanguage} from "../common/reduxSetup";

const MIN_CHARS_VALID_SEARCH = 1;

class SearchMoviesForm extends React.Component {

    static defaultProps = {
        disableSearchBtn: false,
        searchMode: SEARCH_MODES.MOVIEDB,
        showLanguageDropdown: false,
        showLanguageRadios: false,
        showLogo: false,
        showSearchModeToggle: false,
        title: ""
    }

    constructor(props) {
        super(props);
        const {searchMode, title} = props;

        this.state = {searchMode, title};

        this.handleChange = this.handleChange.bind(this);
        this.handleModeChange = this.handleModeChange.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    shouldComponentUpdate() {
        return true;
    }

    handleLanguageChange(langCode) {
        this.props.setTargetLanguageFn(langCode);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const cleanedTitle = trimAndLowerCaseString(this.state.title);
        const cleanedLang = trimAndLowerCaseString(this.props.targetLanguage);

        if (this.state.title.length > MIN_CHARS_VALID_SEARCH) {
            this.props.handleSubmit(cleanedTitle, cleanedLang, this.state.searchMode);
        }
    }

    handleModeChange(event) {
        if (event.target.checked) {
            this.setState({searchMode: SEARCH_MODES.MOVIEDB});
        } else {
            this.setState({searchMode: SEARCH_MODES.DIRECT});
        }
    }

    render() {
        const {
            disableSearchBtn,
            showLanguageDropdown,
            showLanguageRadios,
            showLogo,
            showSearchModeToggle,
            targetLanguage
        } = this.props;
        const {searchMode, title} = this.state;
        return (
            <Form id="searchForm" onSubmit={this.handleSubmit}>
                <Row id="searchRow">
                    {
                        showLogo && <Col className="d-none d-sm-inline-block" sm={3}>
                            <Logo/>
                        </Col>
                    }
                    <Col className="pt-2" id="searchInputCol">
                        <InputGroup>
                            <Form.Control
                                id="searchBox"
                                name="title"
                                onChange={this.handleChange}
                                placeholder="Movie or Series title"
                                type="text"
                                value={title}/>
                            <InputGroup.Append>
                                <Button disabled={disableSearchBtn} type="submit" variant="outline-dark">
                                    <FontAwesomeIcon icon={faSearch}/>
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col className="col-auto pt-2">
                        {
                            showLanguageDropdown &&
                            <LanguageDropdown handleChange={this.handleLanguageChange} language={targetLanguage}/>
                        }
                        {
                            showSearchModeToggle &&
                            <SearchModeToggle customClass="d-none d-sm-inline-block"
                                              handleChange={this.handleModeChange}
                                              mode={searchMode}/>
                        }
                    </Col>
                    {
                        showLogo && <Col className="d-none d-sm-inline-block" xs={3}/>
                    }
                </Row>
                {
                    showLanguageRadios &&
                    <FlagsRow currentLanguage={targetLanguage}
                              handleChange={(e) => this.handleLanguageChange(e.target.value)}/>
                }
            </Form>
        );
    }
}

SearchMoviesForm.propTypes = {
    disableSearchBtn: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    searchMode: PropTypes.symbol,
    setTargetLanguageFn: PropTypes.func,
    showLanguageDropdown: PropTypes.bool,
    showLanguageRadios: PropTypes.bool,
    showLogo: PropTypes.bool,
    showSearchModeToggle: PropTypes.bool,
    title: PropTypes.string
};

export default connect(mapLanguageStateToProps, {setTargetLanguageFn: setTargetLanguage})(SearchMoviesForm);