import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {withRouter} from "react-router";
import queryString from 'query-string'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class SearchFormBase extends React.Component {

    constructor(props) {
        super(props);
        this.urlParams = queryString.parse(this.props.location.search);
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

        this.props.history.push(`/search/movie?title=${this.state.title}&audio=en`);
    }

    render() {
        return <Form id="searchForm" onSubmit={this.handleSubmit}>
            <Row>
                <Col xs="9">
                    <InputGroup>
                        <Form.Control id="searchBox" value={this.state.title} type="text"
                                      placeholder="Movie or Series title"
                                      onChange={this.handleChange}/>
                        <InputGroup.Append>
                            <Button variant="outline-dark" type="submit"><FontAwesomeIcon icon={faSearch}/></Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
                <Col xs="3" id="countrySelect" >
                    <Form.Control as="select">
                        <option>English</option>
                        <option>Italian</option>
                        <option>French</option>
                        <option>Spanish</option>
                    </Form.Control>
                </Col>
            </Row>
        </Form>;
    }
}

const SearchForm = withRouter(SearchFormBase);

export default SearchForm;