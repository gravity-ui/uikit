import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen} from '../../../../../test-utils/utils';
import {FileDropZone} from '../FileDropZone';
import {FileDropZoneQa} from '../constants';

function createFile(name: string, type: string): File {
    return new File(['content'], name, {type});
}

function createDropData(files: File[]) {
    const items = files.map((f) => ({
        kind: 'file',
        type: f.type,
        getAsFile: () => f,
    }));
    return {dataTransfer: {items, files, dropEffect: 'none'}};
}

const defaultProps = {
    accept: ['image/*'],
    onUpdate: jest.fn(),
};

describe('FileDropZone', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('rendering', () => {
        test('renders with data-qa attribute', () => {
            render(<FileDropZone {...defaultProps} qa="file-drop" />);
            expect(screen.getByTestId('file-drop')).toBeInTheDocument();
        });

        test('renders default title for single-file mode', () => {
            render(<FileDropZone {...defaultProps} />);
            expect(screen.getByText('Drag the file here or select it')).toBeInTheDocument();
        });

        test('renders default title for multiple-file mode', () => {
            render(<FileDropZone {...defaultProps} multiple />);
            expect(screen.getByText('Drag the files here or select them')).toBeInTheDocument();
        });

        test('renders custom title, description, buttonText', () => {
            render(
                <FileDropZone
                    {...defaultProps}
                    title="Custom title"
                    description="Custom desc"
                    buttonText="Custom button"
                />,
            );
            expect(screen.getByText('Custom title')).toBeInTheDocument();
            expect(screen.getByText('Custom desc')).toBeInTheDocument();
            expect(screen.getByText('Custom button')).toBeInTheDocument();
        });

        test('does not render description if not provided', () => {
            render(<FileDropZone {...defaultProps} />);
            // Description element (g-text with color secondary) should not be in the DOM
            expect(screen.queryByTestId(FileDropZoneQa.DESCRIPTION)).not.toBeInTheDocument();
        });

        test('renders custom children instead of default layout', () => {
            render(
                <FileDropZone {...defaultProps}>
                    <div data-qa="custom-child">Custom content</div>
                </FileDropZone>,
            );
            expect(screen.getByTestId('custom-child')).toBeInTheDocument();
            // Default title should not appear
            expect(screen.queryByText('Drag the file here or select it')).not.toBeInTheDocument();
        });

        test('contains role="button" and tabIndex=0', () => {
            render(<FileDropZone {...defaultProps} qa="drop-zone" />);
            const zone = screen.getByTestId('drop-zone');
            expect(zone).toHaveAttribute('role', 'button');
            expect(zone).toHaveAttribute('tabindex', '0');
        });
    });

    describe('error state', () => {
        test('shows errorMessage instead of title', () => {
            render(<FileDropZone {...defaultProps} errorMessage="Upload failed" />);
            expect(screen.getByText('Upload failed')).toBeInTheDocument();
            expect(screen.queryByText('Drag the file here or select it')).not.toBeInTheDocument();
        });

        test('applies error modifier with errorMessage', () => {
            render(<FileDropZone {...defaultProps} errorMessage="Error" qa="drop-zone" />);
            const zone = screen.getByTestId('drop-zone');
            expect(zone.className).toMatch(/error/);
        });

        test('applies error modifier with validationState=invalid', () => {
            render(<FileDropZone {...defaultProps} validationState="invalid" qa="drop-zone" />);
            const zone = screen.getByTestId('drop-zone');
            expect(zone.className).toMatch(/error/);
        });

        test('hides icon when icon={null}', async () => {
            render(<FileDropZone {...defaultProps} icon={null} />);
            expect(screen.queryByTestId(FileDropZoneQa.ICON)).not.toBeInTheDocument();
        });
    });

    describe('disabled', () => {
        test('applies disabled modifier', () => {
            render(<FileDropZone {...defaultProps} disabled qa="drop-zone" />);
            const zone = screen.getByTestId('drop-zone');
            expect(zone.className).toMatch(/disabled/);
        });

        test('does not call onUpdate on drop when disabled', () => {
            const onUpdate = jest.fn();
            render(<FileDropZone {...defaultProps} onUpdate={onUpdate} disabled qa="drop-zone" />);
            const zone = screen.getByTestId('drop-zone');

            fireEvent.dragEnter(zone, createDropData([createFile('a.png', 'image/png')]));
            fireEvent.drop(zone, createDropData([createFile('a.png', 'image/png')]));

            expect(onUpdate).not.toHaveBeenCalled();
        });
    });

    describe('drag and drop', () => {
        test('applies drag-hover modifier on dragEnter with valid files', () => {
            render(<FileDropZone {...defaultProps} qa="drop-zone" />);
            const zone = screen.getByTestId('drop-zone');

            fireEvent.dragEnter(zone, createDropData([createFile('a.png', 'image/png')]));

            expect(zone.className).toMatch(/drag-hover/);
        });

        test('removes drag-hover on dragLeave', () => {
            render(<FileDropZone {...defaultProps} qa="drop-zone" />);
            const zone = screen.getByTestId('drop-zone');

            fireEvent.dragEnter(zone, createDropData([createFile('a.png', 'image/png')]));
            fireEvent.dragLeave(zone, createDropData([createFile('a.png', 'image/png')]));

            expect(zone.className).not.toMatch(/drag-hover/);
        });

        test('calls onUpdate with File[] on valid drop', () => {
            const onUpdate = jest.fn();
            render(<FileDropZone {...defaultProps} onUpdate={onUpdate} qa="drop-zone" />);
            const zone = screen.getByTestId('drop-zone');
            const file = createFile('a.png', 'image/png');

            fireEvent.drop(zone, createDropData([file]));

            expect(onUpdate).toHaveBeenCalledTimes(1);
            expect(onUpdate).toHaveBeenCalledWith([file]);
        });

        test('calls onReject on drop with invalid type', () => {
            const onReject = jest.fn();
            render(<FileDropZone {...defaultProps} onReject={onReject} qa="drop-zone" />);
            const zone = screen.getByTestId('drop-zone');
            const file = createFile('doc.pdf', 'application/pdf');

            fireEvent.drop(zone, createDropData([file]));

            expect(onReject).toHaveBeenCalledTimes(1);
            expect(onReject).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        file,
                        reasons: expect.arrayContaining(['invalid-type']),
                    }),
                ]),
            );
        });

        test('applies invalid-drag modifier when dragging invalid files', () => {
            render(<FileDropZone {...defaultProps} qa="drop-zone" />);
            const zone = screen.getByTestId('drop-zone');

            fireEvent.dragEnter(zone, createDropData([createFile('doc.pdf', 'application/pdf')]));

            expect(zone.className).toMatch(/invalid-drag/);
        });

        test('calls onReject with too-many-files when exceeding maxFilesCount', () => {
            const onReject = jest.fn();
            const onUpdate = jest.fn();
            render(
                <FileDropZone
                    accept={['image/*']}
                    onUpdate={onUpdate}
                    onReject={onReject}
                    multiple
                    maxFilesCount={1}
                    qa="drop-zone"
                />,
            );
            const zone = screen.getByTestId('drop-zone');

            fireEvent.drop(
                zone,
                createDropData([
                    createFile('a.png', 'image/png'),
                    createFile('b.png', 'image/png'),
                ]),
            );

            expect(onUpdate).toHaveBeenCalledTimes(1);
            expect(onReject).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        reasons: expect.arrayContaining(['too-many-files']),
                    }),
                ]),
            );
        });
    });

    describe('file input (button click)', () => {
        function getFileInput(): HTMLInputElement {
            return screen.getByTestId(FileDropZoneQa.FILE_INPUT) as HTMLInputElement;
        }

        test('hidden input has correct accept attribute', () => {
            render(<FileDropZone {...defaultProps} accept={['image/png', 'application/pdf']} />);
            expect(getFileInput()).toHaveAttribute('accept', 'image/png,application/pdf');
        });

        test('input has multiple in multiple mode', () => {
            render(<FileDropZone {...defaultProps} multiple qa="drop-zone" />);
            expect(getFileInput()).toHaveAttribute('multiple');
        });

        test('input does not have multiple in single mode', () => {
            render(<FileDropZone {...defaultProps} qa="drop-zone" />);
            expect(getFileInput()).not.toHaveAttribute('multiple');
        });

        test('calls onUpdate when files selected via input', async () => {
            const user = userEvent.setup();
            const onUpdate = jest.fn();
            render(<FileDropZone {...defaultProps} onUpdate={onUpdate} qa="drop-zone" />);
            const file = createFile('a.png', 'image/png');

            await user.upload(getFileInput(), file);

            expect(onUpdate).toHaveBeenCalledTimes(1);
            expect(onUpdate).toHaveBeenCalledWith([file]);
        });

        test('splits files by maxFilesCount on input selection', async () => {
            const user = userEvent.setup();
            const onUpdate = jest.fn();
            const onReject = jest.fn();
            render(
                <FileDropZone
                    accept={['image/*']}
                    onUpdate={onUpdate}
                    onReject={onReject}
                    multiple
                    maxFilesCount={1}
                    qa="drop-zone"
                />,
            );

            await user.upload(getFileInput(), [
                createFile('a.png', 'image/png'),
                createFile('b.png', 'image/png'),
            ]);

            expect(onUpdate).toHaveBeenCalledTimes(1);
            expect(onUpdate.mock.calls[0][0]).toHaveLength(1);
            expect(onReject).toHaveBeenCalledTimes(0);
        });
    });

    describe('context', () => {
        test('sub-components throw error when used outside FileDropZone', () => {
            const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

            expect(() => render(<FileDropZone.Title />)).toThrow('FileDropZone context not found');

            consoleError.mockRestore();
        });
    });
});
