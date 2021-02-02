import React, { useState} from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import App from '../App';
import PcIndex from '../items/PcIndex'
import ItemIndex from '../items/Index';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import store from '../store/Store';
import MediaQuery from "react-responsive";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({adapter: new Adapter()});

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
               <App><ItemIndex><MediaQuery minDeviceWidth={767}><PcIndex/></MediaQuery></ItemIndex></App>
             </Provider>, container);
             })
   
    expect(axios.get).toHaveBeenCalledTimes(0);
    expect(container.textContent).toBe('');
  });
});
/*test('test component', ()=>{
  let itemcomp = shallow(<PcIndex.WrappedComponent />);
  expect(itemcomp.find('[data-testid="itemstitle"]').text()).toEqual('商品一覧');
})
*/

