import React from "react";
import {connect} from "react-redux"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";

const Header = (props) => {
    return (
        <div className="header">
            <div className="folder-level">
                <FontAwesomeIcon className="arrow-control color-pronounce" icon="angle-left" />
                <FontAwesomeIcon className="arrow-control color-faint" icon="angle-right" />

                <p className="current-folder">{props.currentDirectory}</p>
            </div>

            <div className="other-controls">
                <div className="th-large__section">
                    <FontAwesomeIcon className="th-large__icon" icon="th-large" />
                    <div className="th-large__control">
                        <FontAwesomeIcon className="th-large__angle" icon="angle-up" />
                        <FontAwesomeIcon className="th-large__angle" icon="angle-down" />
                    </div>
                </div>

                <div className="th__section">
                    <FontAwesomeIcon className="th-large__icon" icon="th" />
                    <FontAwesomeIcon className="th-large__angle" icon="angle-down" />
                </div>
                
                <FontAwesomeIcon className="other-controls__upload" icon="upload" />

                <FontAwesomeIcon className="other-controls__upload" icon="search" />

            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
	currentDirectory: state.currentDirectory
})

export default connect(mapStateToProps)(Header);