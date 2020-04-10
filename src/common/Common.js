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

export const SearchModes = Object.freeze({
    MOVIEDB: Symbol("moviedb"),
    DIRECT: Symbol("direct")
});