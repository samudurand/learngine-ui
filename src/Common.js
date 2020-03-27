import React from "react";

export const languages = [
    {countryCode: "us", langCode: "en", langLabel: "English"},
    {countryCode: "es", langCode: "es", langLabel: "Spanish"},
    {countryCode: "fr", langCode: "fr", langLabel: "French"},
    {countryCode: "it", langCode: "it", langLabel: "Italian"}
];

export const sources = {
    "5movies": "5movies.png",
    "altadefinizione": "altadefinizione.png",
    "animealtadefinizione": "animealtadefinizione.png",
    "filmfra": "filmfra.jpg",
    "isubsmovies": "isubsmovies.png",
    "netflix": "netflix.png",
    "solarmovie": "solarmovie.png",
    "streamcomplet": "streamcomplet.png"
};

export const searchModes = {
    moviedb: {
        name: "moviedbMode",
        info: <span>Uses <b>TheMovieDB</b> database to search for movies matching your search, allowing you to select which movie you are looking for. The following search will be more precise and will offer alternative titles in the target language.</span>,
    },
    direct: {
        name: "directMode",
        info: <span>Perform the search directly, more flexible but less precise results. no alternative titles in the target language will be provided.</span>
    }
};