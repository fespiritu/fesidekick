import React from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';

const MyGrid = (props) => {
    const {
        title, state, setStateCallback
    } = props;

    return(
        <React.Fragment>
            <MaterialTable
                title={title}
                columns={state.columns}
                data={state.data}
                editable={{
                  onRowAdd: newData =>
                    new Promise(resolve => {
                      setTimeout(() => {
                        resolve();
                        const data = [...state.data];
                        data.push(newData);
                        setStateCallback({ ...state, data });
                      }, 600);
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                      setTimeout(() => {
                        resolve();
                        const data = [...state.data];
                        data[data.indexOf(oldData)] = newData;
                        setStateCallback({ ...state, data });
                      }, 600);
                    }),
                  onRowDelete: oldData =>
                    new Promise(resolve => {
                      setTimeout(() => {
                        resolve();
                        const data = [...state.data];
                        data.splice(data.indexOf(oldData), 1);
                        setStateCallback({ ...state, data });
                      }, 600);
                    }),
                }}
                />
        </React.Fragment>
    )
}

MyGrid.propTypes = {
    title: PropTypes.string.isRequired,
    state: PropTypes.shape().isRequired,
    setStateCallback: PropTypes.func.isRequired
}
export default MyGrid;
