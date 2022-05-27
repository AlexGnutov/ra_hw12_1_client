import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import searchReducer from "../reducers/search-reducer";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import {changeSearchEpic, searchSkillsEpic} from "../epics";

const reducer = combineReducers({
   skills: searchReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epic = combineEpics(
    changeSearchEpic,
    searchSkillsEpic,
);
const epicMiddleware = createEpicMiddleware();
const store = createStore(reducer, composeEnhancers(
   applyMiddleware(epicMiddleware)
));

epicMiddleware.run(epic);
export default store;
