import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import { createLogger } from "redux-logger";


import { currentDirectory } from "../reducers/directory";
import { folderReducer } from "../reducers/folders"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger();

const middlewares = [logger]

const configureStore = () => {
	const store = createStore(
		combineReducers({
			currentDirectory,
			folderReducer
		}),
		composeEnhancers(applyMiddleware(...middlewares))
	);
	return store;
};

export default configureStore;