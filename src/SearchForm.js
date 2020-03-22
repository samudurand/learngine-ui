import React from "react";
import Form from "react-bootstrap/Form";
import {withRouter} from "react-router";
import queryString from 'query-string'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FlagIcon from "./FlagIcon";

class SearchFormBase extends React.Component {

    constructor(props) {
        super(props);
        this.urlParams = queryString.parse(this.props.location.search);
        this.inlineLanguages = props.inlineLanguages != null ? props.inlineLanguages : true;
        this.state = {title: this.urlParams.title};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({title: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.title == null || this.state.title.length <= 1) {
            return;
        }

        this.props.onSubmitAction(this.state.title);
    }


    render() {
        return <Form id="searchForm" onSubmit={this.handleSubmit}>
            <Row>
                <Col xs={this.inlineLanguages ? "9" : "12"}>
                    <Form.Control id="searchBox" value={this.state.title} type="text"
                                  placeholder="Movie or Series title"
                                  onChange={this.handleChange}/>
                </Col>
                {
                    this.inlineLanguages ?
                        <Col xs="3" id="countrySelect">
                            <Form.Control as="select">
                                <option>English</option>
                                <option>Spanish</option>
                                <option>French</option>
                                <option>Italian</option>
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
                                {[
                                    { code: 'us', lang: 'English' },
                                    { code: 'es', lang: 'Spanish' },
                                    { code: 'fr', lang: 'French' },
                                    { code: 'it', lang: 'Italian' }].map(option => (
                                    <Form.Check
                                        inline
                                        className="countryButton"
                                        id={option.code + "RadioSearch"}
                                        name="countryRadio"
                                        type="radio"
                                        title={option.lang}
                                        label={<FlagIcon className="countryIcon" code={option.code} size="lg"/>}
                                    />
                                ))}
                            </Form.Group>
                        </Col>
                    </Row> : ''
            }
        </Form>;
    }
}

const SearchForm = withRouter(SearchFormBase);

export default SearchForm;