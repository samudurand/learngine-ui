import React from "react";
import Form from "react-bootstrap/Form";
import {withRouter} from "react-router";
import queryString from 'query-string'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FlagIcon from "./FlagIcon";
import {sanitizedString} from "./Sanitizer";

const languages = [
    {countryCode: "us", langCode: "en", langLabel: "English"},
    {countryCode: "es", langCode: "es", langLabel: "Spanish"},
    {countryCode: "fr", langCode: "fr", langLabel: "French"},
    {countryCode: "it", langCode: "it", langLabel: "Italian"}
];

class SearchMoviesForm extends React.Component {

    constructor(props) {
        super(props);
        this.urlParams = queryString.parse(this.props.location.search);
        this.inlineLanguages = props.inlineLanguages != null ? props.inlineLanguages : true;
        this.state = {
            title: this.urlParams.title || '',
            language: languages[0].langCode
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.title == null || this.state.title.length <= 1) {
            return;
        }

        this.props.onSubmitAction(sanitizedString(this.state.title), this.state.language);
    }

    render() {
        return <Form id="searchForm" onSubmit={this.handleSubmit}>
            <Row>
                <Col xs={this.inlineLanguages ? "9" : "12"}>
                    <Form.Control id="searchBox" value={this.state.title} name="title" type="text"
                                  placeholder="Movie or Series title"
                                  onChange={this.handleChange}/>
                </Col>
                {
                    this.inlineLanguages ?
                        <Col xs="3" id="countrySelect">
                            <Form.Control as="select" onChange={this.handleChange}>
                                {languages.map(language => (
                                    <option value={language.langCode}
                                            key={language.countryCode + "OptionSearch"}>{language.langLabel}</option>
                                ))}
                            </Form.Control>
                        </Col>
                        : ''
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