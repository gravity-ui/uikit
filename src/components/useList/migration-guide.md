# 6.23

## ListItemView:

- changed prop `hasSelectionIcon?: boolean` to prop `selectionViewType?: 'multiple' | 'single'` with default value `multiple`;
- now mix of ccs class works that applied at root of component;
- ability to set item height by css custom property `--g-list-item-height`;
- new ability to pass custom react node as `content` prop;

```diff
    <ListItemView
-        hasSelectionIcon={hasSelectionIcon}
+        selectionViewType="multiple"
         selected={selected}
         height={height}
         active={active}
         activeOnHover={activeOnHover}
         onClick={handleClick(props)}
-        indentation={indentation}
-        expanded={selected}
-        title={title}
-        subtitle={subtitle}
-        startSlot={startSlot}
-        endSlot={endSlot}
+        content={{
+            isGroup,
+            indentation,
+            expanded,
+            title,
+            subtitle,
+            startSlot,
+            endSlot,
        }}
    />
```

## TreeList:

- changed `mapItemDataToProps` prop name to `mapItemDataToContentProps`:

```diff
    <TreeList<{title: string}>
        size="l"
        list={list}
-       mapItemDataToProps={item => ({title: item.text})}
+       mapItemDataToContentProps={item => ({title: item.text})}
        multiple={multiple}
        renderItem={({props, context: {childrenIds}}) => {
            return (
                <ListItemView
                    {...props}
-                   endSlot={childrenIds ? <Label>{childrenIds.length}</Label> : undefined}
+                   content={{
+                   ...props.content,
+                   endSlot: childrenIds ? (
+                       <Label>{childrenIds.length}</Label>
+                       ) : undefined,
                    }}
                />
            )
        })}
    />
```

## getItemRenderState:

- changed `mapItemDataToProps` prop name to `mapItemDataToContentProps`:

```diff
const {props, context} = getItemRenderState({
    id,
    size,
    onItemClick,
-   mapItemDataToProps: (x) => x,
+   mapItemDataToContentProps: (x) => x,
    list,
});
```
