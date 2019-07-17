import * as types from './types';

const initialState = {
};

export default (state = initialState, { type, payload } ) => {
    switch (type) {
        case types.FETCH_CONSOLE_REQUESTED:
            return {
                ...state,
                console_loading: true,
                fetch_console_error: null,
                fetch_console_succeeded: null
            };

        case types.FETCH_CONSOLE_SUCCEEDED:
            return {
                ...state,
                console_loading: false,
                fetch_console_succeeded: true,
                console_url: payload
            };

        case types.FETCH_CONSOLE_FAILED:
            return {
                ...state,
                console_loading: false,
                fetch_console_succeeded: false,
                fetch_console_error: payload
            };

        default:
            return state;
    }
}