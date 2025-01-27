import type * as React from 'react';

import {Button} from '../../../components';
import type {ButtonProps} from '../../../components';
import {useAsyncActionHandler} from '../useAsyncActionHandler';

export type ProgressButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => PromiseLike<unknown>;
} & Exclude<ButtonProps, 'onClick'>;

export const ProgressButton = (props: ProgressButtonProps) => {
    const {onClick, loading: providedIsLoading} = props;

    const {isLoading, handler: handleClick} = useAsyncActionHandler({handler: onClick});

    return <Button {...props} onClick={handleClick} loading={isLoading || providedIsLoading} />;
};
