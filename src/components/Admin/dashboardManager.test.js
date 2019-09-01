
import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import DashboardManager from './dashboardManager';
import { exportAllDeclaration } from '@babel/types';

const _url = 'http://localhost:8080/api/accessmodel/tablelist';

let wrapped;

beforeEach(() => {
  moxios.install();
  moxios.stubRequest(_url, {
    status: 200,
    response: [{"name":"accessModel","object_id":206623779},{"name":"sections","object_id":254623950},{"name":"controls","object_id":350624292},{"name":"visibilityModel","object_id":1122103038},{"name":"user","object_id":1618104805}]
  });

  wrapped = mount(
    <DashboardManager />
  );
});

afterEach(() => {
  moxios.uninstall();
  wrapped.unmount();
});

it('can fetch a list of comments and display them', done => {
  // const wrapped = mount(
  //   <DashboardManager />
  // );

  // wrapped.find('.fetch-comments').simulate('click');

  moxios.wait(() => {
    wrapped.update();
    const ctrl = wrapped.find('#myGrid');
    // console.log('ctrl: ', ctrl.html());
    // expect(wrapped.find('li').length).toEqual(2);
    const findText = '>accessModel</td>';
    expect(ctrl.html().indexOf(findText) >= 0).toBe(true);
    done();
    setTimeout(() => { console.log((''))}, 1000);
    // wrapped.unmount();
  });
});
