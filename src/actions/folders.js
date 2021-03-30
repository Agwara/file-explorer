// CREATE_FOLDER
export const create_folder = (folder_name, folder_directory) => ({
    type: "CREATE_FOLDER",
    folder: {
        folder_name,
        folder_directory
    }
})

// DELETE_FOLDER
export const delete_folder = (folder_name, folder_directory) => ({
    type: "DELETE_FOLDER",
    folder: {
        folder_name,
        folder_directory
    }
})

// RENAME FOLDER 
export const rename_folder = (folder_name, prevName, folder_directory) => ({
    type: "RENAME_FOLDER",
    updates: {
        folder_name,
        prevName,
        folder_directory
    }
})