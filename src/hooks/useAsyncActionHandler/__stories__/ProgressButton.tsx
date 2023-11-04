import React from 'react';

import {Button, ButtonProps} from '../../../components';
import {useAsyncActionHandler} from '../useAsyncActionHandler';

export type ProgressButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => Promise<unknown>;
} & Exclude<ButtonProps, 'onClick'>;

export const ProgressButton = (props: ProgressButtonProps) => {
    const {onClick, loading: providedIsLoading} = props;

    const [isLoading, handleClick] = useAsyncActionHandler(onClick);

    return <Button {...props} onClick={handleClick} loading={isLoading || providedIsLoading} />;
};
