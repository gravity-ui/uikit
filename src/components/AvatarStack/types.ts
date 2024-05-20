import type React from 'react';

export type AvatarStackOverlapSize = 's' | 'm' | 'l';

export interface AvatarStackProps {
    /** Amount of avatars to be shown before more button. Default 3. */
    max?: number;
    overlapSize?: AvatarStackOverlapSize;
    className?: string;
    children?: React.ReactNode;
}
