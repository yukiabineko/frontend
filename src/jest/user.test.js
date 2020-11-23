import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from '../App';
import New from '../users/New';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

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
describe('Top表示', ()=>{
  it("topページ表示される", () => {
    act(() => {
      render(<App />, container);
    });
    let userTitle = container.querySelector("[data-testid='usertitle']")
    expect(userTitle.textContent).toBe("会員一覧");
  });
});
describe('新規ユーザー登録表示', ()=>{
  it("新規ページ表示", () => {
   
  });
});

