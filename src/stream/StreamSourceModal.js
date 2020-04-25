import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import AdBlockersDropdown from "./AdBlockersDropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function StreamSourceModal(props) {
    const {show, handleClose, sourceName, sourceUrl} = props;

    return (
        <Modal centered onHide={handleClose} show={show}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>Recommended Adblocker</Col>
                    <Col><AdBlockersDropdown/></Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="secondary">
                    Close
                </Button>
                <Button href={sourceUrl} target="_blank" variant="primary">
                    Go to <b>{sourceName}</b>
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

StreamSourceModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    sourceName: PropTypes.string.isRequired,
    sourceUrl: PropTypes.string.isRequired
};