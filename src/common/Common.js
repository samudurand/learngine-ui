import React from "react";
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
    MOVIEDB: Symbol("moviedb"),
    DIRECT: Symbol("direct")
});