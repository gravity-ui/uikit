import type * as React from 'react';

import {render, screen} from '../../../../test-utils/utils';
import type {UseSelectProps, useSelect} from '../../../hooks';
import {Select} from '../Select';
import {useSelectOptions} from '../hooks-public/useSelectOptions';
import type {SelectOption, SelectProps} from '../types';

/**
 * Type-level tests. The exported functions below are never called: they only have to compile.
 * `npm run typecheck` enforces them — ts-jest transpiles without type checking, so failures
 * surface in the typecheck, not in the jest run.
 */

type Equal<A, B> =
    (<G>() => G extends A ? 1 : 2) extends <G>() => G extends B ? 1 : 2 ? true : false;

type User = {id: number; name: string};

export function valueDefaultsToString(_props: SelectProps) {
    const assertion: Equal<typeof _props.value, string[] | undefined> = true;
    return assertion;
}

export function dataGenericKeepsItsPositionAndStringValues(_props: SelectProps<User>) {
    const assertion: Equal<typeof _props.value, string[] | undefined> = true;
    return assertion;
}

export function optionCarriesBothGenerics(_option: SelectOption<{meta: string}, User>) {
    const dataAssertion: Equal<typeof _option.data, {meta: string} | undefined> = true;
    const valueAssertion: Equal<typeof _option.value, User> = true;
    return [dataAssertion, valueAssertion];
}

export function useSelectPropsDefaultToString(_props: UseSelectProps) {
    const assertion: Equal<typeof _props.value, string[] | undefined> = true;
    return assertion;
}

export function useSelectPropsAcceptGenericValue(_props: UseSelectProps<User>) {
    const assertion: Equal<typeof _props.value, User[] | undefined> = true;
    return assertion;
}

export function valueTypeIsInferredFromOptions() {
    return (
        <Select
            options={[{value: 1, content: 'One'}]}
            onUpdate={(_value) => {
                const assertion: Equal<typeof _value, number[]> = true;
                return assertion;
            }}
        />
    );
}

export function renderSelectedOptionReceivesTypedValue() {
    return (
        <Select<unknown, User>
            options={[]}
            renderSelectedOption={(_option) => {
                const assertion: Equal<typeof _option.value, User> = true;
                return <span>{String(assertion)}</span>;
            }}
        />
    );
}

export function mismatchedValueTypeIsRejected() {
    return (
        <Select<any, number>
            options={[{value: 1, content: 'One'}]}
            // @ts-expect-error string values are not assignable when V is number
            value={['1']}
        />
    );
}

// Pins the non-generic overloads: type utilities that do not go through inference
// (React.ComponentProps, ReturnType, Storybook Meta) must keep resolving to string values.
export function componentPropsResolveToStringValues() {
    const selectAssertion: Equal<
        React.ComponentProps<typeof Select>['value'],
        string[] | undefined
    > = true;
    const optionAssertion: Equal<React.ComponentProps<typeof Select.Option>['value'], string> =
        true;
    return [selectAssertion, optionAssertion];
}

export function useSelectReturnTypeResolvesToStringValues() {
    const assertion: Equal<ReturnType<typeof useSelect>['value'], string[]> = true;
    return assertion;
}

export function valueTypeIsInferredFromValueAlone() {
    return (
        <Select
            options={[]}
            value={[1]}
            renderSelectedOption={(_option) => {
                const assertion: Equal<typeof _option.value, number> = true;
                return <span>{String(assertion)}</span>;
            }}
        />
    );
}

export function valueTypeIsInferredFromGroupedOptions() {
    return (
        <Select
            options={[{label: 'Group', options: [{value: 1, content: 'One'}]}]}
            onUpdate={(_value) => {
                const assertion: Equal<typeof _value, number[]> = true;
                return assertion;
            }}
        />
    );
}

export function childrenApiAcceptsExplicitValueType() {
    const user: User = {id: 1, name: 'Alice'};
    return (
        <Select<unknown, User> value={[user]}>
            <Select.Option value={user} content="Alice" />
        </Select>
    );
}

export function optionCallbacksReceiveTypedValue() {
    return (
        <Select<unknown, User>
            options={[]}
            renderOption={(_option) => {
                const assertion: Equal<typeof _option.value, User> = true;
                return <span>{String(assertion)}</span>;
            }}
            filterOption={(_option) => {
                const assertion: Equal<typeof _option.value, User> = true;
                return assertion;
            }}
            getOptionHeight={(_option) => {
                const assertion: Equal<typeof _option.value, User> = true;
                return assertion ? 28 : 0;
            }}
        />
    );
}

export function useSelectOptionsPreservesValueType() {
    const options = useSelectOptions({options: [{value: 1, content: 'One'}]});
    return (
        <Select
            options={options}
            onUpdate={(_value) => {
                const assertion: Equal<typeof _value, number[]> = true;
                return assertion;
            }}
        />
    );
}

export function valueTypeIsInferredFromDefaultValueAlone() {
    return (
        <Select
            options={[]}
            defaultValue={[1]}
            onUpdate={(_value) => {
                const assertion: Equal<typeof _value, number[]> = true;
                return assertion;
            }}
        />
    );
}

export function inferredValueConflictIsRejected() {
    // @ts-expect-error options infer V = number, string[] value must not widen the inference
    return <Select options={[{value: 1, content: 'One'}]} value={['1']} />;
}

describe('Select generic value types (smoke)', () => {
    it('renders with inferred number values', () => {
        render(<Select qa="select" options={[{value: 1, content: 'One'}]} value={[1]} />);
        expect(screen.getByTestId('select')).toHaveTextContent('One');
    });
});
