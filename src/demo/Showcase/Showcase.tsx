import React, {FC, ReactNode} from 'react';
import block from 'bem-cn-lite';
import './Showcase.scss';

interface Props {
    title: string;
    description?: ReactNode;
    className?: string;
}

const b = block('showcase');

export const Showcase: FC<Props> = ({title, description, className, children}) => {
    return (
        <div className={b(null, className)}>
            <div className={b('title')}>{title}</div>
            <div className={b('description')}>{description}</div>
            <div className={b('content')}>{children}</div>
        </div>
    );
};
