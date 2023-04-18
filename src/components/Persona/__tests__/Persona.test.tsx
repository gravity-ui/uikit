import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {Persona} from '../Persona';

test('should allow to override button', async () => {
    const onClick = jest.fn();
    render(
        <Persona
            text={'Test'}
            renderButton={() => (
                <Persona.Button
                    onClick={() => onClick('Test Data')}
                    extraProps={{'aria-label': 'Test Button'}}
                />
            )}
        />,
    );

    await userEvent.click(screen.getByRole('button', {name: 'Test Button'}));

    expect(onClick).toHaveBeenCalledWith('Test Data');
});

test('should ignore `onClose` if `renderButton` exist', async () => {
    const onClick = jest.fn();
    const onCustomClick = jest.fn();
    render(
        <Persona
            text={'Test'}
            onClick={onClick}
            renderButton={() => (
                <Persona.Button
                    onClick={() => onCustomClick('Test Data')}
                    extraProps={{'aria-label': 'Test Button'}}
                />
            )}
        />,
    );

    await userEvent.click(screen.getByRole('button', {name: 'Test Button'}));

    expect(onCustomClick).toHaveBeenCalledWith('Test Data');
    expect(onClick).not.toHaveBeenCalled();
});
