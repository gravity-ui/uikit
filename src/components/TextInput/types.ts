import React from 'react';
import {DOMProps, QAProps} from '../types';

export type TextInputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type TextInputView = 'normal' | 'clear';

export type TextInputSize = 's' | 'm' | 'l' | 'xl';

export type TextInputPin =
    | 'round-round'
    | 'brick-brick'
    | 'clear-clear'
    | 'round-brick'
    | 'brick-round'
    | 'round-clear'
    | 'clear-round'
    | 'brick-clear'
    | 'clear-brick';

export type TextInputState = 'error';

export interface TextInputProps extends DOMProps, QAProps {
    view?: TextInputView;
    size?: TextInputSize;
    pin?: TextInputPin;
    id?: string;
    tabIndex?: number;
    name?: string; // HTML-атрибут name, если не передан должен быть сгенерирован автоматически
    value?: string; // значение
    defaultValue?: string;
    disabled?: boolean;
    placeholder?: string;
    hasClear?: boolean; // кнопка очистки
    note?: string; // вспомогательный текст справа
    autoFocus?: boolean;
    autoComplete?: boolean | 'on' | 'off' | string;
    error?: string | boolean; // ошибка валидации
    multiline?: boolean;
    type?: string; // text, password и т.д.
    rows?: number; // Количество строк textarea, если не указано, будет автовысота от контента
    minRows?: number; // Ограничение при автовысоте
    maxRows?: number; // Ограничение при автовысоте
    onUpdate?: (value: string) => void;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onKeyPress?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    controlRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
    controlProps?:
        | React.InputHTMLAttributes<HTMLInputElement>
        | React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}
