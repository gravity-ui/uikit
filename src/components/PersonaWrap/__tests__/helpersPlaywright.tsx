import React from 'react';

import type {PersonaWrapProps} from '../PersonaWrap';
import {PersonaWrap} from '../PersonaWrap';

export const TestPersonaWrap = (props: Partial<PersonaWrapProps>) => {
    return (
        <PersonaWrap avatar={<div style={{border: '1px solid black'}}>avatar</div>} {...props}>
            <div style={{border: '1px solid black'}}>content</div>
        </PersonaWrap>
    );
};
