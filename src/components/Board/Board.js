import React, {useState, useEffect } from "react";

import {connect} from "react-redux"

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import "./Board.css";

import Square from "../Square/Square";
import EmptySquare from "../EmptySquare/EmptySquare"
import Folder from "../Folder/Folder"

const Board = (props) => {

    const [currentFolders, setCurrentFolders] = useState([])

    const [coord, setCoord] = useState([])

    /* 
        We give folders that don't have coordinates when the component first mounts.
    */    
    useEffect(() => {
        let tempFolder = []
        props.folders.map((folder, key) => {
            if (folder.folder_directory === props.currentDirectory) {
                tempFolder.push(folder)
            }
            return true
        })

        setCurrentFolders(tempFolder)

        /* 
            Generate the coordinates for each square on thw board.
        */    
        const coordinates = []
        for (let m = 0; m < 30; m++) {
            for (let n = 0; n < 5; n ++) {
                let pos = {
                    posX: n,
                    posY: m
                }
                coordinates.push(pos)
            }
        }

        setCoord(coordinates)
        
    }, [props.folders, props.currentDirectory])
 
    const renderSquare = (i) => {
        let isFolderHere = false;
        let index
        let folder_name
        let folder_directory

        for (let m = 0; m < currentFolders.length; m++) {
            if ((currentFolders[m].posX === coord[i].posX) && (currentFolders[m].posY === coord[i].posY)) {
                folder_name = currentFolders[m].folder_name
                folder_directory = currentFolders[m].folder_directory
                isFolderHere = true
                index = m
                break
            } else {
                folder_name = ""
                folder_directory = props.currentDirectory;
                index = m;
            }
        }

        const piece = isFolderHere ? 
            <Folder
                folder_name={currentFolders[index].folder_name} 
                folder_directory={currentFolders[index].folder_directory}
                folders={currentFolders}
                posX={currentFolders[index].posX}
                posY={currentFolders[index].posY}
            /> : 
            <EmptySquare 
                posX={coord[i].posX}
                posY={coord[i].posY}
            />
        
        return (
            <Square 
                key={i}
                posX={coord[i].posX}
                posY={coord[i].posY}
                folder_name={folder_name}
                folder_directory={folder_directory}
                folders={props.folders}
            >                    
                {piece}
            </Square>
        )
    }

    const squares = []
    if (coord.length > 0) {
        for (let i = 0; i < 30; i++) {
            squares.push(renderSquare(i))
        }  
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="board">
                {squares}
            </div>
        </DndProvider>
    )

}
   

const mapStateToProps = (state) => ({
    folders: state.folderReducer,
    currentDirectory: state.currentDirectory
})


export default connect(mapStateToProps)(Board);