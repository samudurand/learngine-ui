import React from "react";
import getCoverUrlOrDefaultCover from "../utils/TemplateUtils";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {config} from "../common/Config";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import Spinner from "react-bootstrap/Spinner";

const MAX_DESCRIPTION_LENGTH = 500;
const TRANSLATE_URL = `${config.backend.url}/languages/translate`;

export class MovieRow extends React.Component {

    constructor(props) {
        super(props);
        const {audio, movie} = props;

        this.state = {
            audio,
            movie,
            transInProgress: false
        };

        this.translateDescription = this.translateDescription.bind(this);
        this.saveTranslatedDescription = this.saveTranslatedDescription.bind(this);
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        const {i18n, t} = this.props;
        const {movie, audio, transInProgress} = this.state;
        const streamUrl = encodeURI(`/search/stream?movieId=${movie.id}&title=${movie.title}&audio=${audio}`);
        return (
            <tr className="movieTableRow" key={movie.id}>
                <td>
                    <a href={streamUrl}>
                        <img alt={movie.title}
                             src={getCoverUrlOrDefaultCover(movie.imageUrl)}/>
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
                            !i18n.language.startsWith("en") && ( // eslint-disable-line no-extra-parens
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
                target: i18n.language,
                text: movie.description
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })
            .then((res) => res.json())
            .then(this.saveTranslatedDescription);
    }

    saveTranslatedDescription(jsonBody) {
        this.setState((oldstate) => {
            const {movie} = oldstate;
            movie.description = jsonBody.translation;
            return {
                movie,
                transInProgress: false
            };
        });
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
    audio: PropTypes.string.isRequired,
    movie: PropTypes.object.isRequired
};

export default withTranslation()(MovieRow);