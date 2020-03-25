import * as React from "react";

class MoviesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {streams: []};
        this.eventSource = new EventSource('http://localhost:9000/search/streams?title=matrix&audio=en&engines=false');
    }

    componentDidMount() {
        // this.eventSource.addEventListener('message', (msg) => this.processStreamData(msg));
        this.eventSource.onmessage = (msg) => this.processStreamData(msg);
        this.eventSource.onerror = function () {
            console.log("closed");
            this.close();
        };
    }

    processStreamData(message) {
        console.log(this.state);
        const streams = this.state.streams.slice();
        streams.push(JSON.parse(message.data));
        this.setState({streams: streams});
    }

    render() {
        return (
            <div>
                <h1>Movies</h1>
                <ul>
                    {
                        this.state.streams.length === 0
                            ? 'Loading streams...'
                            : this.state.streams.map(stream => (
                                <li>{stream.source} {stream.title}</li>
                            ))
                    }
                </ul>
            </div>
        );
    }
}

export default MoviesList;