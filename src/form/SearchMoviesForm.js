import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {trimAndLowerCaseString} from "../utils/StringUtils";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {LANGUAGES, SEARCH_MODES} from "../common/Common";
import {LanguageDropdown} from "./LanguageDropdown";
import {SearchModeToggle} from "./SearchModeToggle";
import {FlagsRow} from "./FlagsRow";
import PropTypes from "prop-types";

const MIN_CHARS_VALID_SEARCH = 1;

class SearchMoviesForm extends React.Component {

    static defaultProps = {
        language: LANGUAGES[0].code,
        searchMode: SEARCH_MODES.MOVIEDB,
        showLanguageDropdown: false,
        showLanguageRadios: false,
        showSearchModeToggle: false,
        title: ""
    }

    constructor(props) {
        super(props);
        this.showSearchModeToggle = props.showSearchModeToggle;
        this.showLanguageDropdown = props.showLanguageDropdown;
        this.showLanguageRadios = props.showLanguageRadios;

        this.state = {
            language: this.props.language,
            searchMode: this.props.searchMode,
            title: this.props.title
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleModeChange = this.handleModeChange.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    shouldComponentUpdate() {
        return true;
    }

    handleLanguageChange(langCode) {
        this.setState({language: langCode});
        if (this.props.handleLanguageChange) {
            this.props.handleLanguageChange(langCode);
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const cleanedTitle = trimAndLowerCaseString(this.state.title);
        const cleanedLang = trimAndLowerCaseString(this.state.language);

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
        const {language, searchMode, title} = this.state;
        return (
            <Form id="searchForm" onSubmit={this.handleSubmit}>
                <Row id="inputSearchRow">
                    <Col id="searchInputCol">
                        <InputGroup>
                            <Form.Control
                                          id="searchBox"
                                          name="title"
                                          onChange={this.handleChange}
                                          placeholder="Movie or Series title"
                                          type="text"
                                          value={title}/>
                            <InputGroup.Append>
                                <Button type="submit" variant="outline-dark">
                                    <FontAwesomeIcon icon={faSearch}/>
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col className="col-auto" >
                        {
                            this.showLanguageDropdown &&
                            <LanguageDropdown handleChange={this.handleLanguageChange} language={language}/>
                        }
                        {
                            this.showSearchModeToggle &&
                            <SearchModeToggle customClass="d-none d-sm-inline-block"
                                              handleChange={this.handleModeChange}
                                              mode={searchMode}/>
                        }
                    </Col>
                </Row>
                {
                    this.showLanguageRadios &&
                    <FlagsRow currentLanguage={language} handleChange={this.handleChange}/>
                }
            </Form>
        );
    }
}

SearchMoviesForm.propTypes = {
    handleLanguageChange: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
    language: PropTypes.string,
    searchMode: PropTypes.symbol,
    showLanguageDropdown: PropTypes.bool,
    showLanguageRadios: PropTypes.bool,
    showSearchModeToggle: PropTypes.bool,
    title: PropTypes.string
};

export default SearchMoviesForm;