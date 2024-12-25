import * as React from 'react';

import {Text} from '../../Text/Text';
import {Flex} from '../../layout/Flex/Flex';
import {Select} from '../Select';

const shortVirtualized = Array.from({length: 100}, (_, i) => `V${i}`).map((value) => ({
    value,
    content: value,
}));
const extralongVirtualized = Array.from({length: 100}, (_, i) =>
    Array.from({length: 50}, () => 'Value').join(String(i)),
).map((value) => ({
    value,
    content: value,
}));

const short = shortVirtualized.slice(0, 4);
const extralong = extralongVirtualized.slice(0, 4);

export const SelectPopupWidthShowcase = (args: any) => {
    return (
        <React.Fragment>
            <h2>Static width (props.popupWidth)</h2>
            <Select
                {...args}
                className="select-example select-width-50"
                options={extralong}
                popupWidth={200}
                title="Sample select"
            />
            <Select
                {...args}
                options={extralong}
                width="max"
                popupWidth={200}
                className="select-example"
                title="Sample select"
            />

            <h2>Short values. Adjust to Control width</h2>
            <Select
                {...args}
                className="select-example select-width-300"
                options={short}
                title="Sample select"
            />
            <Select
                {...args}
                className="select-example"
                options={short}
                width="max"
                title="Sample select"
            />

            <h2>Modes default/fit</h2>
            <Flex gap={10}>
                <div>
                    Extra long values. DEFAULT (apply max-width: 90vw)
                    <div>
                        <Select
                            {...args}
                            className="select-width-300"
                            options={extralong}
                            title="Sample select"
                        />
                    </div>
                </div>
                <div>
                    Short values. DEFAULT
                    <div>
                        <Select
                            {...args}
                            className="select-width-50"
                            options={short}
                            title="Sample select"
                        />
                    </div>
                </div>
            </Flex>
            <div>
                Extra long values. DEFAULT Fullscreen
                <div>
                    <Select {...args} width="max" options={extralong} title="Sample select" />
                </div>
            </div>

            <Flex justifyContent="center" style={{marginTop: '20px'}}>
                Enclosed with 100px margin container
            </Flex>
            <Flex gap={10} style={{margin: '0 100px', backgroundColor: 'lightgray'}}>
                <div>
                    Extra long values. FIT
                    <div>
                        <Select
                            {...args}
                            className="select-width-300"
                            options={extralong}
                            popupWidth="fit"
                            title="Sample select"
                        />
                    </div>
                </div>

                <div>
                    Short values. FIT
                    <div>
                        <Select
                            {...args}
                            className="select-width-50"
                            options={short}
                            popupWidth="fit"
                            title="Sample select"
                        />
                    </div>
                </div>
            </Flex>
            <div>
                Extra long values. FIT. Fullscreen
                <div>
                    <Select
                        {...args}
                        width="max"
                        options={extralong}
                        popupWidth="fit"
                        title="Sample select"
                    />
                </div>
            </div>

            <h2>Virtualized</h2>

            <Flex gap={10}>
                <div>
                    Extra long values. DEFAULT.
                    <Text color="danger-heavy"> Not works for virtualized.</Text>
                    <div>
                        <Select
                            {...args}
                            className="select-width-300"
                            options={extralongVirtualized}
                            title="Sample select"
                        />
                    </div>
                </div>
                <div>
                    Short values. DEFAULT. Virtualized (use predefined width: 100px)
                    <div>
                        <Select
                            {...args}
                            className="select-width-50"
                            options={shortVirtualized}
                            title="Sample select"
                        />
                    </div>
                </div>
            </Flex>

            <Flex gap={10}>
                <div>
                    Extra long values. FIT. Virtualized
                    <div>
                        <Select
                            {...args}
                            className="select-width-300"
                            options={extralongVirtualized}
                            popupWidth="fit"
                            title="Sample select"
                        />
                    </div>
                </div>

                <div>
                    Short values. FIT. Virtualized
                    <div>
                        <Select
                            {...args}
                            className="select-width-50"
                            options={shortVirtualized}
                            popupWidth="fit"
                            title="Sample select"
                        />
                    </div>
                </div>
            </Flex>

            <h2>Multi</h2>

            <div>
                <div>Keep popup width while picking</div>
                <Select multiple {...args} options={short} title="Sample select" />
            </div>
        </React.Fragment>
    );
};
