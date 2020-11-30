import React, { useState} from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Index from '../users/Index';
import ItemIndex from '../items/Index';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import store from '../store/Store';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

jest.mock('axios');

describe('商品ー一覧', () => {
    
  test('商品一覧アクセス成功', async () => {
    const fishs = [
      { name: 'アジ' },
      { name: 'いわし' },
    ];

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: fishs })
    );
    act(()=>{
      
      render(<Provider store={store}>
               <App><ItemIndex /></App>
             </Provider>, container);
             })
   
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(container.textContent).toBe('');
  });
});


