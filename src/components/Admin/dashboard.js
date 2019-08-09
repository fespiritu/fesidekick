import React from 'react';
import MyGrid from 'components/common/MyGrid';

function AdminDashboard(data) {
  
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
    ],
    data: [],
  });
  // componentDidMount() {
  //   this.getTableList();
  // }
  setState(data);
console.log('state: ', state);
  return (
    <div>
      <MyGrid
        title={'FE Sidekick'}
        state={state}
        setStateCallback={setState}
      />
    </div>
  );

}

export default AdminDashboard;
