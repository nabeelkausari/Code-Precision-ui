import React, {Component, Fragment} from 'react';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins/image.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

// Include special components if required.
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import {Button} from "../Buttons/Button";
// import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
// import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
// import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
// import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';

class Editor extends Component {

    state = {
        readOnly: true,
        content:"hello"
    };

    handleModelChange = (model) =>{
        this.setState({content:model})
    };

    onEditClick = () => {
        this.setState((state, props) => ({readOnly: !state.readOnly}));
    }
    render() {
        return (
            <div>
                <div style={{display:"flex"}}>
                   {this.state.readOnly &&  <Button onClick={this.onEditClick} >Edit</Button> }
                   { !this.state.readOnly &&
                       <Fragment >
                           <Button onClick={this.onEditClick} >Hide</Button>
                           <Button buttonType="primary" onClick={() => console.log(this.state.content)}>Save</Button>
                       </Fragment>
                   }
                </div>
                { !this.state.readOnly ?
                    <FroalaEditor
                        tag='textarea'
                        model={this.state.content}
                        onModelChange={this.handleModelChange}
                        config={config}
                    />:
                    <FroalaEditorView
                        model={"hello"}
                    />
                }
            </div>
        );
    }
}

export default Editor;

let config = {
    // toolbarSticky: true,
    // toolbarStickyOffset: 60
    key: 'uB4D3B6B5nD5D4B3D3C3D7E5C2A4A4aQZMb1NJGG1HTMVANU==',
    events : {
        'froalaEditor.image.beforeUpload': function (e, editor, files) {
            if (files.length) {
                // Create a File Reader.
                var reader = new FileReader();

                // Set the reader to insert images when they are loaded.
                reader.onload = function (e) {
                    var result = e.target.result;
                    editor.image.insert(result, null, null, editor.image.get());
                };

                // Read image as base64.
                reader.readAsDataURL(files[0]);
            }

            editor.popups.hideAll();

            // Stop default upload chain.
            return false;
        }
    }
};