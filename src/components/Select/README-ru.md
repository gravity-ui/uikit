<!--GITHUB_BLOCK-->

# Select

<!--/GITHUB_BLOCK-->

```tsx
import {Select} from '@gravity-ui/uikit';
```

Компонент `Select` — это контрол, который предоставляет список опций для выбора.

## `Options`

Опции для выбора.

### Определение опций

Опции можно определять в виде массива объектов или в качестве дочерних элементов компонента. Первый способ подходит для случаев, когда опции требуют сложной подготовки и, возможно, запоминания. Второй способ удобен, когда опций немного и их настройка не требует сложных вычислений.

#### Одноуровневый список

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select
  options={[
    {value: 'val_1', content: 'Value 1'},
    {value: 'val_2', content: 'Value 2'},
    {value: 'val_3', content: 'Value 3'},
    {value: 'val_4', content: 'Value 4'},
  ]}
/>
<Select>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
`}
>
  <div>
    Array of objects
    <UIKit.Select
      options={[
        {value: 'val_1', content: 'Value 1'},
        {value: 'val_2', content: 'Value 2'},
        {value: 'val_3', content: 'Value 3'},
        {value: 'val_4', content: 'Value 4'},
      ]}
    />
  </div>
  <div>
    Child nodes
    <UIKit.Select>
      <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
      <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
      <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
      <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
    </UIKit.Select>
  </div>
</ExampleBlock>

LANDING_BLOCK-->

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

#### Группированный список

<!--LANDING_BLOCK

<ExampleBlock
    code={`
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
`}
>
  <div>
    Array of objects
    <UIKit.Select
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
  </div>
  <div>
    Child nodes
    <UIKit.Select>
      <UIKit.Select.OptionGroup label="Group 1">
        <UIKit.Select.Option value="val_1" content="Value 1" />
        <UIKit.Select.Option value="val_2" content="Value 2" />
      </UIKit.Select.OptionGroup>
      <UIKit.Select.OptionGroup label="Group 2">
        <UIKit.Select.Option value="val_3" content="Value 3" />
        <UIKit.Select.Option value="val_4" content="Value 4" />
      </UIKit.Select.OptionGroup>
    </UIKit.Select>
  </div>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select multiple={true}>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
`}
>
  <UIKit.Select multiple={true}>
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
    <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
    <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
    <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select multiple={true} hasCounter={true}>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
`}
>
  <UIKit.Select multiple={true} hasCounter={true}>
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
    <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
    <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
    <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select filterable={true}>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
`}
>
  <UIKit.Select filterable={true} placeholder="Filterable">
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
    <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
    <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
    <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

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

## Размер

Чтобы задать дефолтный размер контролов и опций, используйте свойство `size`. Размер по умолчанию — `m`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
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
`}
>
  <UIKit.Select size="s" placeholder="S Size">
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
  </UIKit.Select>
  <UIKit.Select size="m" placeholder="M Size">
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
  </UIKit.Select>
  <UIKit.Select size="l" placeholder="L Size">
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
  </UIKit.Select>
  <UIKit.Select size="xl" placeholder="XL Size">
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
<Select width="max">
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
<Select width={150}>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
`}
>
  <div style={{width: 150, border: '2px dashed gray', textAlign: 'center'}}>
    <h4 style={{textAlign: 'center'}}>Default</h4>
    <UIKit.Select multiple={true}>
      <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
      <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
      <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
      <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
    </UIKit.Select>
  </div>
  <div style={{width: 150, border: '2px dashed gray', textAlign: 'center'}}>
    <h4 style={{textAlign: 'center'}}>Max</h4>
    <UIKit.Select width="max" multiple={true}>
      <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
      <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
      <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
      <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
    </UIKit.Select>
  </div>
  <div style={{width: 150, border: '2px dashed gray', textAlign: 'center'}}>
    <h4 style={{textAlign: 'center'}}>In pixels</h4>
    <UIKit.Select width={110} multiple={true}>
      <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
      <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
      <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
      <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
    </UIKit.Select>
  </div>
