import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import SearchStreams from "./SearchStreams";
import {shallow} from "enzyme";
import {sources} from 'eventsourcemock';
import {SEARCH_MODES} from "../common/Common";
import {config} from "../common/Config";
import {flushPromises} from "../common/TestCommons";
import {AlternativeTitlesRow} from "./AlternativeTitlesRow";
import SpinnerRow from "./SpinnerRow";
import {SourcePanel} from "./SourcePanel";

describe('SearchStreams', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><SearchStreams/></BrowserRouter>, div);
    });

    it('initialize state', () => {
        const component = new SearchStreams.WrappedComponent({
            location: {
                search: 'movieId=603&title=matrix&audio=en'
            }
        });

        expect(component.state).toStrictEqual({
            isLoaded: false,
            streams: {},
            alternativeTitles: [],
            movieId: "603",
            movieTitle: "matrix",
            movieAudio: "en"
        });
    });
});

describe('SearchStreams Alternative Titles', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <SearchStreams.WrappedComponent location={{search: 'movieId=603&title=matrix&audio=en'}}/>,
            {disableLifecycleMethods: true}
        );
        fetch.resetMocks()
    });

    it('retrieve alternative titles', async() => {
        fetch.once(JSON.stringify(["The Matrix", "Matrix Revolution"]))

        await wrapper.instance().retrieveAlternativeTitles();

        expect(wrapper.state().movieId).toBe("603");
        expect(fetch.mock.calls.length).toBe(1);
        expect(new Set(wrapper.state().alternativeTitles))
            .toEqual(new Set(["The Matrix", "Matrix Revolution"]));
    });

    it('retrieve alternative titles with no results', async() => {
        fetch.once("[]")

        await wrapper.instance().retrieveAlternativeTitles();

        expect(fetch.mock.calls.length).toBe(1);
        expect(wrapper.state().alternativeTitles).toBeEmpty();
    });

    it('retrieve alternative titles skipped when no movie ID available', async() => {
        const wrapperNoId = shallow(
            <SearchStreams.WrappedComponent location={{search: 'title=matrix&audio=en'}}/>,
            {disableLifecycleMethods: true}
        );

        await wrapperNoId.instance().retrieveAlternativeTitles();

        expect(wrapperNoId.state().movieId).toBe("");
        expect(fetch.mock.calls).toBeEmpty();
    });
});

describe('SearchStreams Fetch Streams', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <SearchStreams.WrappedComponent
                location={{search: 'movieId=603&title=matrix&audio=en'}}/>,
            {disableLifecycleMethods: true}
        );
    });

    it('search for streams, process each event, then closes the connection', () => {
        const matrixEvent = buildEvent('message', matrix);
        const matrixRevEvent = buildEvent('message', matrixRevolution);
        const matrixEventOtherSouce = buildEvent('message', matrix2);
        const errorEvent = buildEvent('error', 'connection closed');

        wrapper.instance().startEventStream();
        const source = sources[`${config.backend.url}/search/streams?title=matrix&audio=en`];
        source.emitOpen();
        source.emit(matrixEvent.type, matrixEvent)
        source.emit(matrixRevEvent.type, matrixRevEvent)
        source.emit(matrixEventOtherSouce.type, matrixEventOtherSouce)
        source.emit(errorEvent.type, errorEvent)

        expect(wrapper.state().streams).toStrictEqual({
            altadefinizione: [matrix, matrixRevolution],
            somesource: [matrix2]
        });
        expect(wrapper.state().isLoaded).toBeTrue();
        expect(source.readyState).toBe(2);
    });

    const matrix = {
        title: "matrix",
        link: "https://altadefinizione.rocks/matrix-streaming-ita/",
        imageUrl: "http://imgur/m.jpg",
        sourceId: "altadefinizione",
        source: "Alta Definizione"
    };

    const matrix2 = {
        title: "matrix",
        link: "https://altadefinizione.rocks/matrix-streaming-ita/",
        imageUrl: "http://imgur/m.jpg",
        sourceId: "somesource",
        source: "Some Source"
    };

    const matrixRevolution = {
        title: "matrix revolution",
        link: "https://altadefinizione.rocks/matrix-revolutions-streaming-ita/",
        imageUrl: "http://imgur/mr.jpg",
        sourceId: "altadefinizione",
        source: "Alta Definizione"
    };
});

