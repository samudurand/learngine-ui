import {Language} from "./Language";

export const LANGUAGES = [
    new Language("en", "us", "English"),
    new Language("es", "es", "Spanish"),
    new Language("fr", "fr", "French"),
    new Language("it", "it", "Italian")
];

export const STREAM_SOURCES = {
    "5movies": "5movies.png",
    altadefinizione: "altadefinizione.png",
    animealtadefinizione: "animealtadefinizione.png",
    filmfra: "filmfra.jpg",
    isubsmovies: "isubsmovies.png",
    netflix: "netflix.png",
    solarmovie: "solarmovie.png",
    streamcomplet: "streamcomplet.png"
};

export const SEARCH_MODES = Object.freeze({
    DIRECT: Symbol("direct"),
    MOVIEDB: Symbol("moviedb")
});

export const AD_BLOCKERS = {
    ublock: {
        logo: "ublock.png",
        name: "uBlock",
        urls: {
            chrome: "https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm",
            edge: "https://www.microsoft.com/p/ublock-origin/9nblggh444l4?rtc=1&activetab=pivot:overviewtab",
            firefox: "https://addons.mozilla.org/firefox/addon/ublock-origin/"
        }
    }
}