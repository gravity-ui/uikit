<!--GITHUB_BLOCK-->

# Select

<!--/GITHUB_BLOCK-->

```tsx
import {Select} from '@gravity-ui/uikit';
```

Компонент `Select` — это контрол, который предоставляет список опций для выбора.

> [!NOTE]
> В v8 опции рисует новый список. Что изменилось для потребителя, собрано в
> [миграционном гайде](./migration-guide.md) (на английском).

## `Options`

Опции для выбора.

### Определение опций

Опции можно определять в виде массива объектов или в качестве дочерних элементов компонента. Первый способ подходит для случаев, когда опции требуют сложной подготовки и, возможно, запоминания. Второй способ удобен, когда опций немного и их настройка не требует сложных вычислений.

#### Одноуровневый список

<!--SANDBOX
import {Flex, Select} from '@gravity-ui/uikit';

const options = [
    {value: 'val_1', content: 'Value 1'},
    {value: 'val_2', content: 'Value 2'},
    {value: 'val_3', content: 'Value 3'},
    {value: 'val_4', content: 'Value 4'},
];

export default function () {
    return (
        <>
            <Flex gap={1} alignItems="center">
                Array of objects
                <Select placeholder="value" options={options} />
            </Flex>
            <Flex gap={1} alignItems="center">
                Child nodes
                <Select placeholder="value">
                    <Select.Option value="val_1">Value 1</Select.Option>
                    <Select.Option value="val_2">Value 2</Select.Option>
                    <Select.Option value="val_3">Value 3</Select.Option>
                    <Select.Option value="val_4">Value 4</Select.Option>
                </Select>
            </Flex>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
// Array of objects
<Select
  options={[
    {value: 'val_1', content: 'Value 1'},
    {value: 'val_2', content: 'Value 2'},
    {value: 'val_3', content: 'Value 3'},
    {value: 'val_4', content: 'Value 4'},
  ]}
/>
// Child nodes
<Select>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
```

<!--/GITHUB_BLOCK-->

#### Текст опции

Текст опции — это то, что триггер показывает для выбранной опции, то, с чем сравнивает фильтр, и то,
по чему идёт поиск по первым буквам. По умолчанию это содержимое опции, если оно строка или число, её дети, если
строка или число — они, и `value` в остальных случаях — поэтому опции, которые рендерят что-то кроме простой строки, нужен
`getOptionText`, иначе её будут искать и подписывать по значению.

<!--GITHUB_BLOCK-->

```tsx
import {Flex, Icon, Select, getSelectOptionText} from '@gravity-ui/uikit';

<Select
  options={cities}
  renderOption={(option) => (
    <Flex gap={1}>
      <Icon data={option.data.icon} />
      {option.data.name}
    </Flex>
  )}
  // опции списка не всегда одной формы: `getSelectOptionText` — это дефолт,
  // так что опции без `data` сохраняют прежний текст
  getOptionText={(option) => option.data?.name ?? getSelectOptionText(option)}
/>;
```

<!--/GITHUB_BLOCK-->

`useSelectOptions` принимает то же свойство: передайте его и туда, если фильтруете опции снаружи
компонента. Объявляйте функцию вне компонента или мемоизируйте её — она участвует в мемоизации
списка, и новая функция на каждый рендер пересобирает строки.

`getOptionText` заменяет свойство `text` у опции, которого больше нет: текст опции теперь
запрашивают, а не хранят, и одна функция закрывает все опции вместо поля, повторённого в каждой.

`value` опции — идентификатор её строки, поэтому значения должны быть уникальными в пределах всего
списка, включая группы. Из него же выводится DOM-`id` строки, и именно на этот id указывает
`aria-activedescendant` триггера — берите его оттуда, а не собирайте руками: экранирование значения
принадлежит списку и контрактом не является.

#### Группированный список

Заголовок группы — это подпись, а не опция: у него `role="presentation"`, он не участвует в обходе
с клавиатуры и не попадает в число строк с `role="option"`, а опции под ним описывает через
`aria-describedby`. Группа с пустым `label` рисует разделительную линию вместо заголовка — первой строкой списка ей нечего разделять, и места она не занимает вовсе. Так группа рисуется по умолчанию: `renderOptionGroup` и `getOptionGroupHeight` спрашивают раньше и рисуют и меряют что угодно, с пустым `label` или без.

<!--SANDBOX
import {Flex, Select} from '@gravity-ui/uikit';

const groupedOptions = [
    {
        label: 'Group 1',
        options: [
            {value: 'val_1', content: 'Value 1'},
            {value: 'val_2', content: 'Value 2'},
        ],
    },
    {
        label: 'Group 2',
        options: [
            {value: 'val_3', content: 'Value 3'},
            {value: 'val_4', content: 'Value 4'},
        ],
    },
];

export default function () {
    return (
        <>
            <Flex gap={1} alignItems="center">
                Array of objects
                <Select placeholder="value" options={groupedOptions} />
            </Flex>
            <Flex gap={1} alignItems="center">
                Child nodes
                <Select placeholder="value">
                    <Select.OptionGroup label="Group 1">
                        <Select.Option value="val_1" content="Value 1" />
                        <Select.Option value="val_2" content="Value 2" />
                    </Select.OptionGroup>
                    <Select.OptionGroup label="Group 2">
                        <Select.Option value="val_3" content="Value 3" />
                        <Select.Option value="val_4" content="Value 4" />
                    </Select.OptionGroup>
                </Select>
            </Flex>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
// Array of objects
<Select
  options={[
    {
      label: 'Group 1',
      options: [
        {value: 'val_1', content: 'Value 1'},
        {value: 'val_2', content: 'Value 2'},
      ],
    },
    {
      label: 'Group 2',
      options: [
        {value: 'val_3', content: 'Value 3'},
        {value: 'val_4', content: 'Value 4'},
      ],
    },
  ]}
/>
// Child nodes
<Select>
  <Select.OptionGroup label="Group 1">
    <Select.Option value="val_1" content="Value 1" />
    <Select.Option value="val_2" content="Value 2" />
  </Select.OptionGroup>
  <Select.OptionGroup label="Group 2">
    <Select.Option value="val_3" content="Value 3" />
    <Select.Option value="val_4" content="Value 4" />
  </Select.OptionGroup>
</Select>
```

<!--/GITHUB_BLOCK-->

### Хранение данных в опциях

С помощью свойства `option.data` можно определить и сохранить уникальные данные в каждой опции. Это может быть полезно при необходимости обогащения данных с использованием обратного вызова `onUpdate` или, например, при отрисовке опций с помощью `renderOption`.

## Выбор нескольких опций

Чтобы включить множественный выбор, используйте свойство `multiple`. Значение по умолчанию — `false`.

<!--SANDBOX
import {Select} from '@gravity-ui/uikit';

export default function () {
    return (
        <Select multiple placeholder="values">
            <Select.Option value="val_1">Value 1</Select.Option>
            <Select.Option value="val_2">Value 2</Select.Option>
            <Select.Option value="val_3">Value 3</Select.Option>
            <Select.Option value="val_4">Value 4</Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Select multiple={true}>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
```

<!--/GITHUB_BLOCK-->

### Счетчик

С помощью свойства `hasCounter` в компонент можно добавить счетчик выбранных опций.

<!--SANDBOX
import {Select} from '@gravity-ui/uikit';

export default function () {
    return (
        <Select multiple hasCounter placeholder="values">
            <Select.Option value="val_1">Value 1</Select.Option>
            <Select.Option value="val_2">Value 2</Select.Option>
            <Select.Option value="val_3">Value 3</Select.Option>
            <Select.Option value="val_4">Value 4</Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Select multiple={true} hasCounter={true}>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
```

<!--/GITHUB_BLOCK-->

## Фильтрация опций

Для активации секции фильтрации в списке опций используйте свойство `filterable`. Значение по умолчанию — `false`.

<!--SANDBOX
import {Select} from '@gravity-ui/uikit';

export default function () {
    return (
        <Select filterable placeholder="Filterable">
            <Select.Option value="val_1">Value 1</Select.Option>
            <Select.Option value="val_2">Value 2</Select.Option>
            <Select.Option value="val_3">Value 3</Select.Option>
            <Select.Option value="val_4">Value 4</Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Select filterable={true}>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
```

<!--/GITHUB_BLOCK-->

## Поиск по первым буквам

Пока попап открыт и фильтр не перехватывает клавиши, символы ищут опцию: список переводит
активность на первую опцию, текст которой **начинается** с набранного, буфер сбрасывается через
секунду после последнего нажатия, а повторение одного символа перебирает опции, начинающиеся с
него. Пробел входит в набираемый запрос, поэтому подпись с пробелом достижима — и ничего не
выбирает, пока буфер не опустеет. Символ, который список забрал под поиск, не доходит до горячих
клавиш приложения вокруг.

В `filterable`-режиме клавиши уходят в фильтр: набор там — это фильтрация.

## Размер

Чтобы задать дефолтный размер контролов и опций, используйте свойство `size`. Размер по умолчанию — `m`.

<!--SANDBOX
import {Select} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Select size="s" placeholder="S Size">
                <Select.Option value="val_1">Value 1</Select.Option>
            </Select>
            <Select size="m" placeholder="M Size">
                <Select.Option value="val_1">Value 1</Select.Option>
            </Select>
            <Select size="l" placeholder="L Size">
                <Select.Option value="val_1">Value 1</Select.Option>
            </Select>
            <Select size="xl" placeholder="XL Size">
                <Select.Option value="val_1">Value 1</Select.Option>
            </Select>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Select size="s" placeholder="S Size">
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
<Select size="m" placeholder="M Size">
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
<Select size="l" placeholder="L Size">
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
<Select size="xl" placeholder="XL Size">
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
```

<!--/GITHUB_BLOCK-->

## Ширина контрола

По умолчанию ширина контрола растягивается, чтобы соответствовать ширине содержимого выбранных опций. Вы можете самостоятельно регулировать ширину с помощью свойства `width`:

`'max'` — растягивает ширину контрола на всю ширину родительского элемента.

`number` — применяет ширину в пикселях.

<!--SANDBOX
import {Select, SelectProps} from '@gravity-ui/uikit';
import {type CSSProperties} from 'react';

const containerStyle: CSSProperties = {
    width: 150,
    border: '2px dashed gray',
    textAlign: 'center',
};

function SelectExample(props: SelectProps) {
    return (
        <Select {...props}>
            <Select.Option value="val_1">Value 1</Select.Option>
            <Select.Option value="val_2">Value 2</Select.Option>
            <Select.Option value="val_3">Value 3</Select.Option>
            <Select.Option value="val_4">Value 4</Select.Option>
        </Select>
    );
}

export default function () {
    return (
        <>
            <div style={containerStyle}>
                <h4>Default</h4>
                <SelectExample multiple />
            </div>
            <div style={containerStyle}>
                <h4>Max</h4>
                <SelectExample width="max" multiple />
            </div>
            <div style={containerStyle}>
                <h4>In pixels</h4>
                <SelectExample width={110} multiple />
            </div>
        </>
    );
}
SANDBOX-->

## Ширина списка опций.

Ширину списка опций можно изменять с помощью свойства `popupWidth`. Возможные значения:

`'fit'` — применяет ширину контрола.

`number` — применяет ширину в пикселях.

Особенности поведения по умолчанию:

- Ширина списка опций соответствует ширине самой широкой опции, но не превышает `90vw`. Это не применимо, если используется [виртуализация](#виртуализированный-список).

- Узкие опции растягиваются до ширины контрола.

<!--SANDBOX
import {Box, Select, SelectProps} from '@gravity-ui/uikit';
import {type CSSProperties} from 'react';

const containerStyle: CSSProperties = {
    width: 200,
    border: '2px dashed gray',
    textAlign: 'center',
};

function ShortValueSelect(props: SelectProps) {
    return (
        <Select placeholder="Short value" {...props}>
            <Select.Option value="val_1">Value 1</Select.Option>
            <Select.Option value="val_2">Value 2</Select.Option>
            <Select.Option value="val_3">Value 3</Select.Option>
            <Select.Option value="val_4">Value 4</Select.Option>
        </Select>
    );
}

function LongValueSelect(props: SelectProps) {
    return (
        <Select placeholder="Long value" {...props}>
            <Select.Option value="val_1">Loooooooooooooooooooong Value 1</Select.Option>
            <Select.Option value="val_2">Loooooooooooooooooooong Value 2</Select.Option>
            <Select.Option value="val_3">Loooooooooooooooooooong Value 3</Select.Option>
            <Select.Option value="val_4">Loooooooooooooooooooong Value 4</Select.Option>
        </Select>
    );
}

export default function () {
    return (
        <>
            <div style={containerStyle}>
                <h4>Default</h4>
                <Box spacing={{my: 3}}>
                    <ShortValueSelect />
                </Box>
                <Box spacing={{my: 3}}>
                    <LongValueSelect />
                </Box>
            </div>
            <div style={containerStyle}>
                <h4>Fit</h4>
                <Box spacing={{my: 3}}>
                    <ShortValueSelect popupWidth="fit" />
                </Box>
                <Box spacing={{my: 3}}>
                    <LongValueSelect popupWidth="fit" />
                </Box>
            </div>
            <div style={containerStyle}>
                <h4>In pixels</h4>
                <Box spacing={{my: 3}}>
                    <ShortValueSelect popupWidth={80} />
                </Box>
                <Box spacing={{my: 3}}>
                    <LongValueSelect popupWidth={80} />
                </Box>
            </div>
        </>
    );
}
SANDBOX-->

## Виртуализированный список

Длинный список опций по умолчанию рендерится целиком: каждая опция — строка в DOM. Чтобы рендерились только видимые, оберните `Select` в `ListVirtualizer` из энтри-поинта `@gravity-ui/uikit/virtualizer` — обёртке не нужны настройки, а попап продолжает работать через портал. Оборачивать имеет смысл начиная с пары сотен опций; выше 150 `Select` говорит об этом предупреждением в разработке.

Энтри-поинту нужен `@tanstack/react-virtual`: это опциональная peer-зависимость пакета, её нужно установить рядом.

```tsx
import {Select} from '@gravity-ui/uikit';
import {ListVirtualizer} from '@gravity-ui/uikit/virtualizer';

<ListVirtualizer>
  <Select options={thousandsOfOptions} />
</ListVirtualizer>;
```

Что стоит учитывать:

- Ширина списка опций больше не изменяется в зависимости от длины самой длинной опции.

- Минимальная ширина списка опций равна ширине контрола или `100px`, если ширина контрола меньше `100px`.

- Высота строки до её рендера берётся из [getOptionHeight](#отображение-опций-с-разной-высотой) и размера (`size`) `Select`; проп `estimateItemSize` обёртки не используется, так как тип строки-опции наружу не выходит — при его передаче в разработке пишется предупреждение. Пропы `measure` и `overscan` работают так, как [описано](https://github.com/gravity-ui/uikit/blob/main/src/components/lab/List/README.md#virtualization) для `List`.

- На сервере виртуализатор не знает размер вьюпорта и отдаёт пустое окно: опции появляются после гидратации.

- Обёртка покрывает список этого `Select`, в том числе тот, который выводит на страницу [renderPopup](#отображение-списка-опций). Список внутри его строки или `Select`, помещённый в такую строку, рендерятся целиком: виртуализация списка не достаёт до того, что рисуют его строки.

- Объявляйте `getOptionHeight` и `renderOption` вне компонента или мемоизируйте их: новая функция на каждый рендер заставляет виртуализатор заново набирать измерения, а строки — перерисовываться.

<!--SANDBOX
import {Box, Select} from '@gravity-ui/uikit';
import {ListVirtualizer} from '@gravity-ui/uikit/virtualizer';
import {type CSSProperties} from 'react';

const containerStyle: CSSProperties = {
    width: 200,
    border: '2px dashed gray',
    textAlign: 'center',
};

const shortOptions = Array.from({length: 1000}, (_, index) => ({
    value: String(index),
    content: `Value ${index}`,
}));

const longOptions = Array.from({length: 1000}, (_, index) => ({
    value: String(index),
    content: `Loooooooooooooooooooong Value ${index}`,
}));

export default function () {
    return (
        <>
            <div style={containerStyle}>
                <h4>Default</h4>
                <Box spacing={{my: 3}}>
                    <ListVirtualizer>
                        <Select placeholder="Short value" options={shortOptions} />
                    </ListVirtualizer>
                </Box>
                <Box spacing={{my: 3}}>
                    <ListVirtualizer>
                        <Select placeholder="Long value" options={longOptions} />
                    </ListVirtualizer>
                </Box>
            </div>
            <div style={containerStyle}>
                <h4>In pixels</h4>
                <Box spacing={{my: 3}}>
                    <ListVirtualizer>
                        <Select placeholder="Short value" popupWidth={80} options={shortOptions} />
                    </ListVirtualizer>
                </Box>
                <Box spacing={{my: 3}}>
                    <ListVirtualizer>
                        <Select placeholder="Long value" popupWidth={80} options={longOptions} />
                    </ListVirtualizer>
                </Box>
            </div>
        </>
    );
}
SANDBOX-->

## Расширенное использование

Существует множество способов настроить `Select` более тонко.

### Рендеринг пользовательского контрола

Для создания пользовательского контрола используйте свойство `renderControl`.

Передайте своему элементу `ref` и разверните на нём `triggerProps`: они открывают и закрывают попап, несут клавиатуру списка и ARIA комбобокса (`role`, `aria-expanded`, `aria-controls`, `aria-activedescendant`). Контрол, который оставит их себе, не будет ни открываться, ни навигироваться. Рядом приходит `disabled` — его передавайте своему компоненту напрямую: обёртка обычно пишет собственный на элемент поверх всего, что на него развернули.

<!--SANDBOX
import {Button, Select} from '@gravity-ui/uikit';

export default function () {
    return (
        <Select
            renderControl={({ref, triggerProps, disabled}) => (
                <Button ref={ref} disabled={disabled} extraProps={triggerProps}>
                    Custom control
                </Button>
            )}
        >
            <Select.Option value="val_1">Value 1</Select.Option>
            <Select.Option value="val_2">Value 2</Select.Option>
            <Select.Option value="val_3">Value 3</Select.Option>
            <Select.Option value="val_4">Value 4</Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
import {Button} from '@gravity-ui/uikit';

const MyComponent = () => {
  const renderControl: SelectProps['renderControl'] = ({ref, triggerProps, disabled}) => {
    // `triggerProps` opens and closes the popup and carries the keyboard of the list along with
    // the ARIA of the combobox — it has to reach the element itself. `disabled` goes to `Button`
    // rather than through `extraProps`: the component writes its own to the element last
    return (
      <Button ref={ref} disabled={disabled} extraProps={triggerProps}>
        Your control
      </Button>
    );
  };

  return <Select renderControl={renderControl}>/* Your options here */</Select>;
};
```

<!--/GITHUB_BLOCK-->

### Отображение секции пользовательской фильтрации

Для отображения секции пользовательской фильтрации используйте свойство `renderFilter` и установите `filterable` в значение `true`.

`inputProps` несёт всё, что нужно инпуту комбобокса: значение, обработчики, плейсхолдер и ARIA-обвязку — `role`, `aria-label`, `aria-controls`, `aria-activedescendant`, `aria-expanded`, `aria-autocomplete`. Без них у фильтра нет доступного имени и он не называет активную опцию для скринридера. Разверните его на обычном `input` вместе с `ref`. Компоненту, который не принимает разворачивание пропсов, — например `TextInput`, — части нужно передать поимённо, включая `onKeyDown`: в нём вся клавиатура списка.

<!--SANDBOX
import type {SelectProps} from '@gravity-ui/uikit';
import {Button, Flex, Select, TextInput} from '@gravity-ui/uikit';

const renderFilter: SelectProps['renderFilter'] = (props) => {
    const {ref, inputProps, onChange} = props;

    return (
        <Flex direction="column" gap={1}>
            <TextInput
                controlRef={ref}
                // `controlProps` доходит до самого инпута; значением, плейсхолдером и
                // обработчиками владеет `TextInput`, поэтому они передаются ему напрямую
                controlProps={{
                    size: 1,
                    role: inputProps.role,
                    'aria-label': inputProps['aria-label'],
                    'aria-controls': inputProps['aria-controls'],
                    'aria-activedescendant': inputProps['aria-activedescendant'],
                    'aria-expanded': inputProps['aria-expanded'],
                    'aria-autocomplete': inputProps['aria-autocomplete'],
                }}
                value={inputProps.value}
                placeholder={inputProps.placeholder}
                // `onChange` из `inputProps` — обработчик события; `TextInput` отдаёт строку,
                // а аргумент с тем же именем как раз такой формы
                onUpdate={onChange}
                onKeyDown={inputProps.onKeyDown}
            />
            <Button size="xs">Do smth</Button>
        </Flex>
    );
};

export default function () {
    return (
        <Select placeholder="Custom filter" filterable renderFilter={renderFilter}>
            <Select.Option value="val_1">Value 1</Select.Option>
            <Select.Option value="val_2">Value 2</Select.Option>
            <Select.Option value="val_3">Value 3</Select.Option>
            <Select.Option value="val_4">Value 4</Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
import {Button} from '@gravity-ui/uikit';
import type {SelectProps} from '@gravity-ui/uikit';

const MyComponent = () => {
  const renderFilter: SelectProps['renderFilter'] = (props) => {
    // `inputProps` несёт значение, обработчики и обвязку комбобокса
    const {ref, inputProps} = props;

    return (
      <div>
        <input ref={ref} {...inputProps} />
        <Button>Do smth</Button>
      </div>
    );
  };

  return (
    <Select filterable={true} renderFilter={renderFilter}>
      /* Your options here */
    </Select>
  );
};
```

<!--/GITHUB_BLOCK-->

### Отображение пользовательских опций

Для отображения пользовательских опций используйте свойство `renderOption`. Он вызывается с опцией и
состоянием её строки: `isItemActive` — активна ли строка, та самая, которую применит `Enter`, — и
`itemHeight`, высота, которой строка получилась: либо та, что вернул
[getOptionHeight](#отображение-опций-с-разной-высотой), либо минимум для
[размера](#размер). Галочку выбранной опции в `Select` с [множественным выбором](#выбор-нескольких-опций)
рисует сама строка, рядом с тем, что отрисует этот проп.

`renderOptionGroup` — то же самое для заголовка группы: группа и `{isItemActive, itemHeight}`.

<!--SANDBOX
import type {SelectProps} from '@gravity-ui/uikit';
import {Select} from '@gravity-ui/uikit';

const renderOption: SelectProps['renderOption'] = (option) => {
    return <div style={{color: option.data.color}}>{option.children}</div>;
};

export default function () {
    return (
        <Select placeholder="Custom options" renderOption={renderOption}>
            <Select.Option value="val_1" data={{color: '#8FE1A1'}}>
                Value 1
            </Select.Option>
            <Select.Option value="val_2" data={{color: '#38C0A8'}}>
                Value 2
            </Select.Option>
            <Select.Option value="val_3" data={{color: '#3A7AC3'}}>
                Value 3
            </Select.Option>
            <Select.Option value="val_4" data={{color: '#534581'}}>
                Value 4
            </Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
import type {SelectProps} from '@gravity-ui/uikit';

const MyComponent = () => {
  const renderOption: SelectProps['renderOption'] = (option) => {
    return <div style={{color: option.data.color}}>{option.children}</div>;
  };

  return (
    <Select renderOption={renderOption}>
      <Select.Option value="val_1" data={{color: '#8FE1A1'}}>
        Value 1
      </Select.Option>
      <Select.Option value="val_2" data={{color: '#38C0A8'}}>
        Value 2
      </Select.Option>
      <Select.Option value="val_3" data={{color: '#3A7AC3'}}>
        Value 3
      </Select.Option>
      <Select.Option value="val_4" data={{color: '#534581'}}>
        Value 4
      </Select.Option>
    </Select>
  );
};
```

<!--/GITHUB_BLOCK-->

### Отображение выбранных пользовательских опций

Для отображения выбранных пользовательских опций используйте свойство `renderSelectedOption`:

<!--SANDBOX
import type {SelectProps} from '@gravity-ui/uikit';
import {Select} from '@gravity-ui/uikit';

const renderSelectedOption: SelectProps['renderSelectedOption'] = (option) => {
    return <div style={{color: option.data.color}}>{option.children}</div>;
};

export default function () {
    return (
        <Select placeholder="Custom selected options" renderSelectedOption={renderSelectedOption}>
            <Select.Option value="val_1" data={{color: '#8FE1A1'}}>
                Value 1
            </Select.Option>
            <Select.Option value="val_2" data={{color: '#38C0A8'}}>
                Value 2
            </Select.Option>
            <Select.Option value="val_3" data={{color: '#3A7AC3'}}>
                Value 3
            </Select.Option>
            <Select.Option value="val_4" data={{color: '#534581'}}>
                Value 4
            </Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
import type {SelectProps} from '@gravity-ui/uikit';

const MyComponent = () => {
  const renderSelectedOption: SelectProps['renderSelectedOption'] = (option) => {
    return <div style={{color: option.data.color}}>{option.children}</div>;
  };

  return (
    <Select renderSelectedOption={renderSelectedOption}>
      <Select.Option value="val_1" data={{color: '#8FE1A1'}}>
        Value 1
      </Select.Option>
      <Select.Option value="val_2" data={{color: '#38C0A8'}}>
        Value 2
      </Select.Option>
      <Select.Option value="val_3" data={{color: '#3A7AC3'}}>
        Value 3
      </Select.Option>
      <Select.Option value="val_4" data={{color: '#534581'}}>
        Value 4
      </Select.Option>
    </Select>
  );
};
```

<!--/GITHUB_BLOCK-->

### Отображение опций с разной высотой

Высота строки определяется её содержимым и не может быть меньше минимума для своего размера (`size`): 24, 28, 32 и 36 пикселей, а на мобильном каждая строка берёт 36 от `xl` — если только вы не задали высоту сами. Если нужно отобразить опции с разной высотой, используйте свойство `option.data`, которое будет содержать информацию о требуемой высоте опции, а также `getOptionHeight` для установки этого значения: возвращённое число становится высотой строки и оценкой, по которой [виртуализатор](#виртуализированный-список) расставляет строки.

<!--SANDBOX
import type {SelectProps} from '@gravity-ui/uikit';
import {Select} from '@gravity-ui/uikit';

const getOptionHeight: SelectProps['getOptionHeight'] = (option) => option.data.height;

export default function () {
    return (
        <Select placeholder="Different heights" getOptionHeight={getOptionHeight}>
            <Select.Option value="val_1" data={{height: 20}}>
                Value 1
            </Select.Option>
            <Select.Option value="val_2" data={{height: 40}}>
                Value 2
            </Select.Option>
            <Select.Option value="val_3" data={{height: 60}}>
                Value 3
            </Select.Option>
            <Select.Option value="val_4" data={{height: 80}}>
                Value 4
            </Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
import type {SelectProps} from '@gravity-ui/uikit';

const MyComponent = () => {
  const getOptionHeight: SelectProps['getOptionHeight'] = (option) => option.data.height;

  return (
    <Select getOptionHeight={getOptionHeight}>
      <Select.Option value="val_1" data={{height: 20}}>
        Value 1
      </Select.Option>
      <Select.Option value="val_2" data={{height: 40}}>
        Value 2
      </Select.Option>
      <Select.Option value="val_3" data={{height: 60}}>
        Value 3
      </Select.Option>
      <Select.Option value="val_4" data={{height: 80}}>
        Value 4
      </Select.Option>
    </Select>
  );
};
```

<!--/GITHUB_BLOCK-->

### Отображение пользовательского счетчика опций

Для отображения пользовательского счетчика опций используйте свойство `renderCounter`. Счетчик отображается только при включенном множественном выборе (`multiple={true}`) и `hasCounter={true}`.

<!--SANDBOX
import type {SelectProps} from '@gravity-ui/uikit';
import {Select} from '@gravity-ui/uikit';

const renderCounter: SelectProps['renderCounter'] = (_, {count, disabled}) => {
    if (count === 0) {
        return null;
    }

    if (count >= 2) {
        return (
            <div
                style={{
                    padding: '0 8px',
                    color: disabled ? '#999' : '#027bf3',
                    fontWeight: 'bold',
                }}
            >
                +{count}
            </div>
        );
    }

    return count;
};

export default function () {
    return (
        <Select multiple hasCounter renderCounter={renderCounter}>
            <Select.Option value="val_1">Value 1</Select.Option>
            <Select.Option value="val_2">Value 2</Select.Option>
            <Select.Option value="val_3">Value 3</Select.Option>
            <Select.Option value="val_4">Value 4</Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
import type {SelectProps} from '@gravity-ui/uikit';

const MyComponent = () => {
  const renderCounter: SelectProps['renderCounter'] = (_, {count, disabled}) => {
    if (count === 0) {
      return null;
    }
    if (count >= 2) {
      return (
        <div
          style={{
            padding: '0 8px',
            color: disabled ? '#999' : '#027bf3',
            fontWeight: 'bold',
          }}
        >
          +{count}
        </div>
      );
    }
    return count;
  };

  return (
    <Select multiple={true} hasCounter={true} renderCounter={renderCounter}>
      <Select.Option value="val_1">Value 1</Select.Option>
      <Select.Option value="val_2">Value 2</Select.Option>
      <Select.Option value="val_3">Value 3</Select.Option>
      <Select.Option value="val_4">Value 4</Select.Option>
    </Select>
  );
};
```

<!--/GITHUB_BLOCK-->

### Отображение списка опций

Свойство `renderPopup` позволяет управлять содержимым списка опций: изменять порядок стандартных элементов (фильтр, список), скрывать их или добавлять собственные элементы между ними, до или после них.

<!--SANDBOX
import type {SelectProps} from '@gravity-ui/uikit';
import {Select} from '@gravity-ui/uikit';

const renderPopup: SelectProps['renderPopup'] = ({renderList, renderFilter}) => {
    return (
        <>
            {renderFilter()}
            <div style={{width: '100%', height: 20, backgroundColor: 'tomato'}} />
            {renderList()}
        </>
    );
};

export default function () {
    return (
        <Select filterable placeholder="Custom popup" renderPopup={renderPopup}>
            <Select.Option value="val_1" data={{color: '#8FE1A1'}}>
                Value 1
            </Select.Option>
            <Select.Option value="val_2" data={{color: '#38C0A8'}}>
                Value 2
            </Select.Option>
            <Select.Option value="val_3" data={{color: '#3A7AC3'}}>
                Value 3
            </Select.Option>
            <Select.Option value="val_4" data={{color: '#534581'}}>
                Value 4
            </Select.Option>
        </Select>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
import type {SelectProps} from '@gravity-ui/uikit';

const renderPopup: SelectProps['renderPopup'] = ({renderList, renderFilter}) => {
  return (
    <React.Fragment>
      {renderFilter()}
      <div className="CustomElement" />
      {renderList()}
    </React.Fragment>
  );
};

const MyComponent = () => {
  return (
    <Select filterable renderPopup={renderPopup}>
      <Select.Option value="val_1" data={{color: '#8FE1A1'}}>
        Value 1
      </Select.Option>
      <Select.Option value="val_2" data={{color: '#38C0A8'}}>
        Value 2
      </Select.Option>
      <Select.Option value="val_3" data={{color: '#3A7AC3'}}>
        Value 3
      </Select.Option>
      <Select.Option value="val_4" data={{color: '#534581'}}>
        Value 4
      </Select.Option>
    </Select>
  );
};
```

<!--/GITHUB_BLOCK-->

### `Error` (ошибка)

Это состояние `Select` указывает на некорректный ввод данных пользователем. Для изменения внешнего представления `Select` примените свойство `validationState`, задав ему значение `"invalid"`. Опционально можно задать текст сообщения об ошибке через свойство `errorMessage`. По умолчанию текст сообщения выводится вне компонента.
Место вывода сообщения можно изменить с помощью свойства `errorPlacement`.

<!--SANDBOX
import {Select} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Select placeholder="Placeholder" errorMessage="Error message" validationState="invalid">
                <Select.Option value="val_1">Value 1</Select.Option>
                <Select.Option value="val_2">Value 2</Select.Option>
                <Select.Option value="val_3">Value 3</Select.Option>
                <Select.Option value="val_4">Value 4</Select.Option>
            </Select>
            <Select
                placeholder="Placeholder"
                errorPlacement="inside"
                errorMessage="Error message"
                validationState="invalid"
            >
                <Select.Option value="val_1">Value 1</Select.Option>
                <Select.Option value="val_2">Value 2</Select.Option>
                <Select.Option value="val_3">Value 3</Select.Option>
                <Select.Option value="val_4">Value 4</Select.Option>
            </Select>
        </>
    );
}
SANDBOX-->

## Свойства

| Имя                                                                   | Описание                                                                                                                              | Тип                                      | Значение по умолчанию                                    |
| :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------- | :------------------------------------------------------- |
| className                                                             | Имя класса контрола.                                                                                                                  | `string`                                 |                                                          |
| defaultValue                                                          | Значения по умолчанию для выбранных опций в случае использования неуправляемого состояния.                                            | `string[]`                               |                                                          |
| disabled                                                              | Указывает на то, что пользователь не может взаимодействовать с контролом.                                                             | `boolean`                                | `false`                                                  |
| [filterable](#фильтрация-опций)                                       | Указывает на то, что список опций содержит секцию фильтрации.                                                                         | `boolean`                                | `false`                                                  |
| filterOption                                                          | Используется для сравнения опции со значением фильтра.                                                                                | `function`                               |                                                          |
| filterPlaceholder                                                     | Текст-заглушка по умолчанию для поля ввода фильтра.                                                                                   | `string`                                 |                                                          |
| [getOptionText](#текст-опции)                                         | Текст опции: его показывает триггер, с ним сравнивает фильтр и по нему идёт поиск по первым буквам.                                   | `function`                               | строковое содержимое, иначе значение                     |
| [getOptionHeight](#отображение-опций-с-разной-высотой)                | Используется для задания высоты опций.                                                                                                | `function`                               |                                                          |
| getOptionGroupHeight                                                  | Используется для задания высоты заголовка группы опций.                                                                               | `function`                               |                                                          |
| hasClear                                                              | Позволяет отображать иконку для очистки выбранных опций.                                                                              | `boolean`                                | `false`                                                  |
| id                                                                    | HTML-атрибут `id`.                                                                                                                    | `string`                                 |                                                          |
| label                                                                 | Лейбл контрола.                                                                                                                       | `string`                                 |                                                          |
| loading                                                               | Добавляет элемент загрузки в конец списка опций. Работает как постоянный индикатор загрузки, пока список опций пуст.                  | `boolean`                                |                                                          |
| [multiple](#выбор-нескольких-опций)                                   | Включает множественный выбор опций.                                                                                                   | `boolean`                                | `false`                                                  |
| name                                                                  | Имя контрола.                                                                                                                         | `string`                                 |                                                          |
| onBlur                                                                | Обработчик, который вызывается, когда элемент теряет фокус.                                                                           | `function`                               |                                                          |
| filter                                                                | Контролируемое значение фильтра.                                                                                                      | `string`                                 | `''`                                                     |
| onFilterChange                                                        | Срабатывает при каждом изменении фильтра.                                                                                             | `function`                               |                                                          |
| onFocus                                                               | Обработчик, который вызывается, когда элемент получает фокус.                                                                         | `function`                               |                                                          |
| onLoadMore                                                            | Срабатывает, когда индикатор загрузки становится видимым.                                                                             | `function`                               |                                                          |
| onOpenChange                                                          | Срабатывает при каждом изменении видимости списка опций.                                                                              | `function`                               |                                                          |
| onUpdate                                                              | Срабатывает, когда пользователь подтверждает изменение значения `Select`.                                                             | `function`                               |                                                          |
| [options](#options)                                                   | Конфигурация опций.                                                                                                                   | `(SelectOption \| SelectOptionGroup)[]`  |                                                          |
| pin                                                                   | Вид границ контрола.                                                                                                                  | `string`                                 | `'round-round'`                                          |
| placeholder                                                           | Текст-заглушка.                                                                                                                       | `string`                                 |                                                          |
| popupClassName                                                        | Имя класса (`className`) для списка опций в попапе.                                                                                   | `string`                                 |                                                          |
| popupPlacement                                                        | Размещение списка опций относительно контрола.                                                                                        | `PopupPlacement` `Array<PopupPlacement>` | `['bottom-start', 'bottom-end', 'top-start', 'top-end']` |
| [popupWidth](#ширина-списка-опций)                                    | Ширина списка опций.                                                                                                                  | `number \| 'fit'`                        |                                                          |
| sheetClassName                                                        | Имя класса (`className`) для списка опций в шторке.                                                                                   | `string`                                 |                                                          |
| qa                                                                    | Атрибут идентификатора для тестирования (`data-qa`).                                                                                  | `string`                                 |                                                          |
| [renderControl](#рендеринг-пользовательского-контрола)                | Используется для рендеринга пользовательского контрола.                                                                               | `function`                               |                                                          |
| [renderCounter](#отображение-пользовательского-счетчика-опций)        | Используется для рендеринга пользовательского счетчика. Работает только с [hasCounter](#счетчик).                                     | `function`                               |                                                          |
| renderEmptyOptions                                                    | Используется для рендеринга узла для пустого списка опций.                                                                            | `function`                               |                                                          |
| [renderFilter](#отображение-секции-пользовательской-фильтрации)       | Используется для рендеринга секции пользовательской фильтрации.                                                                       | `function`                               |                                                          |
| [renderOption](#отображение-пользовательских-опций)                   | Используется для рендеринга пользовательских опций.                                                                                   | `function`                               |                                                          |
| renderOptionGroup                                                     | Используется для рендеринга заголовков групп опций.                                                                                   | `function`                               |                                                          |
| [renderSelectedOption](#отображение-выбранных-пользовательских-опций) | Используется для рендеринга выбранных опций.                                                                                          | `function`                               |                                                          |
| [renderPopup](#отображение-списка-опций)                              | Используется для рендеринга содержимого списка опций.                                                                                 | `function`                               |                                                          |
| [size](#размер)                                                       | Размер контрола и опций.                                                                                                              | `string`                                 | `'m'`                                                    |
| value                                                                 | Значения для выбранных опций, которые передаются в обработчик `onUpdate`.                                                             | `string[]`                               |                                                          |
| view                                                                  | Вид контрола.                                                                                                                         | `string`                                 | `'normal'`                                               |
| [width](#ширина-контрола)                                             | Ширина контрола                                                                                                                       | `string \| number`                       | `undefined`                                              |
| errorMessage                                                          | Текст ошибки.                                                                                                                         | `string`                                 |                                                          |
| errorPlacement                                                        | Положение отображения ошибки.                                                                                                         | `outside` `inside`                       | `outside`                                                |
| validationState                                                       | Состояние валидации.                                                                                                                  | `"invalid"`                              |                                                          |
| [hasCounter](#счетчик)                                                | Показывает количество выбранных опций. Счетчик появляется только тогда, когда включен [множественный](#выбор-нескольких-опций) выбор. | `boolean`                                |                                                          |

## API CSS

Имена классов в разметке не являются публичным контрактом — строки попапа рисует список и его вьюха
строки, и их разметка меняется вместе с китом. Поддерживается следующее:

- переменные ниже;
- цвета строки — переменные вьюхи строки `--g-list-item-view-background-color`,
  `--g-list-item-view-background-color-hover`, `--g-list-item-view-text-color` и
  `--g-list-item-view-description-color`. Геометрия строки — высота, отступы, радиус — следует
  размеру ([size](#размер)) `Select` и не переопределяется;
- содержимое строки — `renderOption`, `renderOptionGroup` и `renderSelectedOption`.

| Имя                              | Описание                                                        |
| :------------------------------- | :-------------------------------------------------------------- |
| `--g-select-focus-outline-color` | Цвет обводки при фокусе на элементе (по умолчанию отсутствует). |
