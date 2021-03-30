import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {create_folder} from "../../actions/folders"

import Folder from "../Folder/Folder"
import "./FolderArea.css";

const FolderArea = (props) => {
    const [displayableFolders, setDisplayableFolder] = useState([])
    const [displayCreate, setDisplayCreate] = useState(false)
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);

    const [folderName, setFolderName] = useState("")
    const [createError, setError] = useState(false)

    useEffect(() => {
        let tempFolders = []
        props.folders.map((folder) => {
            if (folder.folder_directory === props.currentDirectory) {
                tempFolders.push(folder)
            }
            return true;
        })
        setDisplayableFolder(tempFolders)

    }, [props.currentDirectory, props.folders])

    const test = (event) => {
        if (event.button === 2 && event.target.className === "folder-area") {
            setPosX(event.screenX)
            setPosY(event.screenY)
            setDisplayCreate(true)
        }
    }

    const styleObj = {
        position: "absolute",
        top: `${posY - 250}px`,
        left: `${posX - 500}px`,
        width: "20rem",
        height: "18rem",
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
        setDisplayCreate(false)
        setFolderName("")
        setError(false)
    }

    const checkFolderName = () => {
        displayableFolders.map((folder) => {
            if (folder.folder_name === folderName) {
                setError(true)
            }
            return true;
        })
    }

    const onNameChange = (e) => {
        setFolderName(e.target.value)
    }

    const removeErrorMessage = (e) => {
        setError(false)
    }

    const onCreateFolder = () => {
        if ((folderName.length > 0) && !createError) {
            closePopUp()
            props.create_folder(folderName, props.currentDirectory)
        }
    }

    return (
        <div className="folder-area" onMouseDown={test}>
            {
                displayableFolders.map((folder, key) => {
                    return (
                        <Folder 
                            key={key}
                            folder_name={folder.folder_name}
                            folder_directory={props.currentDirectory}
                            folders={displayableFolders}
                        />
                    )
                })
            }

            <div style={displayCreate ? styleObj : closeObj } onMouseLeave={closePopUp}>
                <p className="close-popup" onClick={closePopUp}>Close</p>

                {
                    createError ? <p className="error">Folder Already Exists!</p> : ""
                }

                <input
                    type="text"
                    placeholder="Enter Folder Name" 
                    className="popup__input"
                    value={folderName}
                    onChange={onNameChange}
                    onBlur={checkFolderName}
                    onFocus={removeErrorMessage}
                />

                <button onClick={onCreateFolder} className="popup__btn">Create</button>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    folders: state.folderReducer,
    currentDirectory: state.currentDirectory
})

const mapDispatchToProps = (dispatch) => ({
	create_folder: (folder_name, folder_directory) => dispatch(create_folder(folder_name, folder_directory))
});

export default connect(mapStateToProps, mapDispatchToProps)(FolderArea);

