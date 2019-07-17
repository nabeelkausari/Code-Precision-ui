import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import {fetchLinkDirectly, fetchLinkDirectlyAs} from "../../api/helpers";

charts(FusionCharts);
ReactFC.fcRoot(FusionCharts, FusionTheme);


class Chart extends React.Component {
    state ={
        dataSource:{}
    }

    componentDidMount() {
        this.fetchChartData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.link !== prevProps.link){
            this.fetchChartData();
        }
    }

    fetchChartData = () => {
        // if (!this.props.link) return;
        fetchLinkDirectlyAs(this.props.link)
            .then(chart => {
                this.setState({
                    dataSource: chart
                });
            })
            .catch(reason => {
                console.log(reason)
            });
    };

    render() {
        const {dataSource} = this.state;
        return (
            <div>
                <ReactFC {...dataSource} />
            </div>

        );
    }
}

export default Chart;