</ExampleBlock>

LANDING_BLOCK-->

## Ширина списка опций.

Ширину списка опций можно изменять с помощью свойства `popupWidth`. Возможные значения:

`'fit'` — применяет ширину контрола.

`number` — применяет ширину в пикселях.

Особенности поведения по умолчанию:

- Ширина списка опций соответствует ширине самой широкой опции, но не превышает `90vw`. Это не применимо, если используется [виртуализация](#virtualized-list).

- Узкие опции растягиваются до ширины контрола.

<!--LANDING_BLOCK

### Non-virtualized list

A regular list when all the elements are in the dom tree at once.

<ExampleBlock
    code={`
<Select>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
<Select>
  <Select.Option value="val_1">Loooooooooooooooooooong Value 1</Select.Option>
  <Select.Option value="val_2">Loooooooooooooooooooong Value 2</Select.Option>
  <Select.Option value="val_3">Loooooooooooooooooooong Value 3</Select.Option>
  <Select.Option value="val_4">Loooooooooooooooooooong Value 4</Select.Option>
</Select>
<Select popupWidth="fit">
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
<Select popupWidth="fit">
  <Select.Option value="val_1">Loooooooooooooooooooong Value 1</Select.Option>
  <Select.Option value="val_2">Loooooooooooooooooooong Value 2</Select.Option>
  <Select.Option value="val_3">Loooooooooooooooooooong Value 3</Select.Option>
  <Select.Option value="val_4">Loooooooooooooooooooong Value 4</Select.Option>
</Select>
<Select popupWidth={80}>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
<Select popupWidth={80}>
  <Select.Option value="val_1">Loooooooooooooooooooong Value 1</Select.Option>
  <Select.Option value="val_2">Loooooooooooooooooooong Value 2</Select.Option>
  <Select.Option value="val_3">Loooooooooooooooooooong Value 3</Select.Option>
  <Select.Option value="val_4">Loooooooooooooooooooong Value 4</Select.Option>
</Select>
`}
>
  <div style={{width: 200, border: '2px dashed gray', textAlign: 'center'}}>
    <h4 style={{textAlign: 'center'}}>Default</h4>
    <p>
      <UIKit.Select placeholder="Short value">
        <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
        <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
        <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
        <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
      </UIKit.Select>
    </p>
    <p>
      <UIKit.Select placeholder="Long value">
        <UIKit.Select.Option value="val_1">Loooooooooooooooooooong Value 1</UIKit.Select.Option>
        <UIKit.Select.Option value="val_2">Loooooooooooooooooooong Value 2</UIKit.Select.Option>
        <UIKit.Select.Option value="val_3">Loooooooooooooooooooong Value 3</UIKit.Select.Option>
        <UIKit.Select.Option value="val_4">Loooooooooooooooooooong Value 4</UIKit.Select.Option>
      </UIKit.Select>
    </p>
  </div>
  <div style={{width: 200, border: '2px dashed gray', textAlign: 'center'}}>
    <h4 style={{textAlign: 'center'}}>Fit</h4>
    <p>
      <UIKit.Select placeholder="Short value" popupWidth="fit">
        <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
        <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
        <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
        <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
      </UIKit.Select>
    </p>
    <p>
      <UIKit.Select placeholder="Long value" popupWidth="fit">
        <UIKit.Select.Option value="val_1">Loooooooooooooooooooong Value 1</UIKit.Select.Option>
        <UIKit.Select.Option value="val_2">Loooooooooooooooooooong Value 2</UIKit.Select.Option>
        <UIKit.Select.Option value="val_3">Loooooooooooooooooooong Value 3</UIKit.Select.Option>
        <UIKit.Select.Option value="val_4">Loooooooooooooooooooong Value 4</UIKit.Select.Option>
      </UIKit.Select>
    </p>
  </div>
  <div style={{width: 200, border: '2px dashed gray', textAlign: 'center'}}>
    <h4 style={{textAlign: 'center'}}>In pixels</h4>
    <p>
      <UIKit.Select placeholder="Short value" popupWidth={80}>
        <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
        <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
        <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
        <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
      </UIKit.Select>
    </p>
    <p>
      <UIKit.Select placeholder="Long value" popupWidth={80}>
        <UIKit.Select.Option value="val_1">Loooooooooooooooooooong Value 1</UIKit.Select.Option>
        <UIKit.Select.Option value="val_2">Loooooooooooooooooooong Value 2</UIKit.Select.Option>
        <UIKit.Select.Option value="val_3">Loooooooooooooooooooong Value 3</UIKit.Select.Option>
        <UIKit.Select.Option value="val_4">Loooooooooooooooooooong Value 4</UIKit.Select.Option>
      </UIKit.Select>
    </p>
  </div>
</ExampleBlock>

LANDING_BLOCK-->

### Виртуализированный список

Для оптимального отображения большого количества опций в компоненте `Select`предусмотрен встроенный инструмент виртуализации списка. Виртуализация включается, когда количество опций превышает пороговое значение (по умолчанию `50`). Пороговое значение можно изменить с помощью свойства `virtualizationThreshold`.

При включении виртуализации к элементу списка опций применяются определенные ограничения:

- Ширина списка опций больше не изменяется в зависимости от длины самой длинной опции.

- Минимальная ширина списка опций равна ширине контрола или `100px`, если ширина контрола меньше `100px`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
<Select>
  <Select.Option value="val_1">Loooooooooooooooooooong Value 1</Select.Option>
  <Select.Option value="val_2">Loooooooooooooooooooong Value 2</Select.Option>
  <Select.Option value="val_3">Loooooooooooooooooooong Value 3</Select.Option>
  <Select.Option value="val_4">Loooooooooooooooooooong Value 4</Select.Option>
</Select>
<Select popupWidth="fit">
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
<Select popupWidth="fit">
  <Select.Option value="val_1">Loooooooooooooooooooong Value 1</Select.Option>
  <Select.Option value="val_2">Loooooooooooooooooooong Value 2</Select.Option>
  <Select.Option value="val_3">Loooooooooooooooooooong Value 3</Select.Option>
  <Select.Option value="val_4">Loooooooooooooooooooong Value 4</Select.Option>
</Select>
<Select popupWidth={80}>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
<Select popupWidth={80}>
  <Select.Option value="val_1">Loooooooooooooooooooong Value 1</Select.Option>
  <Select.Option value="val_2">Loooooooooooooooooooong Value 2</Select.Option>
  <Select.Option value="val_3">Loooooooooooooooooooong Value 3</Select.Option>
  <Select.Option value="val_4">Loooooooooooooooooooong Value 4</Select.Option>
</Select>
`}
>
  <div style={{width: 200, border: '2px dashed gray', textAlign: 'center'}}>
    <h4 style={{textAlign: 'center'}}>Default</h4>
    <p>
      <UIKit.Select placeholder="Short value">
        {Array.from({length: 1000}, (_, index) => index)
          .map((value) => <UIKit.Select.Option value={value}>{`Value ${value}`}</UIKit.Select.Option>)
        }
      </UIKit.Select>
    </p>
    <p>
      <UIKit.Select placeholder="Long value">
        {Array.from({length: 1000}, (_, index) => index)
          .map((value) => <UIKit.Select.Option value={value}>{`Loooooooooooooooooooong Value ${value}`}</UIKit.Select.Option>)
        }
      </UIKit.Select>
    </p>
  </div>
  <div style={{width: 200, border: '2px dashed gray', textAlign: 'center'}}>
    <h4 style={{textAlign: 'center'}}>In pixels</h4>
    <p>
      <UIKit.Select placeholder="Short value" popupWidth={80}>
        {Array.from({length: 1000}, (_, index) => index)
          .map((value) => <UIKit.Select.Option value={value}>{`Value ${value}`}</UIKit.Select.Option>)
        }
      </UIKit.Select>
    </p>
    <p>
      <UIKit.Select placeholder="Long value" popupWidth={80}>
        {Array.from({length: 1000}, (_, index) => index)
          .map((value) => <UIKit.Select.Option value={value}>{`Loooooooooooooooooooong Value ${value}`}</UIKit.Select.Option>)
        }
      </UIKit.Select>
    </p>
  </div>
</ExampleBlock>

LANDING_BLOCK-->

## Расширенное использование

Существует множество способов настроить `Select` более тонко.

### Рендеринг пользовательского контрола

Для создания пользовательского контрола используйте свойство `renderControl`.
Обратите внимание, что для правильной работы контрола необходимо передать все аргументы в узел (как при использовании стандартной конфигурации).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select
  renderControl={({onClick, onKeyDown, ref}) => {
    return <button ref={ref} onClick={onClick} extraProps={{onKeyDown}}>Custom control</button>
  }}
>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
`}
>
  <UIKit.Select renderControl={({onClick, onKeyDown, ref}) => {
    return <button ref={ref} onClick={onClick} extraProps={{onKeyDown}}>Custom control</button>
  }}>
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
    <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
    <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
    <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
