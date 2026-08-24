import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../../../test-utils/utils';
import {ColorPicker} from '../ColorPicker';

jest.mock('@uiw/react-color', () => {
    const noopComponent = () => null;
    const hsva = {h: 0, s: 0, v: 0, a: 1};

    return {
        __esModule: true,
        Alpha: noopComponent,
        Hue: noopComponent,
        Saturation: noopComponent,
        EditableInput: noopComponent,
        EditableInputRGBA: noopComponent,
        hsvaToHex: () => '#000000',
        hsvaToHexa: () => '#000000ff',
        hsvaToRgbString: () => 'rgb(0, 0, 0)',
        hsvaToRgbaString: () => 'rgba(0, 0, 0, 1)',
        hexToHsva: () => ({...hsva}),
        hslaStringToHsva: () => ({...hsva}),
        hsvaStringToHsva: () => ({...hsva}),
        rgbaStringToHsva: () => ({...hsva}),
        validHex: () => true,
    };
});

describe('ColorPicker', () => {
    test('should call onOpenChange on closing with correct params', async () => {
        const onOpenChange = jest.fn();

        render(
            <div data-qa="outside">
                <ColorPicker compact defaultOpen onOpenChange={onOpenChange} />
            </div>,
        );

        const user = userEvent.setup();

        const out = screen.getByTestId('outside');
        await user.click(out);

        expect(onOpenChange).toHaveBeenCalledTimes(1);
        expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'outside-press');
    });
});
