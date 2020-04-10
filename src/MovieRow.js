import React from "react";

const MAX_DESCRIPTION_LENGTH = 500;

export default class MovieRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movie: props.movie,
            audio: props.audio
        }
    }

    getMovieCoverOrDefaultCover(imageUrl) {
        if (imageUrl && imageUrl.length > 0) {
            return imageUrl;
        } else {
            return "/no-cover.jpg";
        }
    }

    truncateDescription(desc) {
        if (!desc || desc.length < MAX_DESCRIPTION_LENGTH) {
            return desc;
        } else {
            return desc.substring(0, MAX_DESCRIPTION_LENGTH - 3) + "...";
        }
    }

    render() {
        const {movie, audio} = this.state;
        const streamUrl = encodeURI(`/search/stream?movieId=${movie.id}&title=${movie.title}&audio=${audio}`);
        return (
            <tr className="movieTableRow" key={movie.id}>
                <a href={streamUrl}>
                    <td><img src={this.getMovieCoverOrDefaultCover(movie.imageUrl)}
                             alt={movie.title}/>
                    </td>
                    <td className="movieDesc">
                        <span className="movieTitle">{movie.title} ({movie.date})</span>
                        <p>{this.truncateDescription(movie.description)}</p>
                    </td>
                </a>
            </tr>
        )
    }
}