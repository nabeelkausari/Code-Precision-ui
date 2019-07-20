import * as types from "./types";

const initialState = {
    user_step_details_loading: null,
    fetch_user_step_details_succeeded: null,
    user_step_details_info: [],
    show_user_step_details_flyout: null,
    current_tab_reference: null,
    user_code_loading: null,
    fetch_user_code_succeeded: null,
    by_uri: {}
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case types.FETCH_USER_STEP_DETAILS_REQUESTED:
            return {
                ...state,
                user_step_details_loading: true,
                fetch_user_step_details_error: null,
                fetch_user_step_details_succeeded: null
            };

        case types.FETCH_USER_STEP_DETAILS_SUCCEEDED:
            return {
                ...state,
                user_step_details_loading: false,
                fetch_user_step_details_succeeded: true,
                user_step_details_info: payload,
                show_user_step_details_flyout: true,
                current_tab_reference: payload[0]._links.self.href,
                current_category_tab: payload[0].category,
            };

        case types.FETCH_USER_STEP_DETAILS_FAILED:
            return {
                ...state,
                user_step_details_loading: false,
                fetch_user_step_details_succeeded: null,
                fetch_user_step_details_error: true,
                show_user_step_details_flyout: false
            };

        case types.FETCH_USER_CODE_REQUESTED:
            return {
                ...state,
                user_code_loading: true,
                fetch_user_code_error: null,
                fetch_user_code_succeeded: null
            };

        case types.FETCH_USER_CODE_SUCCEEDED:
            return {
                ...state,
                user_code_loading: false,
                fetch_user_code_succeeded: true,
                by_uri: {
                    ...state.by_uri,
                    [payload.current_tab_reference]: payload.steps
                }
            };

        case types.FETCH_USER_CODE_FAILED:
            return {
                ...state,
                user_code_loading: false,
                fetch_user_code_succeeded: null,
                fetch_user_code_error: true,
                show_user_code_flyout: false
            };

        case  types.SET_CURRENT_SHOW_CODE_TAB:
            return {
                ...state,
                current_tab_reference: payload
            };

        default:
            return state;
    }
}