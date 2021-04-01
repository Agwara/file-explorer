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

    const test = (event) => {
        if (event.button === 2 && props.folder_name) {
            setDisplayEdit(true)
        } else if (event.button === 2) {
            setDisplayCreate(true)
        }
    }

    const moveFolder = (name, name2, directory, sqX, sqY) => {
        console.log(name, name2)
        if (props.folder_name) {
            setNotAllowed("red")
            setTimeout(() => {
                setNotAllowed("")
            }, 200)
        } else {
            props.rename_folder(name, name2, directory, sqX, sqY)
        }
    }

    const onRemoveActivePopUp = () => {
        setTimeout(() => {
            setDisplayEdit(false)
            setDisplayCreate(false)
        }, 100)
    }

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
