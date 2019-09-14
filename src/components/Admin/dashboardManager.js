import React, { Component } from "react";
import getApiTableList from "components/services/dashboardService";
import MyGrid from 'components/common/MyGrid';
import MyGridHoc from './../common/MyGridHoc';
// import oandaInstrumentDD from 'person-widget';
import OandaInstrumentDD from 'react-fx-instrument-dd';

class DashboardManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Name', field: 'name' },
            ],
            data: [],
        };
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.parseData = this.parseData.bind(this);
        this.parseTableData = this.parseTableData.bind(this);
    }

    componentDidMount() {
        getApiTableList(this.parseData);
        // const params = {
        //     tablenamewithschema: 'dbo.sections'
        // };

       //  getTableData(params, this.parseTableData);
    }
    parseTableData(data) {
        console.log('parseTableData data: ');
    }
    parseData(data) {
       
        if (data && data.length > 0) {
            const theData = data.map(row => ({
            name: row.name
            }));
            // console.log('In parseData theData: ', theData);
            this.setState({ data: theData }, 
                () => console.log('this.state:'));
        } else {
            this.setState({ data: [] });
        }
    
    }
      
    onChangeEvent = () => {
        alert('onChangeEvent');
    }
      
    render() {
        // const { data } = this.state;
        // const hasData = data && data.length > 0;
        //console.log('render data: ', data);
       const instrument = 'NZD_USD';

        return (
            <div id="myGrid">
                {/* <ExampleComponent text='Hello Ferdinand'/> */}
                <OandaInstrumentDD onChangeEvent={this.onChangeEvent} instrument={instrument} />
                <MyGridHoc
                    component={MyGrid}
                    title={'Database Tables'}
                    state={this.state}
                    setStateCallback={this.setState}
                />
            </div>
        );
    }
}
 
export default DashboardManager;