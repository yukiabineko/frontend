
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from '../App';
import Login from '../Login';
import New from '../users/New';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import store from '../store/Store';


Enzyme.configure({adapter: new Adapter()});

let container = null;
beforeEach(() => {

  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
describe('ログイン表示', ()=>{
  it("ログインページ表示される", () => {
    act(() => {
      render(<Provider store={store}><App><Login/></App></Provider>, container);
    });
    let userTitle = container.querySelector("[data-testid='logintitle']")
    expect(userTitle.textContent).toBe("ログイン");
  });
});
describe('新規ユーザー登録表示', ()=>{
  it("新規ページ表示", () => {
      let component = shallow(<New.WrappedComponent />);
      expect(component.find("[data-testid='userNewtitle']").text()).toBe('新規会員登録');
  });
});
describe('ログインフォーム', ()=>{
  it('ログイン失敗', () => {
    let component = shallow(<Login.WrappedComponent />);
    expect(component.find("[data-testid='logintitle']").text()).toBe('ログイン');
    component.find("[data-testid='ml']").simulate('change',{target:{email: 'taro@example.com'}});
    component.find("[data-testid='ps']").simulate('change',{target:{password: ''}});
    component.find("[data-testid='loginForm']").simulate('submit', { preventDefault () {} });
    window.alert = jest.fn();
    expect(window.alert.mock.calls.length).toBe(0);
  });
});

