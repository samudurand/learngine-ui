import React from "react";
import Form from "react-bootstrap/Form";
import {withRouter} from "react-router";
import queryString from 'query-string'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FlagIcon from "./FlagIcon";
import {sanitizedString} from "./Sanitizer";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {languages, SearchModes} from "./Common";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Dropdown from "react-bootstrap/Dropdown";

class SearchMoviesForm extends React.Component {

    constructor(props) {
        super(props);
        this.urlParams = queryString.parse(this.props.location.search);
        this.showSearchMode = props.showSearchMode ? props.showSearchMode : false;
        this.showLanguageDropdown = props.showLanguageDropdown ? props.showLanguageDropdown : false;
        this.showLanguageRadios = props.showLanguageRadios ? props.showLanguageRadios : false;

        this.state = {
            title: this.urlParams.title || '',
            language: this.urlParams.audio || languages[0].langCode,
            searchMode: SearchModes.MOVIEDB,
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

        this.props.onSubmitAction(sanitizedString(this.state.title), this.state.language, this.state.searchMode);
    }

    currentlySelectedCountry() {
        return languages
            .find(({langCode}) => this.state.language === langCode)
            .countryCode;
    }

    calculateSearchInputSpace() {
        const MODE_COL_WIDTH = 3;
        const DROP_COL_WIDTH = 3;
        return 12 - (this.showSearchMode * MODE_COL_WIDTH) - (this.showLanguageDropdown * DROP_COL_WIDTH);
    }

    handleModeChange(event) {
        if (event.target.checked) {
            this.setState({searchMode: SearchModes.MOVIEDB});
        } else {
            this.setState({searchMode: SearchModes.DIRECT});
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
                        Uses <a href="https://www.themoviedb.org/" target="_blank"><b>TheMovieDB</b></a> database to search for movies matching your search.
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
                        {languages.map(language => (
                            <Form.Check
                                inline
                                className="countryButton"
                                id={language.countryCode + "RadioSearch"}
                                key={language.countryCode + "RadioSearch"}
                                name="language"
                                type="radio"
                                value={language.langCode}
                                checked={this.state.language === language.langCode}
                                onChange={this.handleChange}
                                title={language.langLabel}
                                label={<FlagIcon className="countryIcon" code={language.countryCode}
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
                checked={this.state.searchMode === SearchModes.MOVIEDB}
                onChange={this.handleModeChange}
                name="dbSearchMode"
                label={
                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 1000 }}
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
                    {<FlagIcon code={this.currentlySelectedCountry()}/>}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {languages.map(({countryCode, langCode, langLabel}) => (
                        <Dropdown.Item key={langCode} eventKey={langCode}><FlagIcon className="dropdownFlag"
                                                                                    code={countryCode}/> {langLabel}
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