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

describe('ユーザー一覧', () => {
  test('fetches stories from an API and displays them', async () => {
    const stories = [
      { name: 'Hello' },
      { name: 'React' },
    ];

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: stories })
    );
    act(()=>{
      
      render(<Provider store={store}>
               <App><Index /></App>
             </Provider>, container);
             })
   
    expect(axios.get).toHaveBeenCalledTimes(0)
  });
});
