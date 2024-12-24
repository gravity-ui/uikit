import {Showcase} from '../Showcase';

import {ColorPanel} from './ColorPanel';

const basic = [
    {
        name: 'base-background',
        title: 'Background',
        description: "Page's background.",
    },
    {
        name: 'base-generic',
        title: 'Generic',
        description: 'Generic gray base, buttons and other objects.',
    },
    {
        name: 'base-generic-hover',
        title: 'Generic Hover',
        description: 'Hover for Generic.',
    },
    {
        name: 'base-generic-medium',
        title: 'Generic Medium',
        description: 'Neutral blocks with medium contrast.',
    },
    {
        name: 'base-generic-medium-hover',
        title: 'Generic Medium Hover',
        description: 'Hover for Generic Medium.',
    },
    {
        name: 'base-generic-accent',
        title: 'Generic Accent',
        description: 'Background for controls (checkbox, radio, etc.).',
    },
    {
        name: 'base-generic-accent-disabled',
        title: 'Generic Accent Disabled',
        description: 'Disabled background for controls.',
    },
    {
        name: 'base-generic-ultralight',
        title: 'Generic Ultralight',
        description: 'Background with minimal contrast. Not recommended to use.',
    },
    {
        name: 'base-simple-hover',
        title: 'Simple Hover',
        description: 'Hover for transparent objects (works over light backgrounds).',
    },
    {
        name: 'base-simple-hover-solid',
        title: 'Simple Hover Solid',
        description: 'Hover for transparent objects (works over light backgrounds).',
    },
];

const specials = [
    {
        name: 'base-brand',
        title: 'Brand',
        description: 'Background for accented object.',
    },
    {
        name: 'base-brand-hover',
        title: 'Brand Hover',
        description: 'Hover for Brand.',
    },
    {
        name: 'base-selection',
        title: 'Selection',
        description: 'Highlight selected objects in menus, calendars, etc.',
    },
    {
        name: 'base-selection-hover',
        title: 'Selection Hover',
        description: 'Hover for Selection.',
    },
];

const semanticLight = [
    {
        name: 'base-info-light',
        title: 'Info Light',
        description: 'Info semantic background.',
    },
    {
        name: 'base-info-light-hover',
        title: 'Info Light Hover',
        description: 'Hover for Info.',
    },
    {
        name: 'base-positive-light',
        title: 'Positive Light',
        description: 'Positive semantic background.',
    },
    {
        name: 'base-positive-light-hover',
        title: 'Positive Light Hover',
        description: 'Hover for Positive.',
    },
    {
        name: 'base-warning-light',
        title: 'Warning Light.',
        description: 'Warning semantic background.',
    },
    {
        name: 'base-warning-light-hover',
        title: 'Warning Light Hover',
        description: 'Hover for Warning.',
    },
    {
        name: 'base-danger-light',
        title: 'Danger Light',
        description: 'Negative semantic background.',
    },
    {
        name: 'base-danger-light-hover',
        title: 'Danger Light Hover',
        description: 'Hover for Danger.',
    },
    {
        name: 'base-utility-light',
        title: 'Utility Light',
        description: 'Utility semantic background.',
    },
    {
        name: 'base-utility-light-hover',
        title: 'Utility Light Hover',
        description: 'Hover for Utility.',
    },
    {
        name: 'base-misc-light',
        title: 'Misc Light',
        description: 'Uncategorized semantic background.',
    },
    {
        name: 'base-misc-light-hover',
        title: 'Misc Light Hover',
        description: 'Hover for Misc.',
    },
    {
        name: 'base-neutral-light',
        title: 'Neutral Light',
        description: 'Neutral semantic background.',
    },
    {
        name: 'base-neutral-light-hover',
        title: 'Neutral Light Hover',
        description: 'Hover for Neutral.',
    },
];

const semanticMedium = [
    {
        name: 'base-info-medium',
        title: 'Info Medium',
        description: 'Info semantic background, medium accent.',
    },
    {
        name: 'base-info-medium-hover',
        title: 'Info Medium Hover',
        description: 'Hover for Info Medium.',
    },
    {
        name: 'base-positive-medium',
        title: 'Positive Medium',
        description: 'Positive semantic background, medium accent.',
    },
    {
        name: 'base-positive-medium-hover',
        title: 'Positive Medium Hover',
        description: 'Hover for Positive Medium.',
    },
    {
        name: 'base-warning-medium',
        title: 'Warning Medium',
        description: 'Warning semantic background, medium accent.',
    },
    {
        name: 'base-warning-medium-hover',
        title: 'Warning Medium Hover',
        description: 'Hover for Warning Medium.',
    },
    {
        name: 'base-danger-medium',
        title: 'Danger Medium',
        description: 'Danger semantic background, medium accent.',
    },
    {
        name: 'base-danger-medium-hover',
        title: 'Danger Medium Hover',
        description: 'Hover for Danger Medium.',
    },
    {
        name: 'base-utility-medium',
        title: 'Utility Medium',
        description: 'Utility semantic background, medium accent.',
    },
    {
        name: 'base-utility-medium-hover',
        title: 'Utility Medium Hover',
        description: 'Hover for Utility Medium.',
    },
    {
        name: 'base-misc-medium',
        title: 'Misc Medium',
        description: 'Uncategorized semantic background, medium accent.',
    },
    {
        name: 'base-misc-medium-hover',
        title: 'Misc Medium Hover',
        description: 'Hover for Misc Medium.',
    },
    {
        name: 'base-neutral-medium',
        title: 'Neutral Medium',
        description: 'Neutral semantic background, medium accent.',
    },
    {
        name: 'base-neutral-medium-hover',
        title: 'Neutral Medium Hover',
        description: 'Hover for Neutral Medium.',
    },
];

