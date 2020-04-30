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
        logo: "5movies/5movies.png",
        subtitles: {
            presence: SUBTITLES.NONE
        }
    },
    altadefinizione: {
        adblockers: [ublock],
        instructions: <div>
            <p>
                This website stores the video files on multiple servers.
                Select among the available resolutions or servers in case the default one does not work.
            </p>
            <img alt="servers" src="/sources/altadefinizione/servers.png" width="90%"/>
            <h6 className="font-weight-bold mt-3">Bypassing the ads</h6>
            <p>
                When clicking on the <FontAwesomeIcon icon={faPlayCircle}/>, you will see a fake movie start.
                Be sure to click on
                the <img alt="secs" className="pr-2" src="/sources/altadefinizione/sec-box.png" width="60px"/>
                at the bottom right of the video before the time elapses. This will redirect you to an advertising tab.
                Close it and come back to the website tab, where you will see
                another <FontAwesomeIcon icon={faPlayCircle}/>, this time the real one. Click and enjoy!
            </p>
        </div>,
        logo: "altadefinizione/altadefinizione.png",
        subtitles: {
            presence: SUBTITLES.LOADABLE
        }
    },
    animealtadefinizione: {
        adblockers: [ublock],
        instructions: <p>
            Simply click on the <FontAwesomeIcon icon={faPlayCircle}/> symbol to start the movie/series.
        </p>,
        logo: "animealtadefinizione/animealtadefinizione.png",
        subtitles: {
            languages: [LANG_IT],
            presence: SUBTITLES.PROVIDED
        }
    },
    filmfra: {
        adblockers: [ublock],
        instructions: <div>
            <p>
                This website does not allow for direct link.
                You will have to use the search box to find the movie you want. The title has to be exact.
            </p>
            <img alt="search box" className="mb-3" src="/sources/filmfra/searchbox.png" width="50%"/>
            <p>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Click on the title you want once autocompleted, then click on "Regarder".
                Then click on the <FontAwesomeIcon icon={faPlayCircle}/> symbol to start the movie.
            </p>
        </div>,
        logo: "filmfra/filmfra.jpg",
        subtitles: {
            languages: [LANG_FR],
            presence: SUBTITLES.PROVIDED
        }
    },
    isubsmovies: {
        adblockers: [ublock],
        instructions: <p>
            Simply click on the <FontAwesomeIcon icon={faPlayCircle}/> symbol to start the movie.
        </p>,
        logo: "isubsmovies/isubsmovies.png",
        subtitles: {
            languages: [LANG_EN],
            presence: SUBTITLES.PROVIDED
        }
    },
    netflix: {
        adblockers: [ublock],
        instructions: "No special instructions",
        logo: "netflix/netflix.png",
        subtitles: {
            presence: SUBTITLES.NONE
        }
    },
    solarmovie: {
        adblockers: [ublock],
        instructions: "No special instructions",
        logo: "solarmovie/solarmovie.png",
        subtitles: {
            presence: SUBTITLES.NONE
        }
    }
};

export const SEARCH_MODES = Object.freeze({
    DIRECT: Symbol("direct"),
    MOVIEDB: Symbol("moviedb")
});
