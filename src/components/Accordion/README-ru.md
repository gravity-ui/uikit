<!--GITHUB_BLOCK-->

# Accordion

<!--/GITHUB_BLOCK-->

```tsx
import {Accordion} from '@gravity-ui/uikit';
```

Компонент Accordion позволяет создавать сворачиваемые панели контента, где пользователи могут показывать или скрывать разделы информации. Это полезно для организации больших объемов контента в компактном виде.

<!--GITHUB_BLOCK-->

## Базовый пример

```tsx
<Accordion>
  <Accordion.Item summary="Первый элемент">Содержимое первого элемента</Accordion.Item>
  <Accordion.Item summary="Второй элемент">Содержимое второго элемента</Accordion.Item>
  <Accordion.Item summary="Третий элемент">Содержимое третьего элемента</Accordion.Item>
</Accordion>
```

<!--/GITHUB_BLOCK-->

## Управление состоянием аккордеона

Вы можете управлять состоянием аккордеона, используя свойства `value` и `onUpdate` корневого компонента или для каждого элемента отдельно.

Пример управления состоянием из корневого компонента:

<!--LANDING_BLOCK
<ExampleBlock
    code={`
function ControlledAccordion() {
    const [value, setValue] = React.useState('item1');

    return (
        <Accordion value={value} onUpdate={setValue}>
            <Accordion.Item summary="Настройки" value="item1">
                Настройте параметры вашего приложения
            </Accordion.Item>
            <Accordion.Item summary="Уведомления" value="item2">
                Управляйте настройками уведомлений
            </Accordion.Item>
        </Accordion>
    );
}
`}>
    <UIKit.Accordion defaultValue="item1">
        <UIKit.Accordion.Item summary="Настройки" value="item1">
            <UIKit.Text>Настройте параметры вашего приложения</UIKit.Text>
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Уведомления" value="item2">
            <UIKit.Text>Управляйте настройками уведомлений</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
function ControlledAccordion() {
  const [value, setValue] = React.useState('item1');

  return (
    <Accordion value={value} onUpdate={setValue}>
      <Accordion.Item summary="Настройки" value="item1">
        Настройте параметры вашего приложения
      </Accordion.Item>
      <Accordion.Item summary="Уведомления" value="item2">
        Управляйте настройками уведомлений
      </Accordion.Item>
    </Accordion>
  );
}
```

<!--/GITHUB_BLOCK-->

Пример управления состоянием для каждого элемента через свойство expanded:

<!--LANDING_BLOCK
<ExampleBlock
    code={`
function ControlledAccordion() {
    const [item1, setItem1] = React.useState(true);
    const [item2, setItem2] = React.useState(false);
    return (
        <Accordion>
            <Accordion.Item
                summary="Настройки"
                onUpdate={setItem1}
                value="item1"
                expanded={item1}
            >
                Настройте параметры вашего приложения
            </Accordion.Item>
            <Accordion.Item
                summary="Уведомления"
                onUpdate={setItem2}
                value="item2"
                expanded={item2}
            >
                Управляйте настройками уведомлений
            </Accordion.Item>
        </Accordion>
    );
}
`}>
    <UIKit.Accordion defaultValue="item1">
        <UIKit.Accordion.Item summary="Настройки" value="item1">
            <UIKit.Text>Настройте параметры вашего приложения</UIKit.Text>
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Уведомления" value="item2">
            <UIKit.Text>Управляйте настройками уведомлений</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
function ControlledAccordion() {
  const [item1, setItem1] = React.useState(true);
  const [item2, setItem2] = React.useState(false);
  return (
    <Accordion>
      <Accordion.Item summary="Настройки" onUpdate={setItem1} value="item1" expanded={item1}>
        Настройте параметры вашего приложения
      </Accordion.Item>
      <Accordion.Item summary="Уведомления" onUpdate={setItem2} value="item2" expanded={item2}>
        Управляйте настройками уведомлений
      </Accordion.Item>
    </Accordion>
  );
}
```

<!--/GITHUB_BLOCK-->

## Размер

Используйте свойство `size` для управления размером `Accordion`. Размер по умолчанию — `m`.

<!--LANDING_BLOCK
<ExampleBlock>
    <UIKit.Accordion size="m">
        <UIKit.Accordion.Item summary="Средний размер">
            <UIKit.Text>Содержимое для среднего аккордеона</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
    <UIKit.Accordion size="l">
        <UIKit.Accordion.Item summary="Большой размер">
            <UIKit.Text>Содержимое для большого аккордеона</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
    <UIKit.Accordion size="xl">
        <UIKit.Accordion.Item summary="Очень большой размер">
            <UIKit.Text>Содержимое для очень большого аккордеона</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Accordion size="m">
    <Accordion.Item summary="Средний размер">
        Содержимое для среднего аккордеона
    </Accordion.Item>
</Accordion>
<Accordion size="l">
    <Accordion.Item summary="Большой размер">
        Содержимое для большого аккордеона
    </Accordion.Item>
</Accordion>
<Accordion size="xl">
    <Accordion.Item summary="Очень большой размер">
        Содержимое для очень большого аккордеона
    </Accordion.Item>
