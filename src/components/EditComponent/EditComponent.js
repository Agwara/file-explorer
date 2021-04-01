import React, {useState} from "react";
import {connect} from "react-redux"
import "./EditComponent.css";


import {delete_folder, rename_folder} from "../../actions/folders"


const EditComponent = (props) => {
    const [errorMessage, setErrorMessage] = useState(false)
    const [newFolderName, setNewFolderName] = useState("") 

    const onNameChange = (e) => {
        setNewFolderName(e.target.value)
        setErrorMessage(false)
    }

    const checkFolderName = () => {
        props.folders.map((folder) => {
            if (folder.folder_name === newFolderName) {
                setErrorMessage(true)
            }
            return true;
        })
    }

    const closePopUp = () => {
        props.closeEditPopUp()
    }

    const removeErrorMessage = (e) => {
        setErrorMessage(false)
    }


    const onDeleteFolder = () => {
        props.delete_folder(props.folder_name, props.folder_directory)
        props.closeEditPopUp()
    }


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