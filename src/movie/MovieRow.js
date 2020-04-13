import React from "react";
import getCoverUrlOrDefaultCover from "../utils/TemplateUtils";

const MAX_DESCRIPTION_LENGTH = 500;

export default class MovieRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            audio: props.audio,
            movie: props.movie
        };
    }

    shouldComponentUpdate() {
        return true;
    }

    truncateDescription(desc) {
        if (!desc || desc.length < MAX_DESCRIPTION_LENGTH) {
            return desc;
        }
        // eslint-disable-next-line no-magic-numbers
        return `${desc.substring(0, MAX_DESCRIPTION_LENGTH - 3)}...`;
    }

    render() {
        const {movie, audio} = this.state;
        const streamUrl = encodeURI(`/search/stream?movieId=${movie.id}&title=${movie.title}&audio=${audio}`);
        return (
            <tr className="movieTableRow" key={movie.id}>
                <a href={streamUrl}>
                    <td>
                        <img alt={movie.title}
                             src={getCoverUrlOrDefaultCover(movie.imageUrl)}/>
                    </td>
                    <td className="movieDesc">
                        <span className="movieTitle">{movie.title} ({movie.date})</span>
                        <p>{this.truncateDescription(movie.description)}</p>
                    </td>
                </a>
            </tr>
        );
    }
}