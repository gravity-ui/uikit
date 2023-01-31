import React, {useState, useRef, useEffect} from 'react';

import {block} from '../utils/cn';
import {Loader} from '../Loader';
import {useIntersection} from './hooks/useIntersection';

import './InfiniteScroll.scss';

export interface InfiniteScrollProps {
    /** When called shows loader and wait till the promise is fulfilled to hide loader */
    onActivate: () => Promise<void>;
    /** Turn off activation */
    disabled: boolean;
    children: React.ReactNode;
    /** Custom loader */
    loader?: React.ReactNode;
}

const b = block('infinite-scroll');

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
    onActivate,
    disabled,
    children,
    loader,
}) => {
    const [isActive, setIsActive] = useState(false);
    const [bottomRef, setBottomRef] = useState<HTMLDivElement | null>(null);
    const mounted = useRef(false);
    const isBottomVisible = useIntersection(bottomRef);

    useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        const handleFetchData = async () => {
            setIsActive(true);
            await onActivate();

            if (mounted.current) {
                setIsActive(false);
            }
        };

        if (isBottomVisible && !isActive && !disabled) {
            handleFetchData();
        }
    }, [isBottomVisible, onActivate, isActive, disabled]);

    const renderedLoader = loader || (
        <div className={b('loader')}>
            <Loader size="l" />
        </div>
    );

    return (
        <>
            {children}

            {isActive && renderedLoader}

            <div className={b('intersector')} ref={setBottomRef} />
        </>
    );
};
