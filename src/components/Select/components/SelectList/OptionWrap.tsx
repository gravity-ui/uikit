import type * as React from 'react';

import {block} from '../../../utils/cn';
import type {SelectOption} from '../../types';

const b = block('select-list');

type DefaultOptionProps = {
    option: SelectOption;
};

type OptionWrapProps = {
    renderOption?: (option: SelectOption) => React.ReactElement;
    option: SelectOption;
};

const DefaultOption = ({option}: DefaultOptionProps) => {
    const {content, children, title} = option;
    return (
        <span title={title} className={b('option-default-label')}>
            {content || children}
        </span>
    );
};

/**
 * The content of a row: the check mark of a multiple selection and the states of the row belong to
 * the view of the List, this is the `qa` of the option and its text
 */
export const OptionWrap = (props: OptionWrapProps) => {
    const {renderOption, option} = props;

    return (
        <div data-qa={option.qa} className={b('option')}>
            {renderOption ? renderOption(option) : <DefaultOption option={option} />}
        </div>
    );
};
