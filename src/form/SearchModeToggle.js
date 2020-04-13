import Popover from "react-bootstrap/Popover";
import Form from "react-bootstrap/Form";
import {SEARCH_MODES} from "../common/Common";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import React from "react";
import PropTypes from "prop-types";

export function SearchModeToggle(props) {
    const {mode, handleChange} = props;

    const modeInfoPopover =
        <Popover id="popover-basic">
            <Popover.Content>
                    <span>
                        Uses <a href="https://www.themoviedb.org/" rel="noopener noreferrer" target="_blank">
                        <b>TheMovieDB</b></a> database to search for movies matching your search.
                        The following search will be more precise and will offer alternative titles
                        in the target language. Disabling this will perform a <b>direct stream search</b>,
                        allowing a more flexible but less precise search.
                    </span>
            </Popover.Content>
        </Popover>;

    return (
        <Form.Check
            checked={mode === SEARCH_MODES.MOVIEDB}
            id="dbSearchMode"
            inline
            label={
                <OverlayTrigger
                    delay={{hide: 1000, show: 250}}
                    overlay={modeInfoPopover}
                    placement="bottom">
                    <img alt="The Movie DB" id="tmdbLogo" src="/tmdb.png"/>
                </OverlayTrigger>
            }
            name="dbSearchMode"
            onChange={handleChange}
            type="checkbox"
        />);
}

SearchModeToggle.defaultProps = {
    mode: SEARCH_MODES.MOVIEDB
};

SearchModeToggle.propTypes = {
    handleChange: PropTypes.func.isRequired,
    mode: PropTypes.symbol
};