import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import React from "react";

export default function SpinnerRow() {
    return (
        <Row id="spinnerRow">
            <Col id="spinner">
                <Spinner animation="border" role="status" variant="secondary">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <span>Searching for more streams...</span>
            </Col>
        </Row>
    );
}