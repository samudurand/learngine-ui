import {Language} from "./Language";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlayCircle} from "@fortawesome/free-regular-svg-icons";

export const LANG_EN = new Language("en", "us", "English");
export const LANG_ES = new Language("es", "es", "Spanish");
export const LANG_FR = new Language("fr", "fr", "French");
export const LANG_IT = new Language("it", "it", "Italian");
export const LANGUAGES = [LANG_EN, LANG_ES, LANG_FR, LANG_IT];

export const AD_BLOCKERS = {
    adblockplus: {
        logo: "adblockplus.png",
        name: "Adblock Plus",
        urls: {
            // eslint-disable-next-line max-len
            chrome: "https://chrome.google.com/webstore/detail/adblock-plus-free-ad-bloc/cfhdojbkjhnklbpkdaibdccddilifddb",
            edge: "https://help.eyeo.com/adblockplus/download-and-install-adblock-plus",
            firefox: "https://addons.mozilla.org/firefox/addon/adblock-plus/"
        }
    },
    ublock: {
        logo: "ublock.png",
        name: "uBlock",
        urls: {
            chrome: "https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm",
            edge: "https://www.microsoft.com/p/ublock-origin/9nblggh444l4?rtc=1&activetab=pivot:overviewtab",
            firefox: "https://addons.mozilla.org/firefox/addon/ublock-origin/"
        }
    }
};

export const SUBTITLES = {
    LOADABLE: "loadable",
    MAYBE: "maybe",
    NONE: "none",
    PROVIDED: "provided"
};

const {ublock} = AD_BLOCKERS;
export const STREAM_SOURCES = {
    "5movies": {
        adblockers: [ublock],
        instructions: <p>
            Simply click on the <FontAwesomeIcon icon={faPlayCircle}/> symbol to start the movie.
        </p>,
        logo: "5movies.png",
        subtitles: {
            presence: SUBTITLES.NONE
        }
    },
    altadefinizione: {
        adblockers: [ublock],
        instructions: "No special instructions",
        logo: "altadefinizione.png",
        subtitles: {
            presence: SUBTITLES.LOADABLE
        }
    },
    animealtadefinizione: {
        adblockers: [ublock],
        instructions: "No special instructions",
        logo: "animealtadefinizione.png",
        subtitles: {
            languages: [LANG_IT],
            presence: SUBTITLES.PROVIDED
        }
    },
    filmfra: {
        adblockers: [ublock],
        instructions: "No special instructions",
        logo: "filmfra.jpg",
        subtitles: {
            languages: [LANG_FR],
            presence: SUBTITLES.PROVIDED
        }
    },
    isubsmovies: {
        adblockers: [ublock],
        instructions: <span>
            Simply click on the <FontAwesomeIcon icon={faPlayCircle}/> symbol to start the movie.
        </span>,
        logo: "isubsmovies.png",
        subtitles: {
            languages: [LANG_EN],
            presence: SUBTITLES.PROVIDED
        }
    },
    netflix: {
        adblockers: [ublock],
        instructions: "No special instructions",
        logo: "netflix.png",
        subtitles: {
            presence: SUBTITLES.NONE
        }
    },
    solarmovie: {
        adblockers: [ublock],
        instructions: "No special instructions",
        logo: "solarmovie.png",
        subtitles: {
            presence: SUBTITLES.NONE
        }
    }
};

export const SEARCH_MODES = Object.freeze({
    DIRECT: Symbol("direct"),
    MOVIEDB: Symbol("moviedb")
});