describe('SearchStreams Performs Search', () => {
    let wrapper;
    let history;

    beforeEach(() => {
        history = {push: jest.fn()};
        wrapper = shallow(
            <SearchStreams.WrappedComponent
                history={history}
                location={{search: 'movieId=603&title=matrix&audio=en'}}/>,
            {disableLifecycleMethods: true}
        );
        fetch.resetMocks()
    });

    it('performs a direct search and refreshes the current page without pulling new titles', async () => {
        const daredevilEvent = buildEvent('message', daredevil)
        const errorEvent = buildEvent('error', 'connection closed');

        await wrapper.instance().performSearch("daredevil", "it", SEARCH_MODES.DIRECT);
        const source = sources[`${config.backend.url}/search/streams?title=daredevil&audio=it`];
        source.emitOpen();
        source.emit(daredevilEvent.type, daredevilEvent)
        source.emit(errorEvent.type, errorEvent)
        wrapper.update()

        expect(wrapper.state().streams).toStrictEqual({
            altadefinizione: [daredevil],
        });
        expect(history.push).toHaveBeenCalledWith('/search/stream?title=daredevil&audio=it');
        expect(fetch.mock.calls.length).toBe(0);
        expect(wrapper.state().alternativeTitles).toEqual([]);
    });

    it('redirects to movie search', async () => {
        await wrapper.instance().performSearch("daredevil", "it", SEARCH_MODES.MOVIEDB);

        expect(history.push).toHaveBeenCalledWith('/search/movie?title=daredevil&audio=it');
        expect(fetch.mock.calls.length).toBe(0);
    });

    const daredevil = {
        title: "daredevil",
        link: "https://altadefinizione.rocks/daredevil-streaming-ita/",
        imageUrl: "http://imgur/m.jpg",
        sourceId: "altadefinizione",
        source: "Alta Definizione"
    };
});

describe('SearchStreams rendering', () => {

    beforeEach(() => {
        fetch.resetMocks();
    })

    it('renders the page with alternative titles and streams components', async () => {
        fetch.once(JSON.stringify(["The Flight Club", "Boen klub"]));
        const wrapper = shallow(
            <SearchStreams.WrappedComponent
                location={{search: 'movieId=550&title=fight%20club&audio=en'}}/>
        );
        const fightClubEvent = buildEvent('message', fightClub);
        const fightClub2Event = buildEvent('message', fightClub2);
        const errorEvent = buildEvent('error', 'connection closed');

        await flushPromises();
        const source = sources[`${config.backend.url}/search/streams?title=fight%20club&audio=en`];
        source.emitOpen();
        source.emit(fightClubEvent.type, fightClubEvent);
        source.emit(fightClub2Event.type, fightClub2Event);
        source.emit(errorEvent.type, errorEvent);

        expect(wrapper.find("#searchRow")).toHaveLength(1);
        expect(wrapper.find(AlternativeTitlesRow)).toHaveLength(1);
        expect(wrapper.find("#resultsRow")).toHaveLength(1);
        // eslint-disable-next-line no-magic-numbers
        expect(wrapper.find(SourcePanel)).toHaveLength(2);
        expect(wrapper.find("#noResultsRow")).toHaveLength(0);
        expect(wrapper.find(SpinnerRow)).toHaveLength(0);
    });

    const fightClub = {
        title: "Fight Club",
        link: "https://altadefinizione.rocks/fightclub/",
        imageUrl: "http://imgur/fc.jpg",
        sourceId: "solarmovie",
        source: "Solar Movie"
    }

    const fightClub2 = {
        title: "Fight Club",
        link: "https://altadefinizione.rocks/fightclub/",
        imageUrl: "http://imgur/fc.jpg",
        sourceId: "isubsmovies",
        source: "I Subs Movies"
    }
});

function buildEvent(type, data) {
    return new MessageEvent(type, {
        data: JSON.stringify(data)
    });
}