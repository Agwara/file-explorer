import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Cloud.css";
import { set_directory} from "../../actions/directory";

const Cloud = (props) => {

    const onSetDirectory = (value) => {
        props.set_directory(value)
    }

    return (
        <div className="cloud">
            <p className="cloud__header">iCloud</p>

            <ul className="cloud__list">
                <li className="cloud__item" onClick={() => onSetDirectory("cloud drive")}>
                    <FontAwesomeIcon className="cloud__icon" icon="cloud" />
                    <p className="cloud__item--text">Cloud Drive</p>
                </li>

                <li className="cloud__item" onClick={() => onSetDirectory("documents")}>
                    <FontAwesomeIcon className="cloud__icon" icon="file" />
                    <p className="cloud__item--text">Documents</p>
                </li>

                <li className="cloud__item" icon="desktop" onClick={() => onSetDirectory("desktop")}>
                    <FontAwesomeIcon className="cloud__icon" icon="desktop" />
                    <p className="cloud__item--text">Desktop</p>
                </li>
            </ul>

        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    set_directory: (text) => dispatch(set_directory(text))
})

export default connect(undefined, mapDispatchToProps)(Cloud);

