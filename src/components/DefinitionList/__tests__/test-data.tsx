import {Skeleton} from '../../Skeleton';
import {DefinitionList} from '../DefinitionList';
import type {DefinitionListItemProps} from '../types';

// Create stable skeleton-based items for visual tests
// Using varied dimensions to demonstrate different component behaviors
export const skeletonItems: DefinitionListItemProps[] = [
    // Short items
    {
        name: <Skeleton style={{width: 60, height: 20}} animation="none" />,
        children: <Skeleton style={{width: 80, height: 20}} animation="none" />,
    },
    // Medium items
    {
        name: <Skeleton style={{width: 120, height: 20}} animation="none" />,
        children: <Skeleton style={{width: 200, height: 20}} animation="none" />,
    },
    // Long name, short value
    {
        name: <Skeleton style={{width: 250, height: 20}} animation="none" />,
        children: <Skeleton style={{width: 50, height: 20}} animation="none" />,
    },
    // Short name, long value
    {
        name: <Skeleton style={{width: 80, height: 20}} animation="none" />,
        children: <Skeleton style={{width: 350, height: 20}} animation="none" />,
    },
    // Multi-line simulation (taller skeleton)
    {
        name: <Skeleton style={{width: 150, height: 20}} animation="none" />,
        children: <Skeleton style={{width: 300, height: 40}} animation="none" />,
    },
    // Very long items (to show truncation/wrapping)
    {
        name: <Skeleton style={{width: 400, height: 20}} animation="none" />,
        children: <Skeleton style={{width: 500, height: 20}} animation="none" />,
    },
    // Avatar-like (square) item
    {
        name: <Skeleton style={{width: 40, height: 40, borderRadius: '50%'}} animation="none" />,
        children: <Skeleton style={{width: 150, height: 20}} animation="none" />,
    },
    // Standard items
    {
        name: <Skeleton style={{width: 100, height: 20}} animation="none" />,
        children: <Skeleton style={{width: 180, height: 20}} animation="none" />,
    },
    {
        name: <Skeleton style={{width: 90, height: 20}} animation="none" />,
        children: <Skeleton style={{width: 160, height: 20}} animation="none" />,
    },
    {
        name: <Skeleton style={{width: 110, height: 20}} animation="none" />,
        children: <Skeleton style={{width: 140, height: 20}} animation="none" />,
    },
];

// Extended set with 24 items to match original test data count
export const extendedSkeletonItems: DefinitionListItemProps[] = [
    ...skeletonItems,
    ...skeletonItems, // Duplicate to get 20 items
    {
        name: <Skeleton style={{width: 95, height: 20}} animation="none" />,
        children: <Skeleton style={{width: 165, height: 20}} animation="none" />,
    },
    {
        name: <Skeleton style={{width: 105, height: 20}} animation="none" />,
        children: <Skeleton style={{width: 145, height: 20}} animation="none" />,
    },
    {
        name: <Skeleton style={{width: 125, height: 20}} animation="none" />,
        children: <Skeleton style={{width: 175, height: 20}} animation="none" />,
    },
    {
        name: <Skeleton style={{width: 75, height: 20}} animation="none" />,
        children: <Skeleton style={{width: 185, height: 20}} animation="none" />,
    },
];

// Function to create skeleton items dynamically
export function createSkeletonItems(count: number): DefinitionListItemProps[] {
    return Array.from({length: count}, (_, i) => ({
        name: <Skeleton style={{width: 80 + (i % 7) * 10, height: 20}} animation="none" />,
        children: <Skeleton style={{width: 120 + (i % 5) * 20, height: 20}} animation="none" />,
    }));
}

// Wrapped skeleton items for DefinitionList.Item components
export const definitionListSkeletonItems = extendedSkeletonItems.map(
    ({children, ...rest}, index) => (
        <DefinitionList.Item key={index} {...rest}>
            {children}
        </DefinitionList.Item>
    ),
);
