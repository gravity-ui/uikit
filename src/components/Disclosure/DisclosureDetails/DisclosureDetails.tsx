'use client';

import * as React from 'react';

import type {QAProps} from '../../types';
import {DisclosureContent} from '../DisclosureContent/DisclosureContent';
import {useDisclosureAttributes} from '../DisclosureContext';
import {DisclosureQa} from '../constants';

export interface DisclosureDetailsProps extends QAProps {
    children: React.ReactNode;
    className?: string;
}

export function DisclosureDetails({children, qa, className}: DisclosureDetailsProps) {
    const {ariaControls, ariaLabelledby, keepMounted, expanded} = useDisclosureAttributes();

    return (
        <DisclosureContent
            name="content"
            visible={expanded}
            keepMounted={keepMounted}
            className={className}
            id={ariaControls}
            role="region"
            aria-labelledby={ariaLabelledby}
            data-qa={qa || DisclosureQa.DETAILS}
        >
            {children}
        </DisclosureContent>
    );
}

DisclosureDetails.displayName = 'DisclosureDetails';
