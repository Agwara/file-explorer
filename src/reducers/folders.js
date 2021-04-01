// Folder Reducer
const folderDefaultState = [
    {folder_name: "music", folder_directory: "music", posX: 0, posY: 0},
    {folder_name: "Passenger", folder_directory: "music", posX: 1, posY: 0},
    {folder_name: "Micheal Jackson", folder_directory: "music", posX: 2, posY: 0},
    {folder_name: "Micheal", folder_directory: "music", posX: 3, posY: 0},
    {folder_name: "Jackson", folder_directory: "music", posX: 4, posY: 0},
    {folder_name: "Scofiled", folder_directory: "music", posX: 0, posY: 1},
    {folder_name: "Jim", folder_directory: "music", posX: 1, posY: 1},
    {folder_name: "AirDrop", folder_directory: "AirDrop", posX: 0, posY: 0},
    {folder_name: "Money Heist", folder_directory: "movies", posX: 0, posY: 0},
    {folder_name: "downloads", folder_directory: "downloads", posX: 0, posY: 0}
];

export const folderReducer = (state = folderDefaultState, action) => {
    switch(action.type) {
        case "CREATE_FOLDER":
            return [
                ...state,
                action.folder
            ];

        case "DELETE_FOLDER":
            const tempState = [];
            state.map((folder, key) => {
                if ((folder.folder_name === action.folder.folder_name) && (folder.folder_directory === action.folder.folder_directory)) {
                    return true
                } else {
                    tempState.push(folder)
                }
                return true
            })

            console.log(tempState)

            return tempState;

        case "RENAME_FOLDER":
            const tempStateTwo = [];
            state.map((folder) => {
                if ((folder.folder_name === action.updates.folder_name) && (folder.folder_directory === action.updates.folder_directory)) {
                    tempStateTwo.push({
                        folder_name: action.updates.prevName,
                        folder_directory: action.updates.folder_directory,
                        posX: action.updates.posX,
                        posY: action.updates.posY

                    })
                } else {
                    tempStateTwo.push(folder)
                }
                return true
            })

            return tempStateTwo;		        
        default:
            return state;     
    }
}
