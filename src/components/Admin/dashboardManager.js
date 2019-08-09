import React, { Component } from "react";
import getApiTableList, { getTableData } from "components/services/dashboardService";
import MyGrid from 'components/common/MyGrid';

class DashboardManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Name', field: 'name' },
            ],
            data: [],
        };

        this.parseData = this.parseData.bind(this);
        this.parseTableData = this.parseTableData.bind(this);
    }

    componentDidMount() {
        // getApiTableList(this.parseData);
        const params = {
            tablenamewithschema: 'dbo.sections'
        };

        getTableData(params, this.parseTableData);
    }
    parseTableData(data) {
        console.log('parseTableData data: ', data);
    }
    parseData(data) {
        console.log('In parseData data: ', data);
        if (data && data.length > 0) {
            const theData = data.map(row => ({
            name: row.name
            }));
            console.log('In parseData theData: ', theData);
            this.setState({ data: theData }, 
                () => console.log('this.state:', this.state));
        } else {
            this.setState({ data: [] });
        }
    
    }
      
      
      
    render() {
        const { data } = this.state;
        const hasData = data && data.length > 0;
        console.log('render data: ', data);
        return (
            <div>
                <MyGrid
                    title={'Database Tables'}
                    state={this.state}
                    setStateCallback={this.setState}
                />
            </div>
        );
    }
}
 
export default DashboardManager;