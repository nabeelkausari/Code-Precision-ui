import * as types from './types'
import {fetchLink, fetchLinkAs} from "../../../api/helpers";

export const closeNotesFlyout = () => ({ type: types.CLOSE_NOTES_FLYOUT });

export const getUserNotes = (step) => (dispatch, getState) => {
    dispatch({ type: types.FETCH_NOTES_REQUESTED });
    dispatch({ type: types.SAVE_CURRENT_STEP, payload: step});
    fetchLinkAs(step._links.get_step_note)
        .then(payload => {
            dispatch(setCurrentNotes(payload));
        })
        .catch(payload => {
            dispatch({ type: types.FETCH_NOTES_FAILED , payload})
        });
};

export const setCurrentNotes = (payload) => (dispatch, getState) => {
    const {notes : {notes_output : { is_primary_step_set, is_primary_flyout_open, note1 }} } = getState();
    if(is_primary_flyout_open && note1 && note1.noteDetails.sequence !== payload.noteDetails.sequence)
    {
        if(is_primary_step_set)
        {
            dispatch({type : types.SET_PREVIOUS_NOTES});
            dispatch({type : types.OPEN_FLYOUT_SECONDARY})
        }
        dispatch({type : types.SET_CURRENT_NOTES, payload});
        dispatch({type : types.OPEN_FLYOUT_PRIMARY})
    }
    else if(note1 === undefined || !is_primary_flyout_open){
        dispatch({type : types.SET_CURRENT_NOTES, payload});
        dispatch({type : types.OPEN_FLYOUT_PRIMARY})
    }
};


export const handleSave = (current_step, payload) => (dispatch, getState) => {
    fetchLink(current_step._links.save_step_note, payload)
        .then(() => {
            dispatch(getUserNotes(current_step));
        })
        .catch(reason => console.log(reason));
};

export const resetNotesFlyout = () => (dispatch, getState) => {
    const {notes : {show_notes_flyout}} = getState()
    if(show_notes_flyout){
        dispatch({type : types.CLOSE_NOTES_FLYOUT})
    }
}