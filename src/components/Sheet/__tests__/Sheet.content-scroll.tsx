import {fireEvent, render} from '../../../../test-utils/utils';
import {block} from '../../utils/cn';
import {Sheet} from '../Sheet';

const contentAreaBlock = block('sheet-content-area');

describe('Sheet content scroll', () => {
    const SHEET_HEIGHT = 300;
    let getBoundingClientRectSpy: jest.SpyInstance;
    beforeEach(() => {
        getBoundingClientRectSpy = jest
            .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
            .mockReturnValue({height: SHEET_HEIGHT, width: 0, top: 0, left: 0} as DOMRect);
    });
    afterEach(() => {
        getBoundingClientRectSpy.mockRestore();
    });

    function swipeDownOnContent(content: Element, {from, to}: {from: number; to: number}) {
        fireEvent.touchStart(content, {touches: [{clientX: 0, clientY: from}]});
        fireEvent.touchMove(content, {touches: [{clientX: 0, clientY: to}]});
        fireEvent.touchEnd(content, {touches: [{clientX: 0, clientY: to}]});
    }

    test('closes the sheet on a swipe down when the content is scrolled to the top', () => {
        const onClose = jest.fn();
        const {container} = render(
            <Sheet visible onClose={onClose}>
                Content
            </Sheet>,
        );

        // eslint-disable-next-line testing-library/no-container
        const scrollContainer = container.querySelector(`.${contentAreaBlock()}`) as HTMLElement;

        swipeDownOnContent(scrollContainer, {from: 100, to: 100 + SHEET_HEIGHT + 50});
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('does not close the sheet on a swipe down when the content is scrolled', () => {
        const onClose = jest.fn();
        const {container} = render(
            <Sheet visible onClose={onClose}>
                Content
            </Sheet>,
        );

        // eslint-disable-next-line testing-library/no-container
        const scrollContainer = container.querySelector(`.${contentAreaBlock()}`) as HTMLElement;

        Object.defineProperty(scrollContainer, 'scrollTop', {value: 100, configurable: true});
        swipeDownOnContent(scrollContainer, {from: 100, to: 100 + SHEET_HEIGHT + 50});
        expect(onClose).not.toHaveBeenCalled();
    });
});
