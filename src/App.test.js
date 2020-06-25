import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() })

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

const findByTestAttribute = (wrapper, value) => {
  return wrapper.find(`[data-test="${value}"]`);
}

test('Render root element', () => {
  const wrapper = setup();
  const rootElement = findByTestAttribute(wrapper, "component-root");
  expect(rootElement.length).toBe(1);
});

test('Render counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttribute(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test('Render counter increment button', () => {
  const wrapper = setup();
  const incrementButton = findByTestAttribute(wrapper, "increment-button");
  expect(incrementButton.length).toBe(1);
});

test('Render counter decrement button', () => {
  const wrapper = setup();
  const decrementButton = findByTestAttribute(wrapper, "decrement-button");
  expect(decrementButton.length).toBe(1);
});

test('Counter start at 0', () => {
  const wrapper = setup();
  const initialState = wrapper.state("counter");
  expect(initialState).toBe(0);
});

test('Clicking increment button increases the counter', () => {
  const wrapper = setup({}, { counter: 3 });

  const incrementButton = findByTestAttribute(wrapper, "increment-button");
  incrementButton.simulate("click");

  const counterDisplay = findByTestAttribute(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(4);
});

test('Clicking decrement button decreases the counter', () => {
  const wrapper = setup({}, { counter: 5 });

  const decrementButton = findByTestAttribute(wrapper, "decrement-button");
  decrementButton.simulate("click");

  const counterDisplay = findByTestAttribute(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(4);
});

test('Clicking decrement button at 0 doesn\'t decrease the counter', () => {
  const wrapper = setup({}, { counter: 0 });

  const decrementButton = findByTestAttribute(wrapper, "decrement-button");
  decrementButton.simulate("click");

  const counterDisplay = findByTestAttribute(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(0);
});

test('Error text present', () => {
  const wrapper = setup();
  const renderError = findByTestAttribute(wrapper, "error-display");
  expect(renderError.length).toBe(1);
});

test('Not showing error by default', () => {
  const wrapper = setup();
  const error = findByTestAttribute(wrapper, "error-display");

  const errorHasHiddenClass = error.hasClass('hidden');
  expect(errorHasHiddenClass).toBe(true);
});

describe("Decrement error functionality",() => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();

    const decrementButton = findByTestAttribute(wrapper, "decrement-button");
    decrementButton.simulate("click");
  })

  test('Display error if counter is below 0', () => {
    const error = findByTestAttribute(wrapper, "error-display");
  
    const errorHasHiddenClass = error.hasClass('hidden');
    expect(errorHasHiddenClass).toBe(false);
  });

  test('Remove error if counter is incremented from 0', () => {
    const incrementButton = findByTestAttribute(wrapper, "increment-button");
    incrementButton.simulate("click");

    const error = findByTestAttribute(wrapper, "error-display");
  
    const errorHasHiddenClass = error.hasClass('hidden');
    expect(errorHasHiddenClass).toBe(true);
  });
});