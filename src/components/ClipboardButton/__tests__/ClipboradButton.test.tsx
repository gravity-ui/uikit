import {mount} from 'enzyme';
import React from 'react';
import {ClipboardButton} from '../ClipboardButton';

[
    {name: 'click', data: {}},
    // Seems like this events is not properly handled by enzyme, while is actually works in browser
    // {name: 'keydown', data: {key: ' '}},
    // {name: 'keydown', data: {key: 'Enter'}},
].forEach(({name, data = {}}) => {
    const event = name;
    // if (data.key) {
    //     event = `${event} (key: "${data.key}")`;
    // }

    it(`should copy text on ${event}`, function () {
        const documentExecCommand = document.execCommand;
        document.execCommand = jest.fn().mockReturnValue(true);
        const onCopy = jest.fn();
        const wrapper = mount(<ClipboardButton text="Text to copy" onCopy={onCopy} />);

        wrapper.find('button').simulate(name, data);

        expect(onCopy).toHaveBeenCalledWith('Text to copy', true);

        document.execCommand = documentExecCommand;
    });
});
