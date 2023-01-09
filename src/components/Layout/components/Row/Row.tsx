import React from 'react';
import {block} from '../../../utils/cn';
import {MediaPartial, Space} from '../../types';
import {useLayoutContext} from '../useLayoutContext';

import './Row.scss';

const b = block('row');

export interface RowProps {
    style?: React.CSSProperties;
    /**
     * Space between children `<Col />` components. Gaps are saved if children go to another line
     *
     * If not specified takes props via `LayoutContext`
     */
    space?: Space | ((medias: MediaPartial<boolean>) => Space | undefined);
    /**
     * Override default (space) vertical gaps between children if it wrap on next line
     */
    spaceRow?: Space | ((medias: MediaPartial<boolean>) => Space | undefined);
    className?: string;
    children?: React.ReactNode;
}

/**
 * Defines the margins between columns (`<Col />`).
 * By default takes all passible props through `LayoutContext`. This props can be overrided by defining props directly in place
 *
 * By default, accepts all possible props via `LayoutContext'.
 * This props can be overriden by defining the prop directly on the jsx
 *
 * Required to use with `<Col />` componet
 *
 * ```tsx
 * import {Row, Col} from '@gravity-ui/uikit';
 *
 * <Row>
 *  <Col>col</Col>
 *  <Col>col</Col>
 * </Row>
 * ```
 */
export const Row = ({children, style, className, space, spaceRow}: RowProps) => {
    const {activeMediasMap, theme} = useLayoutContext();

    return (
        <div
            style={style}
            className={b(
                {
                    s: typeof space === 'function' ? space(activeMediasMap) : space || theme.space,
                    's-r':
                        typeof spaceRow === 'function'
                            ? spaceRow(activeMediasMap)
                            : spaceRow || theme.spaceRow,
                },
                className,
            )}
        >
            {children}
        </div>
    );
};
