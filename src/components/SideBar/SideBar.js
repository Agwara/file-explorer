import React from "react";

import "./SideBar.css";

import Favourites from "../Favourites/Favourites";
import Cloud from "../Cloud/Cloud";

const SideBar = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar__color-list">
                <li className="sidebar__color-item color--1"></li>
                <li className="sidebar__color-item color--2"></li>
                <li className="sidebar__color-item color--3"></li>
            </ul>

            <Favourites />

            <Cloud />
        </div>
    )
}

export default SideBar;
