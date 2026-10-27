import * as React from 'react';

import {composeStories} from '@storybook/react-webpack5';

import {Suggest} from '../Suggest';
import * as SuggestStoriesModule from '../__stories__/Suggest.stories';

export const SuggestStories = composeStories(SuggestStoriesModule);

const OPTIONS = [{value: 'earth', content: 'Earth'}];

export function SuggestForm({empty = false}: {empty?: boolean}) {
    const [submitCount, setSubmitCount] = React.useState(0);
    const [selectedValue, setSelectedValue] = React.useState('');

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                setSubmitCount((count) => count + 1);
            }}
        >
            <Suggest
                options={empty ? [] : OPTIONS}
                onOptionClick={(option) => setSelectedValue(option.value)}
            />
            <button type="submit">Search</button>
            <output data-qa="submit-count">{submitCount}</output>
            <output data-qa="selected-value">{selectedValue}</output>
        </form>
    );
}
