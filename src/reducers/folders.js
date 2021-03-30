// Folder Reducer
const folderDefaultState = [
    {folder_name: "music", folder_directory: "music"},
    {folder_name: "Passenger", folder_directory: "music"},
    {folder_name: "Micheal Jackson", folder_directory: "music"},
    {folder_name: "AirDrop", folder_directory: "AirDrop"},
    {folder_name: "Money Heist", folder_directory: "movies"},
    {folder_name: "downloads", folder_directory: "downloads"}
];

export const folderReducer = (state = folderDefaultState, action) => {
    switch(action.type) {
        case "CREATE_FOLDER":
            console.log("create")
            return [
                ...state,
                action.folder
            ];

        case "DELETE_FOLDER":
            const tempState = [];
            state.map((folder, key) => {
                if ((folder.folder_name === action.folder.folder_name) && (folder.folder_directory === action.folder.folder_directory)) {
                    console.log("in delete")
                    return true
                } else {
                    tempState.push(folder)
                }
                return true
            })

            return tempState;

        case "RENAME_FOLDER":
            const tempStateTwo = [];
            state.map((folder) => {
                if ((folder.folder_name === action.updates.folder_name) && (folder.folder_directory === action.updates.folder_directory)) {
                    console.log("in rename!")
                    tempStateTwo.push({
                        folder_name: action.updates.prevName,
                        folder_directory: action.updates.folder_directory
                    })
                } else {
                    tempStateTwo.push(folder)
                }
                return true
            })

            return tempStateTwo;

            // return state.map((folder) => {
            //     if ((folder.folder_name !== action.updates.folder_name) && (folder.folder_directory !== action.updates.folder_directory)) {
			// 		return {
			// 			...folder,
			// 			...action.updates
			// 		};
			// 	} else {
			// 		return folder;
			// 	}
			// });		        
        default:
            return state;     
    }
}
