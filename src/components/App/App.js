import React from "react";

import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";
import FolderArea from "../FolderArea/FolderArea";

import "../FontAwesome/FontAwesome";

import "./App.css";

const App = () => {
    window.addEventListener('contextmenu', function (e) { 
        e.preventDefault(); 
    }, false);
    
    return (
        <div className="app">
            <SideBar />
            <Header />
            <FolderArea />
        </div>
    )
}

export default App;
