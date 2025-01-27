import * as React from 'react';

import {ProgressButton} from './ProgressButton';
import {cnUseAsyncActionHandlerDemo} from './UseAsyncActionHandlerDemo.classname';

import './UseAsyncActionHandlerDemo.scss';

export const UseAsyncActionHandlerDemo = () => {
    const [items, setItems] = React.useState<string[]>([]);

    const handleLoadItems = React.useCallback(async () => {
        const loadItems = () =>
            new Promise<string[]>((resolve) => {
                setTimeout(() => {
                    resolve(
                        Array.from(
                            {length: 10},
                            (_item, index) =>
                                `Item ${Math.round(Math.random() * 100 * (index + 1))}`,
                        ),
                    );
                }, 1000);
            });

        try {
            setItems(await loadItems());
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <div className={cnUseAsyncActionHandlerDemo()}>
            <ProgressButton onClick={handleLoadItems}>Load items</ProgressButton>
            <ul>
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
};