import {Button} from '@gravity-ui/uikit';

const MyComponent = () => {
  const renderControl: SelectProps['renderControl'] = ({onClick, onKeyDown, ref}) => {
    return (
      <Button
        ref={ref}
        onClick={onClick}
        extraProps={{
          onKeyDown,
        }}
      >
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
Обратите внимание, что для правильной работы фильтра необходимо передать все аргументы в узел (как при использовании стандартной конфигурации).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select
  placeholder="Custom filter"
  filterable={true}
  renderFilter={({onChange, onKeyDown, ref, value}) => {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <input
          ref={ref}
          value={value}
          size="1"
          onKeyDown={onKeyDown}
          onChange={(e) => onChange(e.target.value)}
        />
        <button>Do smth</button>
      </div>
    );
  }}
>
  <Select.Option value="val_1">Value 1</Select.Option>
</Select>
`}
>
  <UIKit.Select
    placeholder="Custom filter"
    filterable={true}
    renderFilter={({onChange, onKeyDown, ref, value}) => {
      return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <input
            ref={ref}
            value={value}
            size="1"
            onKeyDown={onKeyDown}
            onChange={(e) => onChange(e.target.value)}
          />
          <button>Do smth</button>
        </div>
      );
    }}
  >
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
    <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
    <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
    <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
import {Button, TextInput} from '@gravity-ui/uikit';
import type {SelectProps} from '@gravity-ui/uikit';

const MyComponent = () => {
  const renderFilter: SelectProps['renderFilter'] = (props) => {
    const {value, ref, onChange, onKeyDown} = props;

    return (
      <div>
        <TextInput
          controlRef={ref}
          controlProps={{size: 1}}
          value={value}
          onUpdate={onChange}
          onKeyDown={onKeyDown}
        />
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

Для отображения пользовательских опций используйте свойство `renderOption`:

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select
  renderOption={(option) => {
    return (
      <div style={{color: option.data.color}}>
        {option.children}
      </div>
    );
  }}
>
  <Select.Option value="val_1" data={{color: '#8FE1A1'}}>Value 1</Select.Option>
  <Select.Option value="val_2" data={{color: '#38C0A8'}}>Value 2</Select.Option>
  <Select.Option value="val_3" data={{color: '#3A7AC3'}}>Value 3</Select.Option>
  <Select.Option value="val_4" data={{color: '#534581'}}>Value 4</Select.Option>
</Select>
`}
>
  <UIKit.Select
    placeholder="Custom options"
    renderOption={(option) => {
      return (
        <div style={{color: option.data.color}}>
          {option.children}
        </div>
      );
    }}
  >
    <UIKit.Select.Option value="val_1" data={{color: '#8FE1A1'}}>Value 1</UIKit.Select.Option>
    <UIKit.Select.Option value="val_2" data={{color: '#38C0A8'}}>Value 2</UIKit.Select.Option>
    <UIKit.Select.Option value="val_3" data={{color: '#3A7AC3'}}>Value 3</UIKit.Select.Option>
    <UIKit.Select.Option value="val_4" data={{color: '#534581'}}>Value 4</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select
  renderSelectedOption={(option) => {
    return (
      <div style={{color: option.data.color}}>
        {option.children}
      </div>
    );
  }}
>
  <Select.Option value="val_1" data={{color: '#8FE1A1'}}>Value 1</Select.Option>
  <Select.Option value="val_2" data={{color: '#38C0A8'}}>Value 2</Select.Option>
  <Select.Option value="val_3" data={{color: '#3A7AC3'}}>Value 3</Select.Option>
  <Select.Option value="val_4" data={{color: '#534581'}}>Value 4</Select.Option>
</Select>
`}
>
  <UIKit.Select
    placeholder="Custom selected options"
    renderSelectedOption={(option) => {
      return (
        <div style={{color: option.data.color}}>
          {option.children}
        </div>
      );
    }}
  >
    <UIKit.Select.Option value="val_1" data={{color: '#8FE1A1'}}>Value 1</UIKit.Select.Option>
    <UIKit.Select.Option value="val_2" data={{color: '#38C0A8'}}>Value 2</UIKit.Select.Option>
    <UIKit.Select.Option value="val_3" data={{color: '#3A7AC3'}}>Value 3</UIKit.Select.Option>
    <UIKit.Select.Option value="val_4" data={{color: '#534581'}}>Value 4</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

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

Опции имеют фиксированную высоту, в соответсвии с заданным свойством `size`. Если нужно отобразить опции с разной высотой, используйте свойство `option.data`, которое будет содержать информацию о требуемой высоте опции, а также `getOptionHeight` для установки этого значения.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select
  getOptionHeight={(option) => option.data.height}
>
  <Select.Option value="val_1" data={{height: 20}}>Value 1</Select.Option>
  <Select.Option value="val_2" data={{height: 40}}>Value 2</Select.Option>
  <Select.Option value="val_3" data={{height: 60}}>Value 3</Select.Option>
  <Select.Option value="val_4" data={{height: 80}}>Value 4</Select.Option>
</Select>
`}
>
  <UIKit.Select
    placeholder="Different heights"
    getOptionHeight={(option) => option.data.height}
  >
    <UIKit.Select.Option value="val_1" data={{height: 20}}>Value 1</UIKit.Select.Option>
    <UIKit.Select.Option value="val_2" data={{height: 40}}>Value 2</UIKit.Select.Option>
    <UIKit.Select.Option value="val_3" data={{height: 60}}>Value 3</UIKit.Select.Option>
    <UIKit.Select.Option value="val_4" data={{height: 80}}>Value 4</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select
  multiple={true}
  hasCounter={true}
  renderCounter={(_, {count, disabled}) => {
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
  }}
