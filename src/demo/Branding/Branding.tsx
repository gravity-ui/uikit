import React from 'react';
import block from 'bem-cn-lite';

import {
    Button,
    Switch,
    Checkbox,
    Radio,
    Loader,
    Spin,
    Tabs,
    Table,
    withTableSelection,
} from '../../components';

import './Branding.scss';

const b = block('branding');
const bRoot = block('yc-root');
const SelectionTable = withTableSelection(Table);

export interface BrandingProps {
    brand?: string;
}

export function Branding({brand}: BrandingProps) {
    const [selectedIds, setSelectedIds] = React.useState(['1']);

    function renderColors(solid = false) {
        return Array.from({length: 11}).map((_, i) => {
            const varAlpha = 1000 - i * (i === 10 ? 95 : 100);
            const varName = `--yc-color-private-brand-${varAlpha}${solid ? '-solid' : ''}`;

            return (
                <div
                    key={i}
                    className={b('palette-color')}
                    style={{
                        background: `var(${varName})`,
                    }}
                />
            );
        });
    }

    return (
        <div className={b()}>
            <section className={b('section')}>
                <header className={b('section-header')}>Color Palette</header>
                <div className={b('section-content')}>
                    <div className={b('palette', bRoot({theme: 'light', brand}))}>
                        <div className={b('palette-title')}>Alpha</div>
                        {renderColors()}
                        <div className={b('palette-title')}>Solid</div>
                        {renderColors(true)}
                    </div>
                    <div className={b('palette', bRoot({theme: 'dark', brand}))}>
                        <div className={b('palette-title')}>Alpha</div>
                        {renderColors()}
                        <div className={b('palette-title')}>Solid</div>
                        {renderColors(true)}
                    </div>
                </div>
            </section>
            <section className={b('section')}>
                <header className={b('section-header')}>Components</header>
                <div className={b('section-content')}>
                    <div className={b('components')}>
                        <div className={b('components-title')}>Main Button</div>
                        <div className={b('components-content')}>
                            <Button view="action">Action</Button>
                            <Button view="action" loading>
                                Loading
                            </Button>
                            <Button selected>Selected</Button>
                        </div>
                        <div className={b('components-title')}>Switch/Checkbox/Radio</div>
                        <div className={b('components-content')}>
                            <Switch defaultChecked />
                            <Checkbox size="l" defaultChecked />
                            <Radio size="l" value="" defaultChecked />
                        </div>
                        <div className={b('components-title')}>Async State</div>
                        <div className={b('components-content')}>
                            <Loader size="m" />
                            <Spin />
                        </div>
                        <div className={b('components-title')}>Tabs</div>
                        <div className={b('components-content')}>
                            <Tabs
                                items={[
                                    {id: 'overview', title: 'Overview'},
                                    {id: 'settings', title: 'Settings'},
                                ]}
                            />
                        </div>
                        <div className={b('components-title')}>Table</div>
                        <div className={b('components-content')}>
                            <SelectionTable
                                columns={[
                                    {id: 'name', name: 'Name'},
                                    {id: 'age', name: 'Age'},
                                ]}
                                data={[
                                    {name: 'Alice', age: '20'},
                                    {name: 'Bob', age: '22'},
                                    {name: 'Eve', age: '21'},
                                ]}
                                selectedIds={selectedIds}
                                onSelectionChange={setSelectedIds}
                                onRowClick={() => {}}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
