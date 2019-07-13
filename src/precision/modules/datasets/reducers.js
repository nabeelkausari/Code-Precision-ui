import * as types from "./types";
import {byUri} from "../../utils/byUri";
import {groupBy, map} from "ramda";

const initialState = {
    dataset_loading: null,
    fetch_dataset_succeeded: null,
    list:{
        items:[],
        by_uri:{}
    },
    selected_table_reference:""

};

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case types.FETCH_DATASET_REQUESTED:
            return { ...state, dataset_loading: true, fetch_dataset_error: null, fetch_dataset_succeeded: null };
        case types.FETCH_DATASET_SUCCEEDED:
            return {
                ...state,
                dataset_loading: false,
                fetch_dataset_succeeded: true,
                list: {
                    items: payload,
                    by_uri: map((payload) => payload.shift(), groupBy(item => item.ref, payload))

    },

            };

        case types.FETCH_DATASET_FAILED:
            return { ...state, dataset_loading: false, fetch_dataset_succeeded: false, fetch_dataset_error: payload };


        case types.SELECT_TABLE:
            return {
                ...state,
                selected_table_reference: payload,
            };

        case types.SELECT_COLUMN:
            return {
                ...state,
                [payload.dataset_reference]: (state[payload.dataset_reference] || []).filter(h => payload.header.key !== h.key).concat(payload.header)
            };



        default:
            return state;
    }
}