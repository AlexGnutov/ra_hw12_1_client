import {
    CHANGE_SEARCH_FIELD,
    SEARCH_SKILLS_FAILURE,
    SEARCH_SKILLS_REQUEST,
    SEARCH_SKILLS_SUCCESS, SEARCH_USER_CANCELLED
} from "../actions/action-types";

const initialState = {
    items: [],
    loading: false,
    error: null,
    search: '',
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_SKILLS_REQUEST:
            return { ...state, items: [], loading: true, error: null, };
        case SEARCH_SKILLS_FAILURE:
            const {error} = action.payload;
            return { ...state, items: [], loading: false, error, };
        case SEARCH_SKILLS_SUCCESS:
            const {items} = action.payload;
            return { ...state, items, loading: false, error: null, };
        case CHANGE_SEARCH_FIELD:
            const {search} = action.payload;
            return { ...state, search };
        case SEARCH_USER_CANCELLED:
            return { ...initialState };
        default:
            return state;
    }
}
