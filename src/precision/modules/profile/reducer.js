import * as types from './types';

const initialState = {
    info: {},
    fetch_profile_loading: null,
    fetch_profile_succeeded: null,
    fetch_profile_error: null,
};

export default (state = initialState, { type, payload } ) => {
    switch (type) {
        case types.FETCH_PROFILE_REQUESTED:
            return {
                ...state,
                fetch_profile_loading: true
            };
            case types.FETCH_PROFILE_SUCCEEDED:
            return {
                ...state,
                info: payload,
                fetch_profile_loading: false,
                fetch_profile_succeeded: true,
            };
            case types.FETCH_PROFILE_FAILED:
            return {
                ...state,
                fetch_profile_loading: false,
                fetch_profile_succeeded: false,
                fetch_profile_error: payload,
            };
        default:
            return state;
    }
}