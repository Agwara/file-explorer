import React from "react";
import {connect} from "react-redux";

// import {delete_folder, rename_folder} from "../../actions/folders"

import "./Folder.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ItemTypes } from "../../constants/constants";
import { useDrag } from 'react-dnd'

const Folder = (props) => {

    const [{isDragging}, drag] = useDrag(() => ({
        item: {
            name: props.folder_name,
            directory: props.folder_directory
        },
        type: ItemTypes.FOLDER,
        collect: monitor => {
            return ({
                isDragging: !!monitor.isDragging(),
            })},
    }))
    
    return (
        <div
            className="folder" ref={drag} 
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
        >
            <FontAwesomeIcon className="folder__icon" icon="folder" />
            <p className="folder-name">
                {(props.folder_name).length > 13 ? (props.folder_name).slice(0, 13) + "..." : props.folder_name}
            </p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    folders: state.folderReducer,
    currentDirectory: state.currentDirectory
})

export default connect(mapStateToProps)(Folder);