const semanticHeavy = [
    {
        name: 'base-info-heavy',
        title: 'Info Heavy',
        description: 'Info semantic background, strong accent.',
    },
    {
        name: 'base-info-heavy-hover',
        title: 'Info Heavy Hover',
        description: 'Hover for Info Heavy.',
    },
    {
        name: 'base-positive-heavy',
        title: 'Positive Heavy',
        description: 'Positive semantic background, strong accent.',
    },
    {
        name: 'base-positive-heavy-hover',
        title: 'Positive Heavy Hover',
        description: 'Hover for Positive Heavy.',
    },
    {
        name: 'base-warning-heavy',
        title: 'Warning Heavy',
        description: 'Warning semantic background, strong accent.',
    },
    {
        name: 'base-warning-heavy-hover',
        title: 'Warning Heavy Hover',
        description: 'Hover for Warning Heavy.',
    },
    {
        name: 'base-danger-heavy',
        title: 'Danger Heavy',
        description: 'Negative semantic background, strong accent.',
    },
    {
        name: 'base-danger-heavy-hover',
        title: 'Danger Heavy Hover',
        description: 'Hover for Danger Heavy',
    },
    {
        name: 'base-utility-heavy',
        title: 'Utility Heavy',
        description: 'Utility semantic background, strong accent.',
    },
    {
        name: 'base-utility-heavy-hover',
        title: 'Utility Heavy Hover',
        description: 'Hover for Utility Heavy.',
    },
    {
        name: 'base-misc-heavy',
        title: 'Misc Heavy',
        description: 'Uncategorized semantic background, strong accent.',
    },
    {
        name: 'base-misc-heavy-hover',
        title: 'Misc Heavy Hover',
        description: 'Hover for Misc Heavy.',
    },
    {
        name: 'base-neutral-heavy',
        title: 'Neutral Heavy',
        description: 'Neutral semantic background, strong accent.',
    },
    {
        name: 'base-neutral-heavy-hover',
        title: 'Neutral Heavy Hover',
        description: 'Hover for Neutral Heavy.',
    },
];

const alwaysLight = [
    {
        name: 'base-light',
        title: 'Light',
        description: 'Background on top of another darker background.',
    },
    {
        name: 'base-light-hover',
        title: 'Light Hover',
        description: 'Hover for Light.',
    },
    {
        name: 'base-light-simple-hover',
        title: 'Light Simple Hover',
        description: 'Hover for transparent objects (works over dark backgrounds).',
    },
    {
        name: 'base-light-disabled',
        title: 'Light Disabled',
        description: 'Disabled controls.',
    },
    {
        name: 'base-light-accent-disabled',
        title: 'Light Accent Disabled',
        description: 'Disabled active controls.',
    },
];

const floats = [
    {
        name: 'base-float',
        title: 'Float',
        description: 'Raised layers background.',
    },
    {
        name: 'base-float-hover',
        title: 'Float Hover',
        description: 'Hover for Float.',
    },
    {
        name: 'base-float-medium',
        title: 'Float Medium',
        description: 'Float for medium contrast.',
    },
    {
        name: 'base-float-heavy',
        title: 'Float Heavy',
        description: 'Float for strong contrast.',
    },
    {
        name: 'base-float-accent',
        title: 'Float Accent',
        description: 'Raised controls.',
    },
    {
        name: 'base-float-accent-hover',
        title: 'Float Accent Hover',
        description: 'Hover for Float Accent.',
    },
    {
        name: 'base-modal',
        title: 'Modal',
        description: 'Floating components with a veil.',
    },
];

export const RenderBackgrounds = () => (
    <Showcase title="Backgrounds and underlays" description="Blocks, zones, elements">
        <ColorPanel
            title="Basic"
            description="Basic elements on the page. Simple blocks, hovers."
            colors={basic}
            boxBorders={true}
        />
        <ColorPanel
            title="Brand"
            description="Brand buttons, controls and backgrounds."
            colors={specials}
            boxBorders={true}
        />
        <ColorPanel
            title="Light Semantic"
            description="Colored blocks, states, etc."
            colors={semanticLight}
        />
        <ColorPanel
            title="Medium semantic"
            description="More explicit than Semantic palette."
            colors={semanticMedium}
        />
        <ColorPanel
            title="Heavy semantic"
            description="Even more explicit than Semantic palette."
            colors={semanticHeavy}
        />
        <ColorPanel
            title="Always light"
            description="Underlays and controls in dark background."
            colors={alwaysLight}
            boxBorders={true}
        />
        <ColorPanel
            title="Floats"
            description="Backgrounds for popups and floating elements."
            colors={floats}
            boxBorders={true}
        />
    </Showcase>
);
