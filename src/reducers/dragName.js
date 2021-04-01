// Directory Reducer
const dragNameDefaultState = "music"

export const dragName = (state = dragNameDefaultState, action) => {
    switch (action.type) {
        case "SET_DRAG_NAME":
            return action.dragName;
        
        default: 
            return state;
    }
};