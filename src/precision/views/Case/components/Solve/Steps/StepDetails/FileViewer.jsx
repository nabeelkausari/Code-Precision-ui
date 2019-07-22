import * as React from "react";
import * as Loader from 'react-loader';
import { findDOMNode } from "react-dom";
import styled from "styled-components";
import {fetchLinkDirectly} from "../../../../../../api/helpers";
const CopyCode = styled.textarea `
   opacity : 0;
   height: 10px;
`;
const FunctionLanguage = styled.div `
  float:right;
  margin-right:40px;
`;
const FunctionLanguageLogo = styled.div `
  float:right;
`;
const Button = styled.button `
 position: absolute;
 right: 0;
 top :0px
 padding: 5px;
 `;
class FileViewer extends React.Component {
    constructor(props) {
        super(props);
        this.readTextFile = (file) => {
            fetchLinkDirectly(file)
                .then(response => response.text())
                .then(text => this.setState({ text: text }))
                .catch(reason => console.log(reason.message))
                .finally(() => {
                    this.setState({
                        loading: false
                    });
                });
        };
        this.copyToClipboard = () => {
            this.CopyCode.select();
            document.execCommand('copy');
        };
        this.state = {
            loading: true,
            text: "",
        };
    }
    componentDidMount() {
        const { file_link } = this.props;
        this.readTextFile(file_link);
    }
    render() {
        const { text, loading } = this.state;
        return (<div style={{ position: 'relative' }}>
            {loading ?
                <Loader loaded={false}/> :
                <pre>
              <FunctionLanguage>
                <b>Language: {this.props.function_language}</b>
              </FunctionLanguage>
              <code>{text}</code>
            </pre>}
            <CopyCode value={text} ref={(node) => this.CopyCode = findDOMNode(node)}/>
            <Button onClick={this.copyToClipboard}>Copy</Button>
        </div>);
    }
}
export default FileViewer;
