# FormRow

Base component to place form input and label.

## Usage

```tsx
import type {FC} from 'react';
import {TextInput} from '@gravity-ui/uikit';
import {FormRow} from '@gravity-ui/components';

const nameFieldId = 'form-field-name';

const Form: FC = () => {
  return (
    <>
      <FormRow label={'Name'} fieldId={nameFieldId}>
        <TextInput id={nameFieldId} name={'name'} />
      </FormRow>
    </>
  );
};
```
