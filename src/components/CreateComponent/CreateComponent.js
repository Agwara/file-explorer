import React, {useState} from "react";
import {connect} from "react-redux";

import "./CreateComponent.css"

import {create_folder} from "../../actions/folders"

/*
    This component is concerned witht logic of creating 
    a component
*/

const CreateComponent = (props) => {
    const [errorMessage, setErrorMessage] = useState(false);
    const [folderName, setFolderName] = useState("")

    const closePopUp = () => {
        props.closeCreatePopUp()
    }

    // Changes the newFolderName state variable when a user types 
    const onNameChange = (e) => {
        setFolderName(e.target.value)
        setErrorMessage(false)
    }
    
    /*
        This function dispatches a redux action to update the app state
        after creating a folder
    */
    const onCreateFolder = () => {
        if ((folderName.length > 0) && !errorMessage) {
            closePopUp()
            props.create_folder(folderName, props.currentDirectory, props.posX, props.posY)
        }
    }

    const removeErrorMessage = (e) => {
        setErrorMessage(false)
    }

    // Checks if that particular name exist when the input field is out of focus
    const checkFolderName = () => {
        props.folders.map((folder) => {
            if (folder.folder_name === folderName) {
                setErrorMessage(true)
            }
            return true;
        })
    }

    return (
        <div className="create-folder" onMouseLeave={closePopUp}>
                {
                    errorMessage ? <p className="error">Folder Already Exists!</p> : ""
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
    )
}

const mapStateToProps = (state) => ({
    currentDirectory: state.currentDirectory
})

const mapDispatchToProps = (dispatch) => ({
	create_folder: (folder_name, folder_directory, posX, posY) => dispatch(create_folder(folder_name, folder_directory, posX, posY))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateComponent);
