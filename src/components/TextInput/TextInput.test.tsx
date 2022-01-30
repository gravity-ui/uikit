import React from 'react';
import {shallow} from 'enzyme';

import {TextInputEvent} from './types';
import {TextInput} from './TextInput';
import {TextAreaControl} from './TextAreaControl/TextAreaControl';
import {InputControl} from './InputControl/InputControl';

describe('TextInput', () => {
    it('should render text area component when component receives multiline props', () => {
        const wrapper = shallow(<TextInput multiline />);

        expect(wrapper.find(TextAreaControl).exists()).toBeTruthy();
    });

    it("shouldn render text input component when component doesn't receive multiline props", () => {
        const wrapper = shallow(<TextInput />);

        expect(wrapper.find(InputControl).exists()).toBeTruthy();
    });

    it('should render error message in input when component receives error props', () => {
        const wrapper = shallow(<TextInput error="FAKE_ERROR" />);

        expect(wrapper.find('[data-qa="yc-text-input__error"]').exists()).toBeTruthy();
    });

    it("shouldn't render error message in input when component doesn't receive error props", () => {
        const wrapper = shallow(<TextInput />);

        expect(wrapper.find('[data-qa="yc-text-input__error"]').exists()).toBeFalsy();
    });

    it('should render clear button when component receives hasClear props', () => {
        const wrapper = shallow(<TextInput hasClear />);

        expect(wrapper.find('[data-qa="yc-text-input__clear"]').exists()).toBeTruthy();
    });

    it("shouldn't render clear button when component doesn't receive hasClear props", () => {
        const wrapper = shallow(<TextInput />);

        expect(wrapper.find('[data-qa="yc-text-input__clear"]').exists()).toBeFalsy();
    });

    it('should call onChange with event function when input changes value', () => {
        const FAKE_ON_CHANGE_FN = jest.fn();
        const FAKE_EVENT = {target: {}} as TextInputEvent;

        const wrapper = shallow(<TextInput onChange={FAKE_ON_CHANGE_FN} />);
        wrapper.find(InputControl).props().onChange?.(FAKE_EVENT);

        expect(FAKE_ON_CHANGE_FN).toBeCalledWith({...FAKE_EVENT});
    });

    it('should call onUpdate with "FAKE_VALUE" function when input changes value', () => {
        const FAKE_VALUE = 'FAKE_VALUE';
        const FAKE_ON_UPDATE_FN = jest.fn();
        const FAKE_EVENT = {target: {value: FAKE_VALUE}} as TextInputEvent;

        const wrapper = shallow(<TextInput onUpdate={FAKE_ON_UPDATE_FN} />);
        wrapper.find(InputControl).props().onChange?.(FAKE_EVENT);

        expect(FAKE_ON_UPDATE_FN).toBeCalledWith(FAKE_VALUE);
    });

    it('should call onChange function when it clickes to clean button and component receives hasClear', () => {
        const FAKE_ON_CHANGE_FN = jest.fn();
        const FAKE_EVENT = {target: {}} as TextInputEvent;
        const FAKE_CONTROL_REF = {
            current: {focus: jest.fn(), value: ''} as any as HTMLInputElement,
        };

        const wrapper = shallow(
            <TextInput controlRef={FAKE_CONTROL_REF} hasClear onChange={FAKE_ON_CHANGE_FN} />,
        );
        (wrapper.find(InputControl).props().controlRef as Function)(FAKE_CONTROL_REF.current);
        wrapper.find('[data-qa="yc-text-input__clear"]').simulate('click', FAKE_EVENT);

        expect(FAKE_ON_CHANGE_FN).toBeCalled();
    });

    it('should call onUpdate with "FAKE_VALUE" function when it clickes to clean button and component receives hasClear', () => {
        const FAKE_ON_UPDATE_FN = jest.fn();
        const FAKE_EVENT = {target: {}} as TextInputEvent;
        const FAKE_CONTROL_REF = {
            current: {focus: jest.fn(), value: ''} as any as HTMLInputElement,
        };

        const wrapper = shallow(
            <TextInput controlRef={FAKE_CONTROL_REF} hasClear onUpdate={FAKE_ON_UPDATE_FN} />,
        );
        (wrapper.find(InputControl).props().controlRef as Function)(FAKE_CONTROL_REF.current);
        wrapper.find('[data-qa="yc-text-input__clear"]').simulate('click', FAKE_EVENT);

        expect(FAKE_ON_UPDATE_FN).toBeCalledWith('');
    });

    it('should pass autoComplete = on to InputControl component when component recieves autoComplete props = true', () => {
        const wrapper = shallow(<TextInput autoComplete />);

        expect(wrapper.find(InputControl).props().autoComplete).toBe('on');
    });

    it('should pass autoComplete = off to InputControl component when component recieves autoComplete props = false', () => {
        const wrapper = shallow(<TextInput autoComplete={false} />);

        expect(wrapper.find(InputControl).props().autoComplete).toBe('off');
    });
});
