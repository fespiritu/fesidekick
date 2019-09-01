import React from 'react';

const MyGridHoc = (props) => {
    const {
        component: Component,
        ...rest
    } = props;
    // const {
    //     myColumns
    // } = rest;

    // const columns = myColumns ? myColumns.map(item => ({
    //     title: item.title,
    //     field: item.field,
    //     type: item.type,
    //     lookup: item.lookup
    // })) : rest.state.columns;
    // const state = {
    //     columns
    // }
    return(
        // <Component {...rest} state={state} />
        <Component {...rest} />
    )
};

export default MyGridHoc;
