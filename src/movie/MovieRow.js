import React from "react";
import getCoverUrlOrDefaultCover from "../utils/TemplateUtils";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {config} from "../common/Config";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import Spinner from "react-bootstrap/Spinner";
import {compose} from "redux";
import {connect} from "react-redux";
import {mapLanguageStateToProps, setTargetLanguage} from "../common/reduxSetup";

const MAX_DESCRIPTION_LENGTH = 500;
const TRANSLATE_URL = `${config.backend.url}/languages/translate`;

export class MovieRow extends React.Component {

    constructor(props) {
        super(props);
        const {movie} = props;

        this.state = {
            movie,
            transDone: false,
            transInProgress: false
        };

        this.translateDescription = this.translateDescription.bind(this);
        this.saveTranslatedDescription = this.saveTranslatedDescription.bind(this);
        this.handleTranslationFailure = this.handleTranslationFailure.bind(this);
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        const {i18n, t, targetLanguage} = this.props;
        const {movie, transDone, transInProgress} = this.state;
        const streamUrl = encodeURI(`/search/stream?movieId=${movie.id}&title=${movie.title}&audio=${targetLanguage}`);
        return (
            <tr className="movieTableRow" key={movie.id}>
                <td>
                    <a href={streamUrl}>
                        <img alt={movie.title} src={getCoverUrlOrDefaultCover(movie.imageUrl)}/>
                    </a>
                </td>
                <td className="movieDesc">
                    <Row>
                        <Col>
                            <a href={streamUrl}>
                                <p className="movieTitle mb-2">{movie.title} ({movie.date})</p>
                            </a>
                        </Col>
                        {
                            !i18n.language.startsWith("en") && !transDone && ( // eslint-disable-line no-extra-parens
                                <Col className="col-auto">
                                    <Button disabled={transInProgress}
                                            onClick={this.translateDescription}
                                            size="sm"
                                            variant="warning">
                                        {!transInProgress && t("translateBtn")}
                                        {transInProgress && <Spinner animation="border" role="status" size="sm"/>}
                                    </Button>
                                </Col>
                            )
                        }
                    </Row>
                    <Row>
                        <Col>
                            <a href={streamUrl}>
                                <p>{this.truncateDescription(movie.description)}</p>
                            </a>
                        </Col>
                    </Row>
                </td>
            </tr>
        );
    }

    translateDescription(e) {
        const {i18n} = this.props;
        const {movie} = this.state;
        e.preventDefault();

        this.setState({
            transInProgress: true
        });

        return fetch(encodeURI(`${TRANSLATE_URL}`), {
            body: JSON.stringify({
                movieId: movie.id,
                target: i18n.language
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST"
        })
            .then((res) => res.json())
            .then(this.saveTranslatedDescription)
            .catch(this.handleTranslationFailure);
    }

    saveTranslatedDescription(jsonBody) {
        this.setState((oldstate) => {
            const {movie} = oldstate;
            movie.description = jsonBody.translation;
            return {
                movie,
                transDone: true,
                transInProgress: false
            };
        });
    }

    handleTranslationFailure() {
        this.setState({transInProgress: false});
    }

    truncateDescription(desc) {
        if (!desc || desc.length < MAX_DESCRIPTION_LENGTH) {
            return desc;
        }
        // eslint-disable-next-line no-magic-numbers
        return `${desc.substring(0, MAX_DESCRIPTION_LENGTH - 3)}...`;
    }
}

MovieRow.propTypes = {
    movie: PropTypes.object.isRequired
};

export default compose(
    withTranslation(),
    connect(mapLanguageStateToProps, {setTargetLanguageFn: setTargetLanguage})
)(MovieRow);