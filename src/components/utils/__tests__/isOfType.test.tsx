import * as React from 'react';

import {render, screen} from '../../../../test-utils/utils';
import {isOfType} from '../isOfType';

function Test(props: React.PropsWithChildren<{matcher: (c: unknown) => boolean}>) {
    const child = React.Children.only(props.children);

    return props.matcher(child) ? 'correct' : 'wrong';
}

describe('isOfType', () => {
    test('should match type of component', () => {
        const Component = () => null;

        render(
            <Test matcher={isOfType(Component)}>
                <Component />
            </Test>,
        );
        expect(screen.getByText('correct')).toBeVisible();
    });
    test('should match displayName', () => {
        const Component = () => null;
        Component.displayName = 'comp1';
        const Component2 = () => null;
        Component2.displayName = 'comp1';

        render(
            <Test matcher={isOfType(Component)}>
                <Component2 />
            </Test>,
        );
        expect(screen.getByText('correct')).toBeVisible();
    });
    test('should not match if type and displayName do not match', () => {
        const Component = () => null;
        Component.displayName = 'comp1';
        const Component2 = () => null;
        Component2.displayName = 'comp2';

        render(
            <Test matcher={isOfType(Component)}>
                <Component2 />
            </Test>,
        );
        expect(screen.getByText('wrong')).toBeVisible();
    });
    test('should not match if type do not match and displayName is absent', () => {
        const Component = () => null;
        const Component2 = () => null;

        render(
            <Test matcher={isOfType(Component)}>
                <Component2 />
            </Test>,
        );
        expect(screen.getByText('wrong')).toBeVisible();
    });
    test('should match type of builtin component', () => {
        render(
            <Test matcher={isOfType('svg')}>
                <svg />
            </Test>,
        );
        expect(screen.getByText('correct')).toBeVisible();
    });
    test('should not match if type of builtin component is different', () => {
        render(
            <Test matcher={isOfType('svg')}>
                <button />
            </Test>,
        );
        expect(screen.getByText('wrong')).toBeVisible();
    });
});
