import * as React from 'react';

import {Button} from '../../Button';
import {Loader} from '../../Loader';
import {Dialog} from '../Dialog';
import type {DialogProps} from '../Dialog';

export function DynamicHeightStory(args: DialogProps) {
    const [open, setOpen] = React.useState(false);
    const [run, setRun] = React.useState(0);
    const [isFirstDynamicPartOpen, setIsFirstDynamicPartOpen] = React.useState(false);
    const [isSecondDynamicPartOpen, setIsSecondDynamicPartOpen] = React.useState(false);

    const switchVisibility = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const reset = () => {
        setIsFirstDynamicPartOpen(false);
        setIsSecondDynamicPartOpen(false);
        setRun((currentRun) => currentRun + 1);
    };

    React.useEffect(() => {
        if (!open) {
            return undefined;
        }

        const firstTimer = window.setTimeout(() => setIsFirstDynamicPartOpen(true), 2000);
        const secondTimer = window.setTimeout(() => setIsSecondDynamicPartOpen(true), 4000);

        return () => {
            window.clearTimeout(firstTimer);
            window.clearTimeout(secondTimer);
        };
    }, [open, run]);

    return (
        <div>
            <Button onClick={switchVisibility}>Show</Button>
            <Dialog
                {...args}
                open={open}
                onClose={switchVisibility}
                aria-labelledby="dynamic-height-dialog-title"
                className="my-custom-class-for-dialog"
                hasCloseButton
                keepMounted
                onTransitionOutComplete={() => reset()}
                qa="dynamicHeight"
            >
                <Dialog.Header
                    caption="Dialog with dynamic height"
                    id="dynamic-height-dialog-title"
                />
                <Dialog.Body>
                    <div>
                        {isFirstDynamicPartOpen && (
                            <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                                <div>Content loaded</div>
                                <div>This is the description</div>
                                <div>More content to come</div>
                            </div>
                        )}
                        {(!isFirstDynamicPartOpen || !isSecondDynamicPartOpen) && (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: '24px',
                                }}
                            >
                                <Loader />
                            </div>
                        )}
                        {isSecondDynamicPartOpen && (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '24px',
                                    marginTop: '24px',
                                }}
                            >
                                <div>Second part loaded</div>
                                <div>This is the description part 1</div>
                                <div>This is the description part 2</div>
                                <div>This is the description part 3</div>
                                <div>No more content to load</div>
                            </div>
                        )}
                    </div>
                </Dialog.Body>
                <Dialog.Footer
                    preset="default"
                    textButtonApply="Repeat"
                    textButtonCancel="Exit"
                    onClickButtonApply={reset}
                    onClickButtonCancel={() => setOpen(false)}
                />
            </Dialog>
        </div>
    );
}
