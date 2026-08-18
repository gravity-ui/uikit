'use client';

import * as React from 'react';

import type {QAProps} from '../../types';
import {DisclosureContent} from '../DisclosureContent/DisclosureContent';
import {useDisclosureAttributes} from '../DisclosureContext';
import {DisclosureQa} from '../constants';

export interface DisclosureCollapsedDetailsProps extends QAProps {
    children: React.ReactNode;
    className?: string;
}

export function DisclosureCollapsedDetails({
    children,
    qa,
    className,
}: DisclosureCollapsedDetailsProps) {
    const {expanded, keepMounted} = useDisclosureAttributes();
    const visible = !expanded;

    return (
        <DisclosureContent
            name="collapsed-content"
            visible={visible}
            keepMounted={keepMounted}
            className={className}
            aria-hidden={!visible}
            data-qa={qa || DisclosureQa.COLLAPSED_DETAILS}
        >
            {children}
        </DisclosureContent>
    );
}

DisclosureCollapsedDetails.displayName = 'DisclosureCollapsedDetails';
