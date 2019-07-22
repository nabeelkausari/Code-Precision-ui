import React, {Component} from 'react'
import {NotesContainer} from "../../../../containers/solve/view/Notes/notes";
import './Notes.scss'
import {Button} from "../../../../../../components/Buttons/Button";

class Notes extends Component {

    state = {
        sequence: 0,
        notes: '',
        editNotes: false,
        stepNoteLimit: 0
    };

    componentDidMount() {
        if(this.props.results !== undefined){
            this.props.getUserNotes(this.props.results)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.results && this.props.results.sequence_number !== prevProps.results.sequence_number){
            this.props.getUserNotes(this.props.results)
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

    handleUpdate = (sequence) => {
        const {notes} = this.state;
        const payload = {stepNotes: [{sequence: !this.props.secondary ? this.props.note1.noteDetails.sequence : this.props.note2.noteDetails.sequence, note: notes}]};
        if (notes === null && sequence === 0)
            return;
        this.props.handleSave(this.props.results, payload);
    };

    render() {
        const {closeNotesFlyout, fetch_notes_succeeded, secondary, note1, note2, is_secondary_step_set, is_primary_step_set} = this.props;
        const {sequence, notes} = this.state;
        const note_1 = !secondary && note1 !== undefined && note1.noteDetails.note;
        const note_2 =  secondary && note2 !== undefined && note2.noteDetails.note;
        return (
            <div>
                {note_1 !== null ?
                <i className='fa fa-edit' style={{height: '27px', marginBottom: '2px', cursor: 'pointer'}}
                   onClick={this.handleEditNotes}/>
                :
                note_2 !== null &&
                <i className='fa fa-edit' style={{height: '27px', marginBottom: '2px', cursor: 'pointer'}}
                   onClick={this.handleEditNotes}/>
                }

                {note_1 === null &&
                    <div className="notes-info">
                    <textarea rows="8" cols="50"
                              className="text-area"
                              style={{
                                  minHeight: '220px',
                                  maxHeight: '220px',
                                  minWidth: '500px',
                                  maxWidth: '500px',
                                  padding: '20px',
                                  fontSize: '16px'
                              }}
                              onChange={ev => this.handleChangeNote(ev.target.value)}>
                     {notes}
                     </textarea>
                    </div>
                }
                {note_2 === null &&
                    <div className="notes-info">
                        <textarea rows="8" cols="50"
                                  className="text-area"
                              style={{
                                  minHeight: '220px',
                                  maxHeight: '220px',
                                  minWidth: '500px',
                                  maxWidth: '500px',
                                  padding: '20px',
                                  fontSize: '16px'
                              }}
                              onChange={ev => this.handleChangeNote(ev.target.value)}>
                            {notes}
                        </textarea>
                    </div>
                }
                {!this.state.editNotes &&
                <div>
                    {note_1 &&
                    <div className="notes-info">
                        {note_1}
                    </div>}
                    {note_2 &&
                    <div className="notes-info">
                        {note_2}
                    </div>}
                 </div>
                }

                {!!this.state.editNotes && <div>
                    {note_1 &&
                    <div className="notes-info">
                    <textarea rows="8" cols="50"
                              className="text-area"
                              style={{
                                  minHeight: '220px',
                                  maxHeight: '220px',
                                  minWidth: '500px',
                                  maxWidth: '500px',
                                  padding: '20px',
                                  fontSize: '16px'
                              }}
                              onChange={ev => this.handleChangeNote(ev.target.value)}
                              value={notes === "" ? note_1 : notes}
                    >
                     {notes}
                     </textarea>
                        <div className="button-wrapper">
                            <Button primary disabled={this.state.notes === null || this.state.notes === ""}
                                    onClick={this.handleUpdate} style={{marginRight: '20px'}}>Save</Button>
                            <Button default onClick={closeNotesFlyout}>Cancel</Button>
                        </div>
                    </div>
                    }
                    {note_2 &&
                    <div className="notes-info">
                        <textarea rows="8" cols="50"
                                  className="text-area"
                                  style={{
                                      minHeight: '220px',
                                      maxHeight: '220px',
                                      minWidth: '500px',
                                      maxWidth: '500px',
                                      padding: '20px',
                                      fontSize: '16px'
                                  }}
                                  onChange={ev => this.handleChangeNote(ev.target.value)}
                                  value={notes === "" ? note_1 : notes}
                        >
                            {notes}
                        </textarea>
                        <div className="button-wrapper">
                            <Button primary disabled={this.state.notes === null || this.state.notes === ""}
                                    onClick={this.handleUpdate} style={{marginRight: '20px'}}>Save</Button>
                            <Button default onClick={closeNotesFlyout}>Cancel</Button>
                        </div>
                    </div>
                    }
                </div>
                }

            </div>

        )
    }
}

export default NotesContainer(Notes)
