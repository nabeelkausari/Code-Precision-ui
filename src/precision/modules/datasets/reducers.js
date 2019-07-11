import * as types from "./types";

const initialState = {
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case types.SELECT_TABLE:
            return {
                ...state,
                selected_table_reference: payload,
            };

        default:
            return state;
    }
}