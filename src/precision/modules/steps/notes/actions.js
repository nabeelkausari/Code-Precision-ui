import * as types from './types'
import {fetchLink, fetchLinkAs} from "../../../api/helpers";

export const closeNotesFlyout = () => ({ type: types.CLOSE_NOTES_FLYOUT });

export const getUserNotes = (step) => (dispatch, getState) => {
    dispatch({ type: types.FETCH_NOTES_REQUESTED });
    dispatch({ type: types.SAVE_CURRENT_STEP, payload: step});
    fetchLinkAs(step._links.get_step_note)
        .then(payload => {
            dispatch({ type: types.FETCH_NOTES_SUCCEEDED , payload });
        })
        .catch(payload => {
            dispatch({ type: types.FETCH_NOTES_FAILED , payload})
        });
};


export const handleSave = (payload) => (dispatch, getState) => {
    const { notes: {current_step}} = getState();
    fetchLink(current_step._links.save_step_note, payload)
        .then(() => {
            dispatch(getUserNotes(current_step));
        })
        .catch(reason => console.log(reason));
};