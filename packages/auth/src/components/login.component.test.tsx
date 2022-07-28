import '@testing-library/jest-dom';
import { shallow, mount } from 'enzyme';
import { fireEvent, queryByAttribute, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import authStore from '../core/store/auth.store';
import LoginComponent from './login.component';
import { authenticateUser } from '../core/apis/authentication';
import { wrap } from 'module';

describe('Login Component', () => {
  test('should display a blank login form', async () => {
    const getById = queryByAttribute.bind(null, 'id');

    const dom = render(
      <Provider store={authStore}>
        <Router>
          <LoginComponent />
        </Router>
      </Provider>
    );

    const emailOrUserNameElement = getById(dom.container, 'email');
    const passwordElement = getById(dom.container, 'password');

    expect(emailOrUserNameElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
  });

//   test("should not display 'Please enter valid email or username' by default", async () => {
//     const getById = queryByAttribute.bind(null, 'id');

//     const dom = render(
//       <Provider store={authStore}>
//         <Router>
//           <LoginComponent />
//         </Router>
//       </Provider>
//     );

//     const enterValidEmailElement = getById(dom.container, 'email-helper-text');

//     expect(enterValidEmailElement).toBeNull();
//   });

//   test("should not display 'Please enter password' by default", async () => {
//     const getById = queryByAttribute.bind(null, 'id');

//     const dom = render(
//       <Provider store={authStore}>
//         <Router>
//           <LoginComponent />
//         </Router>
//       </Provider>
//     );

//     const enterValidPasswordElement = getById(
//       dom.container,
//       'password-helper-text'
//     );

//     expect(enterValidPasswordElement).toBeNull();
//     // expect(passwordElement).toBeInTheDocument();
//   });

//   test("should display 'Please enter valid email or username' when 'Sign In' button is clicked without entering email or username", async () => {
//     const getById = queryByAttribute.bind(null, 'id');
//     const dom = render(
//       <Provider store={authStore}>
//         <Router>
//           <LoginComponent />
//         </Router>
//       </Provider>
//     );
//     const signInButtonElement: any = getById(dom.container, 'signInButton');

//     userEvent.click(signInButtonElement);

//     const enterValidEmailElement = getById(dom.container, 'email-helper-text');
//     expect(enterValidEmailElement).not.toBeNull();
//   });

//   test("should display 'Please enter valid password' when 'Sign In' button is clicked without entering password", async () => {
//     const getById = queryByAttribute.bind(null, 'id');
//     const dom = render(
//       <Provider store={authStore}>
//         <Router>
//           <LoginComponent />
//         </Router>
//       </Provider>
//     );
//     const signInButtonElement: any = getById(dom.container, 'signInButton');

//     userEvent.click(signInButtonElement);

//     const enterValidPasswordElement = getById(
//       dom.container,
//       'password-helper-text'
//     );
//     expect(enterValidPasswordElement).not.toBeNull();
//   });

//   test('should display password when eye button is clicked', async () => {
//     const getById = queryByAttribute.bind(null, 'id');

//     const setStateMock = jest.fn();
//     const useStateMock: any = (useState: any) => [useState, setStateMock];
//     jest.spyOn(React, 'useState').mockImplementation(useStateMock);

//     const dom = render(
//       <Provider store={authStore}>
//         <Router>
//           <LoginComponent />
//         </Router>
//       </Provider>
//     );
//     const showPasswordEyeElement: any = getById(
//       dom.container,
//       'showPasswordEye'
//     );
//     // fireEvent.mouseDown(showPasswordEyeElement);
//     userEvent.click(showPasswordEyeElement);
//     expect(showPasswordEyeElement).toBeInTheDocument();
//     expect(setStateMock).toHaveBeenCalledWith(true);
//   });

//   test('should login when sign in button is clicked', async () => {
//     const setEnteredEmailStateMock = jest.fn();
//     const useEnteredEmailStateMock: any = (useState: any) => [
//       useState,
//       setEnteredEmailStateMock,
//     ];
//     jest.spyOn(React, 'useState').mockImplementation(useEnteredEmailStateMock);

//     const wrapper = mount(
//       <Provider store={authStore}>
//         <Router>
//           <LoginComponent />
//         </Router>
//       </Provider>
//     );

//     //   expect(signInButton.text()).toEqual('Sign in');

//     const signinbutton = wrapper.find('#signInButton').last();
//     console.log(signinbutton.debug());

//     signinbutton.simulate('click');

//     expect(signinbutton.text()).toEqual('Sign in');
//     expect(setEnteredEmailStateMock).toHaveBeenCalledWith(true);
//     //  expect(spy).toHaveBeenCalled();
//     // expect(setEnteredPasswordStateMock).toHaveBeenCalledWith(true);
//   });
});
