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
import {languages, searchModes} from "./Common";
import BootstrapSwitchButton from "bootstrap-switch-button-react/lib/bootstrap-switch-button-react";
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
            searchMode: searchModes.moviedb,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchMode = this.switchMode.bind(this);
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

        this.props.onSubmitAction(sanitizedString(this.state.title), this.state.language, this.state.searchMode.name);
    }

    switchMode(checked) {
        if (checked) {
            this.setState({searchMode: searchModes.moviedb});
        } else {
            this.setState({searchMode: searchModes.direct});
        }
    }

    currentlySelectedCountry() {
        return languages
            .find(({langCode}) => this.state.language === langCode)
            .countryCode;
    }

    calculateSearchInputSpace() {
        const MODE_COL_WIDTH = 3;
        const DROP_COL_WIDTH = 2;
        return 12 - (this.showSearchMode * MODE_COL_WIDTH) - (this.showLanguageDropdown * DROP_COL_WIDTH);
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
                    {this.state.searchMode.info}
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
            <OverlayTrigger
                placement="bottom"
                overlay={modeInfoPopover}>
                {/*<Col xs="2">*/}
                <BootstrapSwitchButton
                    checked={this.state.searchMode.name === searchModes.moviedb.name}
                    onlabel='Database'
                    offlabel='Direct'
                    onstyle="dark"
                    offstyle="secondary"
                    width="120"
                    onChange={this.switchMode}
                />
                {/*</Col>*/}
            </OverlayTrigger>
        );

        const languagesDropdown = (
            // <Col xs={2}>
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
            // </Col>
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