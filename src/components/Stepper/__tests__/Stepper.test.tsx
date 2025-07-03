// import {CircleCheck} from '@gravity-ui/icons';

import * as React from 'react';

import {Cloud} from '@gravity-ui/icons';

import {fireEvent, render, screen} from '../../../../test-utils/utils';
import {Stepper} from '../Stepper';
import type {StepperProps} from '../Stepper';

describe('Stepper', () => {
    it('renders all steps correctly', () => {
        render(
            <Stepper>
                <Stepper.Item id="1">Step 1</Stepper.Item>
                <Stepper.Item id="2">Step 2</Stepper.Item>
                <Stepper.Item id="3">Step 3</Stepper.Item>
            </Stepper>,
        );

        expect(screen.getByText('Step 1')).toBeInTheDocument();
        expect(screen.getByText('Step 2')).toBeInTheDocument();
        expect(screen.getByText('Step 3')).toBeInTheDocument();
    });

    it('handles step selection correctly', () => {
        const InteractiveStepper = () => {
            const [value, setValue] = React.useState<string | number | undefined>();
            return (
                <Stepper value={value} onUpdate={setValue}>
                    <Stepper.Item>Step 1</Stepper.Item>
                    <Stepper.Item>Step 2</Stepper.Item>
                    <Stepper.Item>Step 3</Stepper.Item>
                </Stepper>
            );
        };
        render(<InteractiveStepper />);

        fireEvent.click(screen.getByText('Step 2'));

        const step2 = screen.getByText('Step 2').closest('button');
        expect(step2).toHaveClass('g-stepper__item_selected');
    });

    it('handles disabled steps correctly', () => {
        const onUpdate = jest.fn();

        render(
            <Stepper onUpdate={onUpdate}>
                <Stepper.Item>Step 1</Stepper.Item>
                <Stepper.Item disabled>Step 2</Stepper.Item>
                <Stepper.Item>Step 3</Stepper.Item>
            </Stepper>,
        );

        fireEvent.click(screen.getByText('Step 2'));
        expect(onUpdate).not.toHaveBeenCalled();

        expect(screen.getByText('Step 2').closest('button')).toHaveAttribute('disabled');
    });

    it('handles different step views (idle, error, success)', () => {
        render(
            <Stepper>
                <Stepper.Item view="idle">Step 1</Stepper.Item>
                <Stepper.Item view="error">Step 2</Stepper.Item>
                <Stepper.Item view="success">Step 3</Stepper.Item>
            </Stepper>,
        );

        expect(screen.getByText('Step 1').closest('button')).toHaveClass(
            'g-stepper__item_view_idle',
        );
        expect(screen.getByText('Step 2').closest('button')).toHaveClass(
            'g-stepper__item_view_error',
        );
        expect(screen.getByText('Step 3').closest('button')).toHaveClass(
            'g-stepper__item_view_success',
        );
    });

    it('should render with custom separator', () => {
        const customSeparator = <span data-qa="custom-separator">{'->'}</span>;

        render(
            <Stepper separator={customSeparator}>
                <Stepper.Item>Step 1</Stepper.Item>
                <Stepper.Item>Step 2</Stepper.Item>
                <Stepper.Item>Step 3</Stepper.Item>
            </Stepper>,
        );

        const separators = screen.getAllByText('->');

        expect(separators).toHaveLength(2);
        expect(separators[0]).toHaveAttribute('data-qa', 'custom-separator');
    });

    it('should render with different sizes', () => {
        const StepperWithSize = ({size}: {size: StepperProps['size']}) => (
            <Stepper size={size}>
                <Stepper.Item>Step 1</Stepper.Item>
                <Stepper.Item>Step 2</Stepper.Item>
                <Stepper.Item>Step 3</Stepper.Item>
            </Stepper>
        );

        const {rerender} = render(<StepperWithSize size="s" />);

        expect(screen.getByText('Step 1').closest('button')).toHaveClass('g-stepper__item_size_s');
        expect(screen.getByText('Step 2').closest('button')).toHaveClass('g-stepper__item_size_s');
        expect(screen.getByText('Step 3').closest('button')).toHaveClass('g-stepper__item_size_s');

        rerender(<StepperWithSize size="l" />);

        expect(screen.getByText('Step 1').closest('button')).toHaveClass('g-stepper__item_size_l');
        expect(screen.getByText('Step 2').closest('button')).toHaveClass('g-stepper__item_size_l');
        expect(screen.getByText('Step 3').closest('button')).toHaveClass('g-stepper__item_size_l');
    });

    it('render with custom icons', () => {
        const iconQa = 'custom-icon-qa';
        render(
            <Stepper>
                <Stepper.Item icon={() => <Cloud data-qa={iconQa} />}>Step 1</Stepper.Item>
                <Stepper.Item>Step 2</Stepper.Item>
                <Stepper.Item>Step 3</Stepper.Item>
            </Stepper>,
        );

        const step1 = screen.getByText('Step 1').closest('button');
        const customIcon = screen.getByTestId(iconQa);

        expect(customIcon).toBeInTheDocument();
        expect(step1).toContainElement(customIcon);
    });
});
