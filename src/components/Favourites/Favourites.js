import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { set_directory} from "../../actions/directory";
import "./Favourites.css";

const Favourites = (props) => {

    const onSetDirectory = (value) => {
        props.set_directory(value)
    }

    return (
        <div className="favourites">
            <p className="favourites__header">Favourites</p>

            <ul className="favourites__list">
                <li className="favourites__item" onClick={() => onSetDirectory("AirDrop")}>
                    <FontAwesomeIcon className="favourites__icon" icon="wifi" />
                    <p className="favourites__item--text">AirDrop</p>
                </li>

                <li className="favourites__item" onClick={() => onSetDirectory("recents")}>
                    <FontAwesomeIcon className="favourites__icon" icon="clock" />
                    <p className="favourites__item--text">Recents</p>
                </li>

                <li className="favourites__item" onClick={() => onSetDirectory("applications")}>
                    <p className="icon-not-found"></p>

                    <p className="favourites__item--text">Applications</p>
                </li>

                <li className="favourites__item" onClick={() => onSetDirectory("downloads")}>
                    <FontAwesomeIcon className="favourites__icon" icon="download" />
                    <p className="favourites__item--text">Downloads</p>
                </li>

                <li className="favourites__item" onClick={() => onSetDirectory("pictures")}>
                    <FontAwesomeIcon className="favourites__icon" icon="image" />
                    <p className="favourites__item--text">Pictures</p>
                </li>

                <li className="favourites__item" onClick={() => onSetDirectory("agwara")}>
                    <FontAwesomeIcon className="favourites__icon" icon="home" />
                    <p className="favourites__item--text">Agwara</p>
                </li>

                <li className="favourites__item" onClick={() => onSetDirectory("music")}>
                    <FontAwesomeIcon className="favourites__icon" icon="music" />
                    <p className="favourites__item--text">Music</p>
                </li>

                <li className="favourites__item" onClick={() => onSetDirectory("movies")}>
                    <FontAwesomeIcon className="favourites__icon" icon="film" />
                    <p className="favourites__item--text">Movies</p>
                </li>

                <li className="favourites__item" onClick={() => onSetDirectory("creative cloud files")}>
                    <FontAwesomeIcon className="favourites__icon" icon="folder-open" />
                    <p className="favourites__item--text">Creative Cloud Files</p>
                </li>
            </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    set_directory: (text) => dispatch(set_directory(text))
})

export default connect(undefined, mapDispatchToProps)(Favourites);