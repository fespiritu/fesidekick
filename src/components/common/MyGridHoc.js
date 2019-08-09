import React from 'react';

const MyGridHoc = (props) => {
    const {
        component: Component,
        ...rest
    } = props;
    const {
        myColumns
    } = rest;

    const columns = myColumns.map(item => ({
        title: item.title,
        field: item.field,
        type: item.type,
        lookup: item.lookup
    }));
    const state = {
        columns
    }
    return(
        <Component {...rest} state={state} />
    )
};

export default MyGridHoc;
