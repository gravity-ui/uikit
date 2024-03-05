/* eslint jsx-a11y/click-events-have-key-events: 0, jsx-a11y/no-static-element-interactions: 0 */

import React from 'react';

import {render, screen} from '../../../../test-utils/utils';
import {getXpath, withoutClassMods} from '../xpath';

class XpathBuilder {
    readonly xpath: string;

    constructor(xpath = '/html/body') {
        this.xpath = xpath;
    }

    append(params?: {tag?: string; className?: string; id?: string}) {
        const {tag, className, id} = {
            tag: 'div',
            ...params,
        };

        let newXpath = `${this.xpath}/${tag}`;
        if (id) {
            newXpath += `[@id='${id}']`;
        } else if (className) {
            newXpath += `[@class='${className}']`;
        }
        return new XpathBuilder(newXpath);
    }
}

describe('getXpath', () => {
    const rootBuilder = new XpathBuilder().append();
    const clickText = 'Click me!';

    describe('no option', () => {
        it('should get xpath', () => {
            const onClick = jest.fn();
            render(<div onClick={onClick}>{clickText}</div>);
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0]);
            expect(xpath).toBe(rootBuilder.append().xpath);
            expect(hash).toMatchInlineSnapshot(`"ae152984744905d6e135619e32e8a06e"`);
        });

        it('should get xpath with class name', () => {
            const onClick = jest.fn();
            render(
                <div onClick={onClick} className="target">
                    {clickText}
                </div>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0]);
            expect(xpath).toBe(rootBuilder.append({className: 'target'}).xpath);
            expect(hash).toMatchInlineSnapshot(`"af0aa4559887e5d354f9e3da443f4ec7"`);
        });

        it('should get xpath with multiply class names', () => {
            const onClick = jest.fn();
            render(
                <div onClick={onClick} className="target target_important or-maybe__not_important">
                    {clickText}
                </div>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0]);
            expect(xpath).toBe(
                rootBuilder.append({className: 'target target_important or-maybe__not_important'})
                    .xpath,
            );
            expect(hash).toMatchInlineSnapshot(`"71133dcb198e2a619bd0f83f4b5f37a8"`);
        });

        it('should get xpath with id', () => {
            const onClick = jest.fn();
            render(
                <div onClick={onClick} id="target">
                    {clickText}
                </div>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0]);
            expect(xpath).toBe(rootBuilder.append({id: 'target'}).xpath);
            expect(hash).toMatchInlineSnapshot(`"ab5d7778edde59b97b55ea2ff0fe2b28"`);
        });

        it('should get xpath with only id', () => {
            const onClick = jest.fn();
            render(
                <div onClick={onClick} className="class-name" id="id">
                    {clickText}
                </div>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0]);
            expect(xpath).toBe(rootBuilder.append({id: 'id'}).xpath);
            expect(hash).toMatchInlineSnapshot(`"aad885cd5dfa17a63e475c43e23b572d"`);
        });

        it('should get xpath from deep tag', () => {
            const onClick = jest.fn();
            render(
                <main className="main">
                    <div onClick={onClick} id="target">
                        {clickText}
                    </div>
                </main>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0]);
            expect(xpath).toBe(
                rootBuilder.append({tag: 'main', className: 'main'}).append({id: 'target'}).xpath,
            );
            expect(hash).toMatchInlineSnapshot(`"52eca834366d0e6e0f1e707a540f5475"`);
        });

        it('should ignore same level nodes', () => {
            const onClick = jest.fn();
            render(
                <main>
                    <span>Hello</span>
                    <div>world</div>
                    <div onClick={onClick}>{clickText}</div>
                    <div>!</div>
                    <span>(css is awesome)</span>
                </main>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0]);
            expect(xpath).toBe(rootBuilder.append({tag: 'main'}).append().xpath);
            expect(hash).toMatchInlineSnapshot(`"65f32734376f55e3648401f011cc75c5"`);
        });

        it('should ignore subnodes', () => {
            const onClick = jest.fn();
            render(
                <div onClick={onClick}>
                    {clickText}
                    <span>Hello</span>
                    <div>world</div>
                    <div>!</div>
                    (css is awesome)
                </div>,
            );
            screen.getByText(new RegExp(`^${clickText}`)).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0]);
            expect(xpath).toBe(rootBuilder.append().xpath);
            expect(hash).toMatchInlineSnapshot(`"ae152984744905d6e135619e32e8a06e"`);
        });
    });

    describe('options', () => {
        it('should ignore id', () => {
            const onClick = jest.fn();
            render(
                <div onClick={onClick} id="id">
                    {clickText}
                </div>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0], {withoutId: true});
            expect(xpath).toBe(rootBuilder.append().xpath);
            expect(hash).toMatchInlineSnapshot(`"ae152984744905d6e135619e32e8a06e"`);
        });

        it('should ignore id 2', () => {
            const onClick = jest.fn();
            render(
                <div onClick={onClick} className="class-name" id="id">
                    {clickText}
                </div>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0], {withoutId: true});
            expect(xpath).toBe(rootBuilder.append({className: 'class-name'}).xpath);
            expect(hash).toMatchInlineSnapshot(`"bfdf511bca38e29bdc45c5fc556ce9a7"`);
        });

        it('should transform class names', () => {
            const onClick = jest.fn();
            render(
                <div>
                    <div className="container">
                        <div onClick={onClick} className="target target-2">
                            {clickText}
                        </div>
                    </div>
                </div>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0], {
                classConverter: ({block}) => ({
                    block,
                    element: 'converted',
                }),
            });
            expect(xpath).toBe(
                rootBuilder
                    .append()
                    .append({className: 'container__converted'})
                    .append({className: 'target__converted target-2__converted'}).xpath,
            );
            expect(hash).toMatchInlineSnapshot(`"9f0dc952032536615fd5217d02f47f09"`);
        });

        it('should ignore class name convert if id exist', () => {
            const onClick = jest.fn();
            render(
                <div onClick={onClick} className="class__name" id="id">
                    {clickText}
                </div>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0], {
                classConverter: ({block}) => ({block}),
            });
            expect(xpath).toBe(rootBuilder.append({id: 'id'}).xpath);
            expect(hash).toMatchInlineSnapshot(`"aad885cd5dfa17a63e475c43e23b572d"`);
        });

        it('should not ignore class name convert if withoutId', () => {
            const onClick = jest.fn();
            render(
                <div onClick={onClick} className="class__name" id="id">
                    {clickText}
                </div>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0], {
                classConverter: ({block}) => ({block}),
                withoutId: true,
            });
            expect(xpath).toBe(rootBuilder.append({className: 'class'}).xpath);
            expect(hash).toMatchInlineSnapshot(`"5296eda04d18e2ab7e41f1a2e293a4bf"`);
        });

        it('should remove mods correctly', () => {
            const onClick = jest.fn();
            render(
                <div
                    onClick={onClick}
                    className="class class__name class__name_mod target_status_important"
                    id="id"
                >
                    {clickText}
                </div>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0], {
                classConverter: withoutClassMods(),
                withoutId: true,
            });
            expect(xpath).toBe(rootBuilder.append({className: 'class class__name'}).xpath);
            expect(hash).toMatchInlineSnapshot(`"d7c4a0991ef83687ec9be6a2e342d6e5"`);
        });

        it('should remove mods correctly 2', () => {
            const onClick = jest.fn();
            render(
                <div
                    onClick={onClick}
                    className="class class__name class__name_mod target_status_important"
                    id="id"
                >
                    {clickText}
                </div>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0], {
                classConverter: withoutClassMods((objClass) => ({
                    ...objClass,
                    mod: {key: 'no-mod', value: true},
                })),
                withoutId: true,
            });
            expect(xpath).toBe(
                rootBuilder.append({className: 'class_no-mod class__name_no-mod'}).xpath,
            );
            expect(hash).toMatchInlineSnapshot(`"e1cc78e4024420bc11aed6dbc612e97c"`);
        });

        it('should get tags', () => {
            const onClick = jest.fn();
            render(
                <div onClick={onClick} className="class">
                    {clickText}
                </div>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0], {
                classConverter: ({tag, block}) => ({
                    block,
                    element: tag,
                }),
            });
            expect(xpath).toBe(rootBuilder.append({className: 'class__div'}).xpath);
            expect(hash).toMatchInlineSnapshot(`"bf5138ce0f335973b588b4c3029e1335"`);
        });

        it('should remove id if it was converted to undefined', () => {
            const onClick = jest.fn();
            render(
                <div onClick={onClick} id={'remove-too'}>
                    <div id={'keep-this'} className={'class-2'}>
                        <div id="remove" className={'target class-3'}>
                            {clickText}
                        </div>
                    </div>
                </div>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0], {
                idConverter: (id) => (id.startsWith('remove') ? undefined : id),
            });
            expect(xpath).toBe(
                rootBuilder.append().append({id: 'keep-this'}).append({className: 'target class-3'})
                    .xpath,
            );
            expect(hash).toMatchInlineSnapshot(`"21df5cf9017ae106f30a9a6608a9cb4a"`);
        });

        it('should convert some ids', () => {
            const onClick = jest.fn();
            render(
                <div onClick={onClick} className={'class-1'} id={'convert-too'}>
                    <div id={'keep-this'} className={'class-2'}>
                        <div id="convert" className={'target class-3'}>
                            {clickText}
                        </div>
                    </div>
                </div>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0], {
                idConverter: (id) => id.replace('convert', 'keep'),
            });
            expect(xpath).toBe(
                rootBuilder.append({id: 'keep-too'}).append({id: 'keep-this'}).append({id: 'keep'})
                    .xpath,
            );
            expect(hash).toMatchInlineSnapshot(`"2ac575742aa22271a17b4e1efb375330"`);
        });
    });
});
