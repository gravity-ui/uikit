import * as React from 'react';

import {ArrowsRotateRight} from '@gravity-ui/icons';
import chroma from 'chroma-js';

import {
    Button,
    Card,
    Checkbox,
    ClipboardButton,
    Icon,
    Link,
    Loader,
    Radio,
    Spin,
    Switch,
    Tab,
    TabList,
    Table,
    withTableSelection,
} from '../../../components';
import {cn} from '../../../components/utils/cn';

import './BrandingConfigurator.scss';

export interface BrandingConfiguratorProps {
    theme: string;
}

const SelectionTable = withTableSelection(Table);

const b = cn('branding-configurator');
const variables = [
    '--g-color-base-brand',
    '--g-color-base-brand-hover',
    '--g-color-base-selection',
    '--g-color-base-selection-hover',
    '--g-color-line-brand',
    '--g-color-text-brand',
    '--g-color-text-brand-contrast',
    '--g-color-text-link',
    '--g-color-text-link-hover',
];

function getInitialBrandColor() {
    return chroma.random().hex();
}

function getInitialValues() {
    const rootStyle = window.getComputedStyle(document.body);
    return variables.reduce(
        (res, name) => {
            res[name] = rootStyle.getPropertyValue(name);
            return res;
        },
        {} as Record<string, string>,
    );
}

export function BrandingConfigurator({theme}: BrandingConfiguratorProps) {
    const [brandColor, setBrandColor] = React.useState(getInitialBrandColor);
    const [paletteColors, setPaletteColors] = React.useState<string[]>([]);
    const [values, setValues] = React.useState(getInitialValues);

    const [activeTab, setActiveTab] = React.useState('overview');
    const [selectedIds, setSelectedIds] = React.useState(['1']);

    const resultText = React.useMemo(() => {
        return `
.g-root_theme_${theme} {
    ${Object.entries(values)
        .map(([name, value]) => `${name}: ${value};`)
        .join('\n    ')}
}
        `.trim();
    }, [theme, values]);

    React.useEffect(() => {
        setBrandColor(getInitialBrandColor());
        setValues(getInitialValues());
    }, [theme]);

    React.useEffect(() => {
        const colors: string[] = chroma
            .scale(['#fff', brandColor, '#333'])
            .correctLightness()
            .colors(18)
            .slice(1, -1);
        const offset = theme.startsWith('dark') ? colors.length - 1 : 0;

        setPaletteColors(colors.slice(1, -1));
        setValues({
            '--g-color-base-brand': colors[7],
            '--g-color-base-brand-hover': colors[8],
            '--g-color-base-selection': colors[Math.abs(0 - offset)],
            '--g-color-base-selection-hover': colors[Math.abs(1 - offset)],
            '--g-color-line-brand': colors[7],
            '--g-color-text-brand': colors[Math.abs(10 - offset)],
            '--g-color-text-brand-heavy': colors[Math.abs(12 - offset)],
            '--g-color-text-link': colors[Math.abs(10 - offset)],
            '--g-color-text-link-hover': colors[Math.abs(12 - offset)],
        });
    }, [theme, brandColor]);

    const handleRandomClick = () => {
        setBrandColor(getInitialBrandColor());
    };

    return (
        <div className={b()}>
            <div className={b('title')}>Palette</div>
            <div className={b('palette')}>
                <div className={b('random-color')}>
                    <Button
                        view="outlined"
                        size="xl"
                        onClick={handleRandomClick}
                        aria-label="Regenerate colors"
                    >
                        <Icon data={ArrowsRotateRight} size={20} />
                    </Button>
                </div>
                <div className={b('colors')}>
                    {paletteColors.map((color, i) => (
                        <div key={i} className={b('color')} style={{backgroundColor: color}} />
                    ))}
                </div>
            </div>
            <div className={b('title')}>Preview</div>
            <div className={b('components')} style={values}>
                <div className={b('components-title')}>Links</div>
                <div className={b('components-content')} style={{maxWidth: 300}}>
                    <span>
                        Lorem ipsum dolor sit amet, <Link href="#a">consectetur</Link> adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis <Link href="#b">nostrud</Link> exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </span>
                </div>
                <div className={b('components-title')}>Buttons</div>
                <div className={b('components-content')}>
                    <Button view="action">Action</Button>
                    <Button view="action" loading>
                        Loading
                    </Button>
                    <Button selected>Selected</Button>
                </div>
                <div className={b('components-title')}>Form Controls</div>
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
                    <TabList value={activeTab} onUpdate={setActiveTab}>
                        <Tab value="overview">Overview</Tab>
                        <Tab value="settings">Settings</Tab>
                    </TabList>
                </div>
                <div className={b('components-title')}>Table</div>
                <div className={b('components-content')}>
                    <SelectionTable
                        columns={[
                            {id: 'name', name: 'Name'},
                            {id: 'age', name: 'Age'},
                            {id: 'occupation', name: 'Occupation'},
                        ]}
                        data={[
                            {name: 'Alice', age: '20', occupation: 'Designer'},
                            {name: 'Bob', age: '22', occupation: 'Engineer'},
                            {name: 'Eve', age: '21', occupation: 'Florist'},
                        ]}
                        selectedIds={selectedIds}
                        onSelectionChange={setSelectedIds}
                        onRowClick={() => {}}
                    />
                </div>
            </div>
            <div className={b('title')}>Result Code</div>
            <div className={b('result')}>
                <Card view="filled" theme="normal" className={b('result-card')}>
                    <div className={b('result-text')}>{resultText}</div>
                    <ClipboardButton text={resultText} size="xs" className={b('result-copy')} />
                </Card>
            </div>
        </div>
    );
}