>
  <Select.Option value="val_1">Value 1</Select.Option>
  <Select.Option value="val_2">Value 2</Select.Option>
  <Select.Option value="val_3">Value 3</Select.Option>
  <Select.Option value="val_4">Value 4</Select.Option>
</Select>
`}
>
  <UIKit.Select
    multiple={true}
    hasCounter={true}
    renderCounter={(_, {count, disabled}) => {
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
    }}
  >
    <UIKit.Select.Option value="val_1">Value 1</UIKit.Select.Option>
    <UIKit.Select.Option value="val_2">Value 2</UIKit.Select.Option>
    <UIKit.Select.Option value="val_3">Value 3</UIKit.Select.Option>
    <UIKit.Select.Option value="val_4">Value 4</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Select
  filterable
  placeholder="Custom popup"
  renderPopup={({renderList, renderFilter}) => {
    return (
      <React.Fragment>
        {renderFilter()}
        <div style={{width: "100%", height: "20px", backgroundColor: "tomato"}} />
        {renderList()}
      </React.Fragment>
    );
  }}
>
  <Select.Option value="val_1" data={{color: '#8FE1A1'}}>Value 1</Select.Option>
  <Select.Option value="val_2" data={{color: '#38C0A8'}}>Value 2</Select.Option>
  <Select.Option value="val_3" data={{color: '#3A7AC3'}}>Value 3</Select.Option>
  <Select.Option value="val_4" data={{color: '#534581'}}>Value 4</Select.Option>
</Select>
`}
>
  <UIKit.Select
    filterable
    placeholder="Custom popup"
    renderPopup={({renderList, renderFilter}) => {
      return (
        <React.Fragment>
          {renderFilter()}
          <div style={{width: "100%", height: "20px", backgroundColor: "tomato"}} />
          {renderList()}
        </React.Fragment>
  );
}}
  >
    <UIKit.Select.Option value="val_1" data={{color: '#8FE1A1'}}>Value 1</UIKit.Select.Option>
    <UIKit.Select.Option value="val_2" data={{color: '#38C0A8'}}>Value 2</UIKit.Select.Option>
    <UIKit.Select.Option value="val_3" data={{color: '#3A7AC3'}}>Value 3</UIKit.Select.Option>
    <UIKit.Select.Option value="val_4" data={{color: '#534581'}}>Value 4</UIKit.Select.Option>
  </UIKit.Select>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Select placeholder="Placeholder" errorMessage="Error message" validationState="invalid" />
