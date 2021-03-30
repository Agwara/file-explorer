// Directory Reducer
const currentDirectorDefaultState = "music"

export const currentDirectory = (state = currentDirectorDefaultState, action) => {
    switch (action.type) {
        case "SET_DIRECTORY":
            return action.directory_name;
        
        default: 
            return state;
    }
};