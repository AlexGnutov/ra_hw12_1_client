import {ofType} from "redux-observable";
import {CHANGE_SEARCH_FIELD, SEARCH_SKILLS_REQUEST, SEARCH_USER_CANCELLED} from "../actions/action-types";
import {catchError, debounceTime, filter, map, of, switchMap, takeUntil} from "rxjs";
import {searchSkillsFailure, searchSkillsRequest, searchSkillsSuccess} from "../actions";
import {ajax} from "rxjs/internal/ajax/ajax";

export const changeSearchEpic = action$ => action$.pipe(
    ofType(CHANGE_SEARCH_FIELD),
    map(o => o.payload.search.trim()),
    filter(o => o !== ''),
    debounceTime(100),
    map(o => searchSkillsRequest(o))
);

export const searchSkillsEpic = action$ => action$.pipe(
    ofType(SEARCH_SKILLS_REQUEST),
    map(o => o.payload.search),
    map(o => new URLSearchParams({q: o})),
    switchMap(o => ajax.getJSON(`${process.env.REACT_APP_SEARCH_URL}?${o}`).pipe(
        map(o => searchSkillsSuccess(o)),
        catchError(e => of(searchSkillsFailure(e.message))),
        takeUntil(action$.pipe(
            ofType(SEARCH_USER_CANCELLED),
        ))
    )),
);
