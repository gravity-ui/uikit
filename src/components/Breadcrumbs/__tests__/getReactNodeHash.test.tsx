import * as React from 'react';

import {getReactNodeHash} from '../utils';

function Wrapper({children}: {children?: React.ReactNode}) {
    return <div>{children}</div>;
}
Wrapper.displayName = 'Wrapper';

it('returns empty string for null/undefined/boolean', () => {
    expect(getReactNodeHash(null)).toBe('');
    expect(getReactNodeHash(undefined)).toBe('');
    expect(getReactNodeHash(true)).toBe('');
    expect(getReactNodeHash(false)).toBe('');
});

it('returns string representation for primitives', () => {
    expect(getReactNodeHash('hello')).toBe('hello');
    expect(getReactNodeHash(42)).toBe('42');
});

it('includes element type name for intrinsic elements', () => {
    const hash = getReactNodeHash(<span>text</span>);
    expect(hash).toContain('span');
});

it('includes displayName for custom components', () => {
    const hash = getReactNodeHash(<Wrapper>text</Wrapper>);
    expect(hash).toContain('Wrapper');
});

it('includes element key', () => {
    const hash = getReactNodeHash(<span key="my-key">text</span>);
    expect(hash).toContain('my-key');
});

it('includes primitive props', () => {
    const hash = getReactNodeHash(<a href="/home" title="Home" />);
    expect(hash).toContain('href:/home');
    expect(hash).toContain('title:Home');
});

it('includes boolean and number props', () => {
    const hash = getReactNodeHash(<input disabled={true} tabIndex={-1} />);
    expect(hash).toContain('disabled:true');
    expect(hash).toContain('tabIndex:-1');
});

it('ignores function and object props', () => {
    const onClick = () => {};
    const style = {color: 'red'};
    const hash = getReactNodeHash(<button onClick={onClick} style={style} />);
    expect(hash).not.toContain('onClick');
    expect(hash).not.toContain('style');
});

it('recurses into nested children', () => {
    const hash = getReactNodeHash(
        <div>
            <span>nested text</span>
        </div>,
    );
    expect(hash).toContain('span');
    expect(hash).toContain('nested text');
});

it('handles deeply nested structures', () => {
    const hash = getReactNodeHash(
        <div>
            <ul>
                <li>
                    <a href="/deep">deep link</a>
                </li>
            </ul>
        </div>,
    );
    expect(hash).toContain('deep link');
    expect(hash).toContain('href:/deep');
});

it('returns same hash for same structure', () => {
    const tree = (
        <div>
            <span className="a">text</span>
            <span className="b">other</span>
        </div>
    );
    expect(getReactNodeHash(tree)).toBe(getReactNodeHash(tree));
});

it('returns different hash when text changes', () => {
    const hash1 = getReactNodeHash(<span>text A</span>);
    const hash2 = getReactNodeHash(<span>text B</span>);
    expect(hash1).not.toBe(hash2);
});

it('returns different hash when props change', () => {
    const hash1 = getReactNodeHash(<a href="/a">link</a>);
    const hash2 = getReactNodeHash(<a href="/b">link</a>);
    expect(hash1).not.toBe(hash2);
});

it('returns different hash when element type changes', () => {
    const hash1 = getReactNodeHash(<span>text</span>);
    const hash2 = getReactNodeHash(<div>text</div>);
    expect(hash1).not.toBe(hash2);
});

it('returns different hash when children count changes', () => {
    const hash1 = getReactNodeHash(
        <React.Fragment>
            <span>a</span>
            <span>b</span>
        </React.Fragment>,
    );
    const hash2 = getReactNodeHash(
        <React.Fragment>
            <span>a</span>
            <span>b</span>
            <span>c</span>
        </React.Fragment>,
    );
    expect(hash1).not.toBe(hash2);
});

it('returns different hash when children order changes', () => {
    const hash1 = getReactNodeHash(
        <React.Fragment>
            <span>a</span>
            <span>b</span>
        </React.Fragment>,
    );
    const hash2 = getReactNodeHash(
        <React.Fragment>
            <span>b</span>
            <span>a</span>
        </React.Fragment>,
    );
    expect(hash1).not.toBe(hash2);
});

it('handles multiple children at top level', () => {
    const hash = getReactNodeHash(
        <React.Fragment>
            <span>first</span>
            <span>second</span>
        </React.Fragment>,
    );
    expect(hash).toContain('first');
    expect(hash).toContain('second');
});

it('handles mixed children types', () => {
    const hash = getReactNodeHash(
        <div>
            text node
            <span>element</span>
            {42}
        </div>,
    );
    expect(hash).toContain('text node');
    expect(hash).toContain('span');
    expect(hash).toContain('element');
    expect(hash).toContain('42');
});

it('returns different hash when nested prop changes', () => {
    const hash1 = getReactNodeHash(
        <div>
            <a href="/old">link</a>
        </div>,
    );
    const hash2 = getReactNodeHash(
        <div>
            <a href="/new">link</a>
        </div>,
    );
    expect(hash1).not.toBe(hash2);
});
