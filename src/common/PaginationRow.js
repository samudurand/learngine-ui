import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import React from "react";
import PropTypes from "prop-types";

export class PaginationRow extends React.Component {
    constructor(props) {
        super(props);
        const {page} = props;

        this.state = {
            activePage: page
        };

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    shouldComponentUpdate() {
        return true;
    }

    handlePageChange(event) {
        const newPage = parseInt(event.target.text, 10);
        this.setState({
            activePage: newPage
        }, this.props.handlePageTurn(newPage));
    }

    render() {
        const {totalPages} = this.props;
        const {activePage} = this.state;
        return <Row className="border-top pt-3">
            <Col>
                {/* eslint-disable-next-line react/forbid-component-props */}
                <Pagination className="justify-content-center" id="pagination">
                    {
                        [...Array(totalPages).keys()].map((index) => {
                            const pageIndex = index + 1;
                            return (
                                <Pagination.Item active={pageIndex === activePage}
                                                 key={pageIndex}
                                                 onClick={this.handlePageChange}>
                                    {pageIndex}
                                </Pagination.Item>
                            );
                        })
                    }
                </Pagination>
            </Col>
        </Row>;
    }
}

PaginationRow.propTypes = {
    handlePageTurn: PropTypes.func.isRequired,
    page: PropTypes.number,
    totalPages: PropTypes.number.isRequired
};