import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist';	//https://github.com/rt2zz/redux-persist
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { userReducer } from "./user/reducers";
import { activityReducer } from "./activity/reducers";
import { requestReducer } from "./request/reducers";
import axiosMiddleware from 'redux-axios-middleware';
import { commonAPI } from "../../service/common-api.service";
import { updateRequest } from "./request/actions";

//define persistConfig
const persistConfig = {
	key: 'root',
	storage,
}
//combine all reducer
const rootReducer = combineReducers({
	user: userReducer,
	activities: activityReducer,
	request: requestReducer
});
//define AppState
export type AppState = ReturnType<typeof rootReducer>;
//persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)
//add middleware redux-thunk => could view on chrome browser
const middlewares = [thunkMiddleware];
let numberOfRequest = 0;
const middlewareConfig = {
	interceptors: {
		request: [{
			success: function ({ getState, dispatch, getSourceAction } : any, req : any) {
				numberOfRequest++;
				console.log(numberOfRequest);
				dispatch(updateRequest(numberOfRequest));
				return req;
			},
			error: function ({ getState, dispatch, getSourceAction } : any, error : any) {
				console.log(error);
				return error;
			}
		}
		],
		response: [{
			success: function ({ getState, dispatch, getSourceAction } : any, req : any) {
				numberOfRequest--;
				console.log(numberOfRequest);
				dispatch(updateRequest(numberOfRequest));
				return req;
			},
			error: function ({ getState, dispatch, getSourceAction } : any, error : any) {
				numberOfRequest--;
				console.log(numberOfRequest);
				dispatch(updateRequest(numberOfRequest));
				return error;
			}
		}
		]
	}
};
const middleWareEnhancer = applyMiddleware(...middlewares
	, axiosMiddleware(commonAPI.api, middlewareConfig)
	);
export default () => {
	let store: any = createStore(
		persistedReducer
		, composeWithDevTools(middleWareEnhancer)
	)
	let persistor = persistStore(store)
	return { store, persistor }
}