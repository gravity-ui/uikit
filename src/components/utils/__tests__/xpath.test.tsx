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
            render(<button onClick={onClick}>{clickText}</button>);
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0]);
            expect(xpath).toBe(rootBuilder.append({tag: 'button'}).xpath);
            expect(hash).toMatchInlineSnapshot(`"06047633dfa8f1dc342f0043e3fd2d8a"`);
        });

        it('should get xpath with class name', () => {
            const onClick = jest.fn();
            render(
                <button onClick={onClick} className="target">
                    {clickText}
                </button>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0]);
            expect(xpath).toBe(rootBuilder.append({tag: 'button', className: 'target'}).xpath);
            expect(hash).toMatchInlineSnapshot(`"ca58c57979157ea240d888250952f894"`);
        });

        it('should get xpath with multiply class names', () => {
            const onClick = jest.fn();
            render(
                <button
                    onClick={onClick}
                    className="target target_important or-maybe__not_important"
                >
                    {clickText}
                </button>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0]);
            expect(xpath).toBe(
                rootBuilder.append({
                    tag: 'button',
                    className: 'target target_important or-maybe__not_important',
                }).xpath,
            );
            expect(hash).toMatchInlineSnapshot(`"1a6031f4c97b0e7ce630f7fa4bc7ea3d"`);
        });

        it('should get xpath with id', () => {
            const onClick = jest.fn();
            render(
                <button onClick={onClick} id="target">
                    {clickText}
                </button>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0]);
            expect(xpath).toBe(rootBuilder.append({tag: 'button', id: 'target'}).xpath);
            expect(hash).toMatchInlineSnapshot(`"5f6de171df35b0fa2ff1c810f18ee6b8"`);
        });

        it('should get xpath with only id', () => {
            const onClick = jest.fn();
            render(
                <button onClick={onClick} className="class-name" id="id">
                    {clickText}
                </button>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0]);
            expect(xpath).toBe(rootBuilder.append({tag: 'button', id: 'id'}).xpath);
            expect(hash).toMatchInlineSnapshot(`"6d76706cf7f6317ad1af0a2a7279e9eb"`);
        });

        it('should get xpath from deep tag', () => {
            const onClick = jest.fn();
            render(
                <main className="main">
                    <button onClick={onClick} id="target">
                        {clickText}
                    </button>
                </main>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0]);
            expect(xpath).toBe(
                rootBuilder
                    .append({tag: 'main', className: 'main'})
                    .append({tag: 'button', id: 'target'}).xpath,
            );
            expect(hash).toMatchInlineSnapshot(`"512d33531a6560e158d173dcab2c527c"`);
        });

        it('should ignore same level nodes', () => {
            const onClick = jest.fn();
            render(
                <main>
                    <span>Hello</span>
                    <div>world</div>
                    <button onClick={onClick}>{clickText}</button>
                    <div>!</div>
                    <span>(css is awesome)</span>
                </main>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0]);
            expect(xpath).toBe(rootBuilder.append({tag: 'main'}).append({tag: 'button'}).xpath);
            expect(hash).toMatchInlineSnapshot(`"c24ba97aaa529fc229f26220075a3633"`);
        });

        it('should ignore subnodes', () => {
            const onClick = jest.fn();
            render(
                <button onClick={onClick}>
                    {clickText}
                    <span>Hello</span>
                    <div>world</div>
                    <div>!</div>
                    (css is awesome)
                </button>,
            );
            screen.getByText(new RegExp(`^${clickText}`)).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0]);
            expect(xpath).toBe(rootBuilder.append({tag: 'button'}).xpath);
            expect(hash).toMatchInlineSnapshot(`"06047633dfa8f1dc342f0043e3fd2d8a"`);
        });
    });

    describe('options', () => {
        it('should ignore id', () => {
            const onClick = jest.fn();
            render(
                <button onClick={onClick} id="id">
                    {clickText}
                </button>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0], {withoutId: true});
            expect(xpath).toBe(rootBuilder.append({tag: 'button'}).xpath);
            expect(hash).toMatchInlineSnapshot(`"06047633dfa8f1dc342f0043e3fd2d8a"`);
        });

        it('should ignore id 2', () => {
            const onClick = jest.fn();
            render(
                <button onClick={onClick} className="class-name" id="id">
                    {clickText}
                </button>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0], {withoutId: true});
            expect(xpath).toBe(rootBuilder.append({tag: 'button', className: 'class-name'}).xpath);
            expect(hash).toMatchInlineSnapshot(`"11bf62fa086f7200f06948db45ef1713"`);
        });

        it('should transform class names', () => {
            const onClick = jest.fn();
            render(
                <div>
                    <div className="container">
                        <button onClick={onClick} className="target target-2">
                            {clickText}
                        </button>
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
                    .append({tag: 'button', className: 'target__converted target-2__converted'})
                    .xpath,
            );
            expect(hash).toMatchInlineSnapshot(`"ee66d41ab46d9c19534e94b18f63d481"`);
        });

        it('should ignore class name convert if id exist', () => {
            const onClick = jest.fn();
            render(
                <button onClick={onClick} className="class__name" id="id">
                    {clickText}
                </button>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0], {
                classConverter: ({block}) => ({block}),
            });
            expect(xpath).toBe(rootBuilder.append({tag: 'button', id: 'id'}).xpath);
            expect(hash).toMatchInlineSnapshot(`"6d76706cf7f6317ad1af0a2a7279e9eb"`);
        });

        it('should not ignore class name convert if withoutId', () => {
            const onClick = jest.fn();
            render(
                <button onClick={onClick} className="class__name" id="id">
                    {clickText}
                </button>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0], {
                classConverter: ({block}) => ({block}),
                withoutId: true,
            });
            expect(xpath).toBe(rootBuilder.append({tag: 'button', className: 'class'}).xpath);
            expect(hash).toMatchInlineSnapshot(`"c1569cbf5d014325012a5a6f5f779aff"`);
        });

        it('should remove mods correctly', () => {
            const onClick = jest.fn();
            render(
                <button
                    onClick={onClick}
                    className="class class__name class__name_mod target_status_important"
                    id="id"
                >
                    {clickText}
                </button>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0], {
                classConverter: withoutClassMods(),
                withoutId: true,
            });
            expect(xpath).toBe(
                rootBuilder.append({tag: 'button', className: 'class class__name'}).xpath,
            );
            expect(hash).toMatchInlineSnapshot(`"41dc268299e67f35d60fc33fd2bb6727"`);
        });

        it('should remove mods correctly 2', () => {
            const onClick = jest.fn();
            render(
                <button
                    onClick={onClick}
                    className="class class__name class__name_mod target_status_important"
                    id="id"
                >
                    {clickText}
                </button>,
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
                rootBuilder.append({tag: 'button', className: 'class_no-mod class__name_no-mod'})
                    .xpath,
            );
            expect(hash).toMatchInlineSnapshot(`"9791ba0c06b49ee90186fdfcea5fb54a"`);
        });

        it('should get tags', () => {
            const onClick = jest.fn();
            render(
                <button onClick={onClick} className="class">
                    {clickText}
                </button>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0], {
                classConverter: ({tag, block}) => ({
                    block,
                    element: tag,
                }),
            });
            expect(xpath).toBe(
                rootBuilder.append({tag: 'button', className: 'class__button'}).xpath,
            );
            expect(hash).toMatchInlineSnapshot(`"1c1b1d37c96f75942c84242769825c6e"`);
        });

        it('should remove id if it was converted to undefined', () => {
            const onClick = jest.fn();
            render(
                <button onClick={onClick} id={'remove-too'}>
                    <div id={'keep-this'} className={'class-2'}>
                        <div id="remove" className={'target class-3'}>
                            {clickText}
                        </div>
                    </div>
                </button>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0], {
                idConverter: (id) => (id.startsWith('remove') ? undefined : id),
            });
            expect(xpath).toBe(
                rootBuilder
                    .append({tag: 'button'})
                    .append({id: 'keep-this'})
                    .append({className: 'target class-3'}).xpath,
            );
            expect(hash).toMatchInlineSnapshot(`"b186a4c63c0e5923dc8d2c9ce9f916d6"`);
        });

        it('should convert some ids', () => {
            const onClick = jest.fn();
            render(
                <button onClick={onClick} className={'class-1'} id={'convert-too'}>
                    <div id={'keep-this'} className={'class-2'}>
                        <div id="convert" className={'target class-3'}>
                            {clickText}
                        </div>
                    </div>
                </button>,
            );
            screen.getByText(clickText).click();

            const {xpath, hash} = getXpath(onClick.mock.calls[0][0], {
                idConverter: (id) => id.replace('convert', 'keep'),
            });
            expect(xpath).toBe(
                rootBuilder
                    .append({tag: 'button', id: 'keep-too'})
                    .append({id: 'keep-this'})
                    .append({id: 'keep'}).xpath,
            );
            expect(hash).toMatchInlineSnapshot(`"b841a18958a6436f4a94eabb27a9647c"`);
        });
    });
});
