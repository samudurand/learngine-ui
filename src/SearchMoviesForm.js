import React from "react";
import Form from "react-bootstrap/Form";
import {withRouter} from "react-router";
import queryString from 'query-string'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FlagIcon from "./common/FlagIcon";
import {trimAndLowerCaseString} from "./utils/StringUtils";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {LANGUAGES, SEARCH_MODES} from "./common/Common";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Dropdown from "react-bootstrap/Dropdown";
import {Language} from "./common/Language";

class SearchMoviesForm extends React.Component {

    constructor(props) {
        super(props);
        this.urlParams = queryString.parse(this.props.location.search);
        this.showSearchMode = props.showSearchMode ? props.showSearchMode : false;
        this.showLanguageDropdown = props.showLanguageDropdown ? props.showLanguageDropdown : false;
        this.showLanguageRadios = props.showLanguageRadios ? props.showLanguageRadios : false;

        this.state = {
            title: this.urlParams.title || '',
            language: this.urlParams.audio || LANGUAGES[0].code,
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

        if (this.state.title == null || this.state.title.length <= 1) {
            return;
        }

        this.props.onSubmitAction(trimAndLowerCaseString(this.state.title), this.state.language, this.state.searchMode);
    }

    calculateSearchInputSpace() {
        const MODE_COL_WIDTH = 3;
        const DROP_COL_WIDTH = 3;
        return 12 - (this.showSearchMode * MODE_COL_WIDTH) - (this.showLanguageDropdown * DROP_COL_WIDTH);
    }

    handleModeChange(event) {
        if (event.target.checked) {
            this.setState({searchMode: SEARCH_MODES.MOVIEDB});
        } else {
            this.setState({searchMode: SEARCH_MODES.DIRECT});
        }
    }

    render() {
        const searchInput = (
            <Col id="searchInputCol" xs={this.calculateSearchInputSpace()}>
                <InputGroup>
                    <Form.Control id="searchBox" value={this.state.title} name="title" type="text"
                                  placeholder="Movie or Series title"
                                  onChange={this.handleChange}/>
                    <InputGroup.Append>
                        <Button variant="outline-dark" type="submit"><FontAwesomeIcon icon={faSearch}/></Button>
                    </InputGroup.Append>
                </InputGroup>
            </Col>
        );

        const modeInfoPopover = (
            <Popover id="popover-basic">
                <Popover.Content>
                    <span>
                        Uses <a href="https://www.themoviedb.org/" target="_blank"
                                rel="noopener noreferrer"><b>TheMovieDB</b></a> database to search for movies matching your search.
                        The following search will be more precise and will offer alternative titles in the target language.
                        Disabling this will perform a <b>direct stream search</b>, allowing a more flexible but less precise search.
                    </span>
                </Popover.Content>
            </Popover>
        );

        const selectFlagsRow = (
            <Row id="flagsRow">
                <Col className="text-center">
                    <Form.Group>
                        {LANGUAGES.map(language => (
                            <Form.Check
                                inline
                                className="countryButton"
                                id={language.country + "RadioSearch"}
                                key={language.country + "RadioSearch"}
                                name="language"
                                type="radio"
                                value={language.code}
                                checked={this.state.language === language.code}
                                onChange={this.handleChange}
                                title={language.label}
                                label={<FlagIcon className="countryIcon" code={language.country}
                                                 size="lg"/>}
                            />
                        ))}
                    </Form.Group>
                </Col>
            </Row>
        );

        const searchModeToggle = (
            <Form.Check
                inline
                type="checkbox"
                id="dbSearchMode"
                checked={this.state.searchMode === SEARCH_MODES.MOVIEDB}
                onChange={this.handleModeChange}
                name="dbSearchMode"
                label={
                    <OverlayTrigger
                        placement="bottom"
                        delay={{show: 250, hide: 1000}}
                        overlay={modeInfoPopover}>
                        <img id="tmdbLogo" alt="The Movie DB" src="/tmdb.png"/>
                    </OverlayTrigger>
                }
            />
        );

        const languagesDropdown = (
            <Dropdown
                onSelect={eventKey => this.handleLanguageChange(eventKey)}>
                <Dropdown.Toggle variant="light" id="languageDropdown" className="text-left">
                    {<FlagIcon code={Language.findByCode(LANGUAGES, this.state.language).country}/>}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {LANGUAGES.map(lang => (
                        <Dropdown.Item key={lang.code} eventKey={lang.code}>
                            <FlagIcon className="dropdownFlag" code={lang.country}/> {lang.label}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        );

        return (
            <Form id="searchForm" onSubmit={this.handleSubmit}>
                <Row id="inputSearchRow">
                    {searchInput}
                    <Col>
                        {this.showLanguageDropdown ? languagesDropdown : ""}
                        {this.showSearchMode ? searchModeToggle : ""}
                    </Col>
                </Row>
                {this.showLanguageRadios ? selectFlagsRow : ''}
            </Form>
        );
    }
}

export default withRouter(SearchMoviesForm);