import * as types from "./types";

const initialState = {
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case types.SAVE_CURRENT_STEP:
            return {
                current_step: payload
            };

        case types.FETCH_NOTES_REQUESTED:
            return {
                ...state,
                notes_loading: true,
                fetch_notes_error: null,
                fetch_notes_succeeded: null
            };

        case types.FETCH_NOTES_SUCCEEDED:
            return {
                ...state,
                notes_loading: false,
                fetch_notes_succeeded: true,
                notes_info: payload,
                show_notes_flyout: true
            };

        case types.FETCH_NOTES_FAILED:
            return {
                ...state,
                notes_loading: false,
                fetch_notes_succeeded: null,
                fetch_notes_error: true,
                show_notes_flyout: false
            };

        case types.CLOSE_NOTES_FLYOUT:
            return {
                ...state,
                show_notes_flyout: false
            };

        default:
            return state;
    }
}