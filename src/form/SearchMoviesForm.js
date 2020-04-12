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

const MIN_CHARS_VALID_SEARCH = 1;

class SearchMoviesForm extends React.Component {

    constructor(props) {
        super(props);
        this.showSearchModeToggle = props.showSearchModeToggle || false;
        this.showLanguageDropdown = props.showLanguageDropdown || false;
        this.showLanguageRadios = props.showLanguageRadios || false;

        this.state = {
            title: this.props.title || '',
            language: this.props.language || LANGUAGES[0].code,
            searchMode: SEARCH_MODES.MOVIEDB,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleModeChange = this.handleModeChange.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLanguageChange(langCode) {
        this.setState({language: langCode});
        if (this.props.onLanguageChangeAction) {
            this.props.onLanguageChangeAction(langCode);
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
            this.props.onSubmitAction(cleanedTitle, cleanedLang, this.state.searchMode);
        }
    }

    calculateSearchInputWidth() {
        const GRID_WIDTH = 12;
        const SEARCH_MODE_COL_WIDTH = 3;
        const LANG_DROP_COL_WIDTH = 3;
        return (
            GRID_WIDTH - (this.showSearchModeToggle * SEARCH_MODE_COL_WIDTH) - (this.showLanguageDropdown * LANG_DROP_COL_WIDTH)
        );
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
                    <Col id="searchInputCol" xs={this.calculateSearchInputWidth()}>
                        <InputGroup>
                            <Form.Control id="searchBox" value={title} name="title" type="text"
                                          placeholder="Movie or Series title"
                                          onChange={this.handleChange}/>
                            <InputGroup.Append>
                                <Button variant="outline-dark" type="submit"><FontAwesomeIcon icon={faSearch}/></Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col>
                        {this.showLanguageDropdown ? <LanguageDropdown language={language}/> : ""}
                        {this.showSearchModeToggle ?
                            <SearchModeToggle mode={searchMode} handleChange={this.handleModeChange}/> : ""}
                    </Col>
                </Row>
                {this.showLanguageRadios ? <FlagsRow currentLanguage={language} handleChange={this.handleChange}/> : ''}
            </Form>
        );
    }
}

export default SearchMoviesForm;