</Accordion>
```

<!--/GITHUB_BLOCK-->

## Внешний вид

`solid`: Основной вид с фоном (используется по умолчанию).

`top-bottom`: Вид с верхней и нижней границами.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Accordion view="solid">
    <Accordion.Item summary="Сплошной вид">
        Содержимое со сплошным фоном
    </Accordion.Item>
    <Accordion.Item summary="Другой элемент">
        Больше содержимого
    </Accordion.Item>
</Accordion>
<Accordion view="top-bottom">
    <Accordion.Item summary="Вид с границами">
        Содержимое с верхней и нижней границами
    </Accordion.Item>
    <Accordion.Item summary="Другой элемент">
        Больше содержимого
    </Accordion.Item>
</Accordion>
`}>
    <UIKit.Accordion view="solid">
        <UIKit.Accordion.Item summary="Сплошной вид">
            <UIKit.Text>Содержимое со сплошным фоном</UIKit.Text>
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Другой элемент">
            <UIKit.Text>Больше содержимого</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
    <UIKit.Accordion view="top-bottom">
        <UIKit.Accordion.Item summary="Вид с границами">
            <UIKit.Text>Содержимое с верхней и нижней границами</UIKit.Text>
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Другой элемент">
            <UIKit.Text>Больше содержимого</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Accordion view="solid">
    <Accordion.Item summary="Сплошной вид">
        Содержимое со сплошным фоном
    </Accordion.Item>
    <Accordion.Item summary="Другой элемент">
        Больше содержимого
    </Accordion.Item>
</Accordion>
<Accordion view="top-bottom">
    <Accordion.Item summary="Вид с границами">
        Содержимое с верхней и нижней границами
    </Accordion.Item>
    <Accordion.Item summary="Другой элемент">
        Больше содержимого
    </Accordion.Item>
</Accordion>
```

<!--/GITHUB_BLOCK-->

## Позиция стрелки

`end`: Стрелка расположена в конце заголовка (используется по умолчанию).

`start`: Стрелка расположена в начале заголовка.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Accordion arrowPosition="end">
    <Accordion.Item summary="Стрелка в конце">
        Содержимое со стрелкой в конце
    </Accordion.Item>
</Accordion>
<Accordion arrowPosition="start">
    <Accordion.Item summary="Стрелка в начале">
        Содержимое со стрелкой в начале
    </Accordion.Item>
</Accordion>
`}>
    <UIKit.Accordion arrowPosition="end">
        <UIKit.Accordion.Item summary="Стрелка в конце">
            <UIKit.Text>Содержимое со стрелкой в конце</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
    <UIKit.Accordion arrowPosition="start">
        <UIKit.Accordion.Item summary="Стрелка в начале">
            <UIKit.Text>Содержимое со стрелкой в начале</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Accordion arrowPosition="end">
    <Accordion.Item summary="Стрелка в конце">
        Содержимое со стрелкой в конце
    </Accordion.Item>
</Accordion>
<Accordion arrowPosition="start">
    <Accordion.Item summary="Стрелка в начале">
        Содержимое со стрелкой в начале
    </Accordion.Item>
</Accordion>
```

<!--/GITHUB_BLOCK-->

## Множественное раскрытие

Свойство `multiple` позволяет одновременно раскрывать несколько элементов аккордеона.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Accordion multiple>
    <Accordion.Item summary="Первый элемент">
        Содержимое первого элемента
    </Accordion.Item>
    <Accordion.Item summary="Второй элемент">
        Содержимое второго элемента
    </Accordion.Item>
    <Accordion.Item summary="Третий элемент">
        Содержимое третьего элемента
    </Accordion.Item>
</Accordion>
`}>
    <UIKit.Accordion multiple>
        <UIKit.Accordion.Item summary="Первый элемент">
            <UIKit.Text>Содержимое первого элемента</UIKit.Text>
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Второй элемент">
            <UIKit.Text>Содержимое второго элемента</UIKit.Text>
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Третий элемент">
            <UIKit.Text>Содержимое третьего элемента</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Accordion multiple>
  <Accordion.Item summary="Первый элемент">Содержимое первого элемента</Accordion.Item>
  <Accordion.Item summary="Второй элемент">Содержимое второго элемента</Accordion.Item>
  <Accordion.Item summary="Третий элемент">Содержимое третьего элемента</Accordion.Item>
