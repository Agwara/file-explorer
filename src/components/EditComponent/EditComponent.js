import React, {useState} from "react";
import {connect} from "react-redux"
import "./EditComponent.css";


import {delete_folder, rename_folder} from "../../actions/folders"

/*
    This component handles the logic for Editing and Removoing a folder
*/

const EditComponent = (props) => {
    const [errorMessage, setErrorMessage] = useState(false)
    const [newFolderName, setNewFolderName] = useState("") 


    // Changes the newFolderName state variable when a user types 
    const onNameChange = (e) => {
        setNewFolderName(e.target.value)
        setErrorMessage(false)
    }

    // Checks if that particular name exist when the input field is out of focus
    const checkFolderName = () => {
        props.folders.map((folder) => {
            if (folder.folder_name === newFolderName) {
                setErrorMessage(true)
            }
            return true;
        })
    }

    // For closing the component
    const closePopUp = () => {
        props.closeEditPopUp()
    }

    // For removing the error message
    const removeErrorMessage = (e) => {
        setErrorMessage(false)
    }

    /*
        This function dispatches a redux action to update the app state
        after deleting a folder
    */
    const onDeleteFolder = () => {
        props.delete_folder(props.folder_name, props.folder_directory)
        props.closeEditPopUp()
    }

    /*
        This function dispatches a redux action to update the app state
        after editing a folder
    */
    const onRenameChange = () => {
        if ((newFolderName.length > 0) && (!errorMessage)) {

            props.rename_folder(props.folder_name, newFolderName, props.folder_directory, props.posX, props.posY)

            setTimeout(() => {
                closePopUp()
            }, 100)
        }
    }


    return (
        <div className="edit-folder" onMouseLeave={closePopUp}>
                {
                    errorMessage ? <p className="error">Folder Already Exists!</p> : ""
                }

                <input
                    type="text"
                    placeholder="Enter Folder Name" 
                    className="popup__input"
                    onChange={onNameChange}
                    onBlur={checkFolderName}
                    onFocus={removeErrorMessage}
                    defaultValue={props.folder_name}
                />

                <button onClick={onRenameChange} className="popup__rename">Rename Folder</button>

                <button onClick={onDeleteFolder} className="popup__delete">Delete</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    delete_folder: (folder_name, folder_directory) => dispatch(delete_folder(folder_name, folder_directory)),
    rename_folder: (folder_name, prevName, folder_directory, posX, posY) => dispatch(rename_folder(folder_name, prevName, folder_directory, posX, posY))
});


export default connect(undefined, mapDispatchToProps)(EditComponent);