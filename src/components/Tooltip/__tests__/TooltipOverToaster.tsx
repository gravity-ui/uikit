import * as React from 'react';

import {Button} from '../../Button';
import {ToasterComponent} from '../../Toaster/ToasterComponent/ToasterComponent';
import {useToaster} from '../../Toaster/hooks/useToaster';
import {Tooltip} from '../Tooltip';

import {TooltipQA} from './constants';

const overlapToastName = 'tooltip-over-toaster';

export function TooltipOverToaster() {
    const {add, remove} = useToaster();

    React.useEffect(() => {
        add({
            name: overlapToastName,
            title: 'Toast notification',
            content: (
                <Tooltip
                    open
                    placement="right"
                    content="Tooltip above toast"
                    qa={TooltipQA.overlapTooltip}
                >
                    <Button>Details</Button>
                </Tooltip>
            ),
            theme: 'info',
            autoHiding: false,
            isClosable: false,
        });

        return () => remove(overlapToastName);
    }, [add, remove]);

    return <ToasterComponent />;
}