</Accordion>
```

<!--/GITHUB_BLOCK-->

## Пользовательский заголовок

Используйте компонент `Accordion.Summary` для создания пользовательского заголовка.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Accordion>
    <Accordion.Item value="custom">
        <Accordion.Summary>
            {(props) => (
                <Button {...props} view="flat" width="max">
                    <Icon data={Settings} size={16} />
                    Пользовательская кнопка заголовка
                </Button>
            )}
        </Accordion.Summary>
        Содержимое с пользовательским компонентом заголовка
    </Accordion.Item>
    <Accordion.Item summary="Обычный заголовок">
        Содержимое с обычным свойством заголовка
    </Accordion.Item>
</Accordion>
`}>
    <UIKit.Accordion>
        <UIKit.Accordion.Item value="custom">
            <UIKit.Accordion.Summary>
                {(props) => (
                    <UIKit.Button {...props} view="flat" width="max">
                        Пользовательская кнопка заголовка
                    </UIKit.Button>
                )}
            </UIKit.Accordion.Summary>
            <UIKit.Text>Содержимое с пользовательским компонентом заголовка</UIKit.Text>
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Обычный заголовок">
            <UIKit.Text>Содержимое с обычным свойством заголовка</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Accordion>
  <Accordion.Item value="custom">
    <Accordion.Summary>
      {(props) => (
        <Button {...props} view="flat" width="max">
          <Icon data={Settings} size={16} />
          Пользовательская кнопка заголовка
        </Button>
      )}
    </Accordion.Summary>
    Содержимое с пользовательским компонентом заголовка
  </Accordion.Item>
  <Accordion.Item summary="Обычный заголовок">
    Содержимое с обычным свойством заголовка
  </Accordion.Item>
</Accordion>
```

<!--/GITHUB_BLOCK-->

## Отключенное состояние

Отдельные элементы аккордеона могут быть отключены с помощью свойства `disabled`.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Accordion>
    <Accordion.Item summary="Активный элемент">
        Этот элемент активен и может быть раскрыт
    </Accordion.Item>
    <Accordion.Item summary="Отключенный элемент" disabled>
        Этот элемент отключен и не может быть раскрыт
    </Accordion.Item>
</Accordion>
`}>
    <UIKit.Accordion>
        <UIKit.Accordion.Item summary="Активный элемент">
            <UIKit.Text>Этот элемент активен и может быть раскрыт</UIKit.Text>
        </UIKit.Accordion.Item>
        <UIKit.Accordion.Item summary="Отключенный элемент" disabled>
            <UIKit.Text>Этот элемент отключен и не может быть раскрыт</UIKit.Text>
        </UIKit.Accordion.Item>
    </UIKit.Accordion>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Accordion>
  <Accordion.Item summary="Активный элемент">
    Этот элемент активен и может быть раскрыт
  </Accordion.Item>
  <Accordion.Item summary="Отключенный элемент" disabled>
    Этот элемент отключен и не может быть раскрыт
  </Accordion.Item>
</Accordion>
```

<!--/GITHUB_BLOCK-->

## Свойства

### Accordion

| Название      | Описание                                                     |               Тип               | По умолчанию |
| :------------ | :----------------------------------------------------------- | :-----------------------------: | :----------: |
| size          | Размер аккордеона                                            |       `"m"` `"l"` `"xl"`        |    `"m"`     |
| view          | Внешний вид аккордеона                                       |    `"solid"` `"top-bottom"`     |  `"solid"`   |
| multiple      | Разрешить одновременное раскрытие нескольких элементов       |            `boolean`            |   `false`    |
| arrowPosition | Позиция индикатора стрелки                                   |        `"start"` `"end"`        |   `"end"`    |
| defaultValue  | Значение по умолчанию для неконтролируемого состояния        | `string` `string[]` `undefined` |              |
| value         | Текущее значение для контролируемого состояния               | `string` `string[]` `undefined` |              |
| onUpdate      | Функция обратного вызова, вызываемая при изменении состояния |           `Function`            |              |
| ariaLevel     | Уровень заголовка для доступности                            |            `number`             |     `3`      |
| className     | CSS класс                                                    |            `string`             |              |
| qa            | HTML атрибут `data-qa`, используется для тестирования        |            `string`             |              |

### Accordion.Item

| Название        | Описание                                                              |        Тип        | По умолчанию |
| :-------------- | :-------------------------------------------------------------------- | :---------------: | :----------: |
| value           | Уникальный идентификатор элемента                                     |     `string`      |              |
| summary         | Заголовок элемента аккордеона                                         | `React.ReactNode` |              |
| expanded        | Контролируемое состояние раскрытия                                    |     `boolean`     |              |
| defaultExpanded | Состояние раскрытия по умолчанию                                      |     `boolean`     |              |
| disabled        | Отключает элемент аккордеона                                          |     `boolean`     |   `false`    |
| keepMounted     | Сохранять содержимое в DOM даже при сворачивании                      |     `boolean`     |              |
| onUpdate        | Функция обратного вызова, вызываемая при изменении состояния элемента |    `Function`     |              |
| className       | CSS класс                                                             |     `string`      |              |
| qa              | HTML атрибут `data-qa`, используется для тестирования                 |     `string`      |              |

### Accordion.Summary

| Название | Описание                                                                                                  |                       Тип                       |                                         По умолчанию                                          |
| :------- | :-------------------------------------------------------------------------------------------------------- | :---------------------------------------------: | :-------------------------------------------------------------------------------------------: |
| children | Пользовательская функция рендеринга заголовка                                                             | `(props, defaultSummary) => React.ReactElement` |                                                                                               |
| qa       | HTML атрибут `data-qa`, используется для тестирования. Работает только если `qa` передан в Accordion.Item |                    `string`                     | `${accordion-item}-summary` если `qa` передан в Accordion.Item, `disclosure-summary` если нет |
