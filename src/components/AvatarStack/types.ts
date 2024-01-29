import type React from 'react';

export type AvatarStackOverlapSize = 's' | 'm' | 'l';

export interface AvatarStackProps {
    overlapSize?: AvatarStackOverlapSize;
    className?: string;
    children?: React.ReactNode;
}
