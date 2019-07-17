import * as types from './types';
import {fetchLink} from "../../api/helpers";


export const fetchConsole = () => (dispatch, getState) => {
    dispatch({ type: types.FETCH_CONSOLE_REQUESTED });
    const { cases: { info }} = getState();
    fetchLink({
        href: info._links.console.href,
        method: info._links.console.method,
        type: info._links.console.type
    })
        .then((res) => {
            res.json()
                .then(data => {
                    if (!!data.path && !!data.path) {
                        dispatch({ type: types.FETCH_CONSOLE_SUCCEEDED, payload: data.path})
                    }
                    else {
                        console.log("Error")
                    }
                });
        })
        .catch(payload => dispatch({ type: types.FETCH_CONSOLE_SUCCEEDED, payload }));
};