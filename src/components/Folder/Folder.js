import React, {useState} from "react";
import {connect} from "react-redux";

import {delete_folder, rename_folder} from "../../actions/folders"

import "./Folder.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Folder = (props) => {
    const [showEditDelete, setShowEditDelete] = useState(false);
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const [errorMessage, setError] = useState(false)

    const [newFolderName, setNewFolderName] = useState("") 

    const test = (event) => {
        if (event.button === 2) {
            setPosX(event.screenX)
            setPosY(event.screenY)
            setShowEditDelete(true)
        } 
    }

    const styleObj = {
        position: "absolute",
        top: `${posY - 200}px`,
        left: `${posX - 400}px`,
        width: "20rem",
        height: "20rem",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "3px"
    }

    const closeObj = {
        display: "none"
    }

    const closePopUp = () => {
        setShowEditDelete(false)
        setError(false)
    }

    const onNameChange = (e) => {
        setNewFolderName(e.target.value)
    }

    const checkFolderName = () => {
        props.folders.map((folder) => {
            if (folder.folder_name === newFolderName) {
                setError(true)
            }
            return true;
        })
    }

    const removeErrorMessage = (e) => {
        setError(false)
    }

    const onDeleteFolder = () => {
        props.delete_folder(props.folder_name, props.folder_directory)
    }

    const onRenameChange = () => {
        if ((newFolderName.length > 0) && (!errorMessage)) {
            props.rename_folder(props.folder_name, newFolderName, props.folder_directory)
        }
    }

    return (
        <div className="folder" onMouseDown={test} onMouseLeave={closePopUp}>
            <FontAwesomeIcon className="folder__icon" icon="folder" />
            <p className="folder-name">
                {(props.folder_name).length > 13 ? (props.folder_name).slice(0, 13) + "..." : props.folder_name}
            </p>

            <div style={showEditDelete ? styleObj : closeObj}>
                <p className="close-popup" onClick={closePopUp}>Close</p>

                {
                    errorMessage ? <p className="error">Folder Already Exists!</p> : ""
                }

                <input 
                    type="text"
                    className="popup__input"
                    onChange={onNameChange}
                    onBlur={checkFolderName}
                    onFocus={removeErrorMessage} 
                    defaultValue={props.folder_name}
                />

                <button onClick={onRenameChange} className="popup__rename">Rename Folder</button>

                <button onClick={onDeleteFolder} className="popup__delete">Delete</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    folders: state.folderReducer,
    currentDirectory: state.currentDirectory
})

const mapDispatchToProps = (dispatch) => ({
    delete_folder: (folder_name, folder_directory) => dispatch(delete_folder(folder_name, folder_directory)),
    rename_folder: (folder_name, prevName, folder_directory) => dispatch(rename_folder(folder_name, prevName, folder_directory))
});


export default connect(mapStateToProps, mapDispatchToProps)(Folder);