<Select placeholder="Placeholder" errorPlacement="inside" errorMessage="Error message" validationState="invalid" />
`}
>
    <UIKit.Select placeholder="Placeholder" errorMessage="Error message" validationState="invalid" />
    <UIKit.Select placeholder="Placeholder" errorPlacement="inside" errorMessage="Error message" validationState="invalid" />
</ExampleBlock>
LANDING_BLOCK-->

## Свойства

| Имя                                                       | Описание                                                                                                                                  | Тип                                      | Значение по умолчанию                                    |
| :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- | :------------------------------------------------------- |
| className                                                 | Имя класса контрола.                                                                                                                      | `string`                                 |                                                          |
| defaultValue                                              | Значения по умолчанию для выбранных опций в случае использования неуправляемого состояния.                                                | `string[]`                               |                                                          |
| disabled                                                  | Указывает на то, что пользователь не может взаимодействовать с контролом.                                                                 | `boolean`                                | `false`                                                  |
| [filterable](#filtering-options)                          | Указывает на то, что список опций содержит секцию фильтрации.                                                                             | `boolean`                                | `false`                                                  |
| filterOption                                              | Используется для сравнения опции со значением фильтра.                                                                                    | `function`                               |                                                          |
| filterPlaceholder                                         | Текст-заглушка по умолчанию для поля ввода фильтра.                                                                                       | `string`                                 |                                                          |
| [getOptionHeight](#render-options-with-different-heights) | Используется для задания высоты опций.                                                                                                    | `function`                               |                                                          |
| getOptionGroupHeight                                      | Используется для задания высоты заголовка группы опций.                                                                                   | `function`                               |                                                          |
| hasClear                                                  | Позволяет отображать иконку для очистки выбранных опций.                                                                                  | `boolean`                                | `false`                                                  |
| id                                                        | HTML-атрибут `id`.                                                                                                                        | `string`                                 |                                                          |
| label                                                     | Лейбл контрола.                                                                                                                           | `string`                                 |                                                          |
| loading                                                   | Добавляет элемент загрузки в конец списка опций. Работает как постоянный индикатор загрузки, пока список опций пуст.                      | `boolean`                                |                                                          |
| [multiple](#selecting-multiple-options)                   | Включает множественный выбор опций.                                                                                                       | `boolean`                                | `false`                                                  |
| name                                                      | Имя контрола.                                                                                                                             | `string`                                 |                                                          |
| onBlur                                                    | Обработчик, который вызывается, когда элемент теряет фокус.                                                                               | `function`                               |                                                          |
| filter                                                    | Контролируемое значение фильтра.                                                                                                          | `string`                                 | `''`                                                     |
| onFilterChange                                            | Срабатывает при каждом изменении фильтра.                                                                                                 | `function`                               |                                                          |
| onFocus                                                   | Обработчик, который вызывается, когда элемент получает фокус.                                                                             | `function`                               |                                                          |
| onLoadMore                                                | Срабатывает, когда индикатор загрузки становится видимым.                                                                                 | `function`                               |                                                          |
| onOpenChange                                              | Срабатывает при каждом изменении видимости списка опций.                                                                                  | `function`                               |                                                          |
| onUpdate                                                  | Срабатывает, когда пользователь подтверждает изменение значения `Select`.                                                                 | `function`                               |                                                          |
| [options](#options)                                       | Конфигурация опций.                                                                                                                       | `(SelectOption \| SelectOptionGroup)[]`  |                                                          |
| pin                                                       | Вид границ контрола.                                                                                                                      | `string`                                 | `'round-round'`                                          |
| placeholder                                               | Текст-заглушка.                                                                                                                           | `string`                                 |                                                          |
| popupClassName                                            | Имя класса (`className`) для списка опций.                                                                                                | `string`                                 |                                                          |
| popupPlacement                                            | Размещение списка опций относительно контрола.                                                                                            | `PopupPlacement` `Array<PopupPlacement>` | `['bottom-start', 'bottom-end', 'top-start', 'top-end']` |
| [popupWidth](#popup-width)                                | Ширина списка опций.                                                                                                                      | `number \| 'fit' \| 'outfit'`            | `'outfit'`                                               |
| qa                                                        | Атрибут идентификатора для тестирования (`data-qa`).                                                                                      | `string`                                 |                                                          |
| [renderControl](#render-custom-control)                   | Используется для рендеринга пользовательского контрола.                                                                                   | `function`                               |                                                          |
| [renderCounter](#render-custom-counter)                   | Используется для рендеринга пользовательского счетчика. Работает только с [hasCounter](#counter).                                         | `function`                               |                                                          |
| renderEmptyOptions                                        | Используется для рендеринга узла для пустого списка опций.                                                                                | `function`                               |                                                          |
| [renderFilter](#render-custom-filter-section)             | Используется для рендеринга секции пользовательской фильтрации.                                                                           | `function`                               |                                                          |
| [renderOption](#render-custom-options)                    | Используется для рендеринга пользовательских опций.                                                                                       | `function`                               |                                                          |
| renderOptionGroup                                         | Используется для рендеринга заголовков групп опций.                                                                                       | `function`                               |                                                          |
| [renderSelectedOption](#render-custom-selected-options)   | Используется для рендеринга выбранных опций.                                                                                              | `function`                               |                                                          |
| [renderPopup](#render-custom-popup)                       | Используется для рендеринга содержимого списка опций.                                                                                     | `function`                               |                                                          |
| [size](#size)                                             | Размер контрола и опций.                                                                                                                  | `string`                                 | `'m'`                                                    |
| value                                                     | Значения для выбранных опций, которые передаются в обработчик `onUpdate`.                                                                 | `string[]`                               |                                                          |
| view                                                      | Вид контрола.                                                                                                                             | `string`                                 | `'normal'`                                               |
| [virtualizationThreshold](#virtualized-list)              | Порог количества опций, после которого включается виртуализация.                                                                          | `number`                                 | `50`                                                     |
| [width](#control-width)                                   | Ширина контрола                                                                                                                           | `string \| number`                       | `undefined`                                              |
| errorMessage                                              | Текст ошибки.                                                                                                                             | `string`                                 |                                                          |
| errorPlacement                                            | Положение отображения ошибки.                                                                                                             | `outside` `inside`                       | `outside`                                                |
| validationState                                           | Состояние валидации.                                                                                                                      | `"invalid"`                              |                                                          |
| [hasCounter](#counter)                                    | Показывает количество выбранных опций. Счетчик появляется только тогда, когда включен [множественный](#selecting-multiple-options) выбор. | `boolean`                                |                                                          |

## API CSS

| Имя                              | Описание                                                        |
| :------------------------------- | :-------------------------------------------------------------- |
| `--g-select-focus-outline-color` | Цвет обводки при фокусе на элементе (по умолчанию отсутствует). |
