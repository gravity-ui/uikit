import React from 'react';

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
    {
        name: 'base-selection-solid',
        title: 'Selection Solid',
        description: 'Highlight selected objects in menus, calendars, etc.',
    },
    {
        name: 'base-selection-hover-solid',
        title: 'Selection Hover Solid',
        description: 'Hover for Selection Solid.',
    },
];

const specials = [
    {
        name: 'base-special',
        title: 'Special',
        description: 'Background for accented object.',
    },
    {
        name: 'base-special-hover',
        title: 'Special Hover',
        description: 'Hover for Special.',
    },
    {
        name: 'base-action',
        title: 'Action',
        description: 'Background for actions.',
    },
    {
        name: 'base-action-hover',
        title: 'Action Hover',
        description: 'Hover for Action.',
    },
];

const semantic = [
    {
        name: 'base-info',
        title: 'Info',
        description: 'Info semantic background.',
    },
    {
        name: 'base-info-hover',
        title: 'Info Hover',
        description: 'Hover for Info.',
    },
    {
        name: 'base-positive',
        title: 'Positive',
        description: 'Positive semantic background.',
    },
    {
        name: 'base-positive-hover',
        title: 'Positive Hover',
        description: 'Hover for Positive.',
    },
    {
        name: 'base-warning',
        title: 'Warning.',
        description: 'Warning semantic background.',
    },
    {
        name: 'base-warning-hover',
        title: 'Warning Hover',
        description: 'Hover for Warning.',
    },
    {
        name: 'base-danger',
        title: 'Danger',
        description: 'Negative semantic background.',
    },
    {
        name: 'base-danger-hover',
        title: 'Danger Hover',
        description: 'Hover for Danger.',
    },
    {
        name: 'base-misc',
        title: 'Misc',
        description: 'Uncategorized semantic background.',
    },
    {
        name: 'base-misc-hover',
        title: 'Misc Hover',
        description: 'Hover for Misc.',
    },
    {
        name: 'base-neutral',
        title: 'Neutral',
        description: 'Neutral semantic background.',
    },
    {
        name: 'base-neutral-hover',
        title: 'Neutral Hover',
        description: 'Hover for Neutral.',
    },
];

const semanticMedium = [
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
];

const semanticHeavy = [
    {
        name: 'base-info-heavy',
        title: 'Info Heavy',
        description: 'Info semantic background, strong accent.',
    },
    {
        name: 'base-positive-heavy',
        title: 'Positive Heavy',
        description: 'Positive semantic background, strong accent.',
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
        name: 'base-misc-heavy',
        title: 'Misc Heavy',
        description: 'Uncategorized semantic background, strong accent.',
    },
    {
        name: 'base-misc-heavy-hover',
        title: 'Misc Heavy Hover',
        description: 'Hover for Misc Heavy.',
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
            title="Basic elements on the page"
            description="Simple blocks, hovers."
            colors={basic}
            boxBorders={true}
        />
        <ColorPanel
            title="Brand support"
            description="Blue buttons, controls and backgrounds."
            colors={specials}
            boxBorders={true}
        />
        <ColorPanel
            title="Semantic palette"
            description="Colored blocks, states, etc."
            colors={semantic}
        />
        <ColorPanel
            title="Medium semantic palette"
            description="More explicit than Semantic palette."
            colors={semanticMedium}
        />
        <ColorPanel
            title="Heavy semantic palette"
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
            title="Backgrounds"
            description="Backgrounds for popups and floating elements."
            colors={floats}
            boxBorders={true}
        />
    </Showcase>
);
