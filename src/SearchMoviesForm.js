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

class SearchMoviesForm extends React.Component {

    constructor(props) {
        super(props);
        this.urlParams = queryString.parse(this.props.location.search);
        this.inlineLanguages = props.inlineLanguages != null ? props.inlineLanguages : true;
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

    handleLanguageChange(event) {
        if (this.props.onLanguageChangeAction) {
            this.props.onLanguageChangeAction(event.target.value);
        }
        this.handleChange(event);
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

    render() {
        const modeInfoPopover = (
            <Popover id="popover-basic">
                <Popover.Content>
                    {this.state.searchMode.info}
                </Popover.Content>
            </Popover>
        );

        return <Form id="searchForm" onSubmit={this.handleSubmit}>
            <Row>
                <Col id="SearchInputCol" xs={this.inlineLanguages ? "8" : "10"}>
                    <InputGroup>
                        <Form.Control id="searchBox" value={this.state.title} name="title" type="text"
                                      placeholder="Movie or Series title"
                                      onChange={this.handleChange}/>
                        <InputGroup.Append>
                            <Button variant="outline-dark" type="submit"><FontAwesomeIcon icon={faSearch}/></Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
                {
                    this.inlineLanguages ?
                        <Col xs="4" id="countrySelect">
                            <Form.Control
                                as="select"
                                name="language"
                                defaultValue={this.state.language}
                                onChange={this.handleLanguageChange}>
                                {languages.map(language => (
                                    <option value={language.langCode}
                                            key={language.countryCode + "OptionSearch"}>
                                        {language.langLabel} (Audio)
                                    </option>
                                ))}
                            </Form.Control>
                        </Col>
                        : <OverlayTrigger
                            placement="bottom"
                            overlay={modeInfoPopover}>
                            <Col xs="2">
                                <BootstrapSwitchButton
                                    checked={this.state.searchMode.name === searchModes.moviedb.name}
                                    onlabel='Database'
                                    offlabel='Direct'
                                    onstyle="dark"
                                    offstyle="secondary"
                                    width="120"
                                    onChange={this.switchMode}
                                />
                            </Col>
                        </OverlayTrigger>
                }
            </Row>
            {
                !this.inlineLanguages ?
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
                    </Row> : ''
            }
        </Form>;
    }
}

export default withRouter(SearchMoviesForm);