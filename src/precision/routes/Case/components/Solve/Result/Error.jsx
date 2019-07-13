// import * as React from 'react';
// import { Component } from 'react';
// // import * as Loader from 'react-loader';
// import ResultsConatiner from '../../../containers/solve/results'
//
// export class Error extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             processed: false,
//             processing: false,
//             error_text: ''
//         };
//     }
//     componentDidMount() {
//         const { error_text, download } = this.props;
//         this.setState({
//             processing: true
//         });
//         if (!download) {
//             this.setState({
//                 processing: false,
//                 processed: true,
//                 error_text
//             });
//             return;
//         }
//         const headers = new Headers();
//         headers.append('Accept', 'text/plain');
//         fetch(error_text, { method: 'GET', headers })
//             .then(response => response.text())
//             .then(error_text => this.setState({
//                 processing: false,
//                 processed: true,
//                 error_text
//             }));
//     }
//     render() {
//         const { error_text, processed, processing } = this.state;
//         // return (<Loader loaded={!processing && processed}>
//             <p style={{ color: 'red' }}>{error_text}</p>
//         // </Loader>);
//     }
// }
//
// export default ResultsConatiner(Error);