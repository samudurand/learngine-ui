import Popover from "react-bootstrap/Popover";
import Form from "react-bootstrap/Form";
import {SEARCH_MODES} from "../common/Common";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import React from "react";

export function SearchModeToggle(props) {
    const {mode, handleChange} = props;

    const modeInfoPopover = (
        <Popover id="popover-basic">
            <Popover.Content>
                    <span>
                        Uses <a href="https://www.themoviedb.org/" target="_blank"
                                rel="noopener noreferrer"><b>TheMovieDB</b></a> database to search for movies matching your search.
                        The following search will be more precise and will offer alternative titles in the target language.
                        Disabling this will perform a <b>direct stream search</b>, allowing a more flexible but less precise search.
                    </span>
            </Popover.Content>
        </Popover>
    );

    return (
        <Form.Check
            inline
            type="checkbox"
            id="dbSearchMode"
            checked={mode === SEARCH_MODES.MOVIEDB}
            onChange={handleChange}
            name="dbSearchMode"
            label={
                <OverlayTrigger
                    placement="bottom"
                    delay={{show: 250, hide: 1000}}
                    overlay={modeInfoPopover}>
                    <img id="tmdbLogo" alt="The Movie DB" src="/tmdb.png"/>
                </OverlayTrigger>
            }
        />);
}