import React, {useState} from 'react'
import { connect } from "react-redux"

import { set_drag_name } from "../../actions/dragName"
import {rename_folder,} from "../../actions/folders"
import { ItemTypes } from "../../constants/constants";
import { useDrop } from 'react-dnd'

import EditComponent from "../EditComponent/EditComponent";
import CreateComponent from "../CreateComponent/CreateComponent";

import "./Square.css"

const Square = (props) => {
    const [notAllowed, setNotAllowed] = useState("")
    const [displayCreate, setDisplayCreate] = useState(false);
    const [displaEdit, setDisplayEdit] = useState(false)

    /*
        For setting the drop zone for a folder when it been dragged
    */

    const[{isOver}, drop] = useDrop({
        drop: () => moveFolder(props.dragName, props.dragName, props.folder_directory, props.posX, props.posY),
        accept: ItemTypes.FOLDER,
        collect: monitor => ({
        isOver: !!monitor.isOver()
        })
    })

    const closeEditPopUp = () => {
        setTimeout(() => {
            setDisplayEdit(false)
        }, 100);
    }

    const closeCreatePopUp = () => {
        setTimeout(() => {
            setDisplayCreate(false)
        }, 100)
    }

    /*
        This function is fired when a user right clicks on a square.
        if the square has a folder_name, then the edit popup shows
        if the square has no folder_name, then the create popup shows
    */
    const test = (event) => {
        if (event.button === 2 && props.folder_name) {
            setDisplayEdit(true)
        } else if (event.button === 2) {
            setDisplayCreate(true)
        }
    }

    /*
        This function is fired when a users drags a folder.
        It is called in the drop function.
    */
    const moveFolder = (name, name2, directory, sqX, sqY) => {
        if (props.folder_name) {
            setNotAllowed("red")
            setTimeout(() => {
                setNotAllowed("")
            }, 200)
        } else {
            props.rename_folder(name, name2, directory, sqX, sqY)
        }
    }

    /*
        It is fired when a mouse leaves a square area
    */
    const onRemoveActivePopUp = () => {
        setTimeout(() => {
            setDisplayEdit(false)
            setDisplayCreate(false)
        }, 100)
    }

    /*
        When we hover on a square we set the "dragName" in the redux store 
    */
    const onSetDragName = () => {
        props.set_drag_name(props.folder_name)
    }

    return (
        <div onMouseDown={test} ref={drop} onMouseLeave={onRemoveActivePopUp} onMouseEnter={onSetDragName}
            className="square" 
            style={{
                width: '18rem',
                height: '14rem',
                border: isOver? "1px solid blue" : "",
                backgroundColor: notAllowed
            }}
        >
            {props.children}  

            {
                displaEdit ?  <EditComponent 
                                folder_name={props.folder_name}
                                folder_directory={props.folder_directory}
                                posX={props.posX}
                                posY={props.posY}
                                closeEditPopUp={closeEditPopUp}
                                folders={props.folders}
                              /> : <div></div>
            }

            {
                displayCreate ?  <CreateComponent 
                                    posX={props.posX}
                                    posY={props.posY}
                                    closeCreatePopUp={closeCreatePopUp}
                                    folders={props.folders}
                              /> : <div></div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    dragName: state.dragName
})

const mapDispatchToProps = (dispatch) => ({
    set_drag_name: (dragName) => dragName ? dispatch(set_drag_name(dragName)) : null,
    rename_folder: (folder_name, prevName, folder_directory, posX, posY) => dispatch(rename_folder(folder_name, prevName, folder_directory, posX, posY))
});

export default connect(mapStateToProps, mapDispatchToProps)(Square);
