import React, {Component} from 'react'
import {NotesContainer} from "../../../../containers/solve/view/Notes/notes";
import './Notes.scss'
import FormControl from "react-bootstrap/es/FormControl";
import {Button} from "../../../../../../components/Buttons/Button";
import Flyout from "../../../../../../components/Flyout/Flyout";

class Notes extends Component {

    state = {
        sequence: 0,
        notes: '',
        editNotes: false,
        stepNoteLimit: 0
    };

    componentDidMount() {
        this.setState({
            sequence: this.props.notes_details.sequence,
            notes: this.props.notes_details.note,
            stepNoteLimit: this.props.notes_details.stepNoteLimit
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.fetch_notes_succeeded && prevProps.fetch_notes_succeeded !== this.props.fetch_notes_succeeded) {
            this.setState({
                sequence: this.props.notes_details.sequence,
                notes: this.props.notes_details.note,
                stepNoteLimit: this.props.notes_details.stepNoteLimit
            });
        }
    }


    handleChangeNote = (newValue) => {
        this.setState({
            notes: newValue
        });
    };

    handleEditNotes = () => {
        this.setState({
            editNotes: true
        });
    };

    handleExitEditNotes = () => {
        this.setState({
            editNotes: false
        });
    };

    handleUpdate = () => {
        const { sequence, notes } = this.state;
        const payload = { stepNotes: [{ sequence: sequence, note: notes }] };
        if (notes === null && sequence === 0)
            return;
        this.props.handleSave(payload);
    };

    render() {
        const {notes_details, closeNotesFlyout} = this.props;
        const {sequence, notes} = this.state;
        return (
            <Flyout  require_full_screen ={true} sequence_no = {sequence} title={"Notes"} hideFlyout = {closeNotesFlyout}>
                <div className="tool">
                    {notes_details.note !== null &&
                    <i className='fa fa-edit' style={{ height: '27px', marginBottom: '2px', cursor: 'pointer' }} onClick={this.handleEditNotes}/>
                    }
                </div>
                {
                    notes === null ?
                        <div className="notes-info">

                    <textarea rows="8" cols="50" className="text-area" onChange={ev => this.handleChangeNote(ev.target.value)}>
                        {notes}
                    </textarea>

                        </div> :
                        !this.state.editNotes
                            ? <div className="notes-info">
                                {notes}
                            </div>
                            : <div className="notes-info">
                            <textarea rows="8" cols="50" className="text-area" onChange={ev => this.handleChangeNote(ev.target.value)}>
                                {notes}
                            </textarea>

                            </div>
                }
                {(!!this.state.editNotes || notes_details.note === null) &&
                <div className="button-wrapper">
                    <Button primary disabled={this.state.notes === null || this.state.notes === ""} onClick={this.handleUpdate} style={{ marginRight: '20px' }}>Save</Button>
                    <Button default onClick={closeNotesFlyout}>Cancel</Button>
                </div>}
            </Flyout>

        )
    }
}

export default NotesContainer(Notes)