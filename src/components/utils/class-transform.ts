export interface ElementClass {
    block: string;
    element?: string;
    mod?: {
        key: string;
        value: string | boolean;
    };
}

export function parseClass(strClass: string): ElementClass {
    const split = strClass.split('_').filter((str) => str);
    if (strClass.includes('__')) {
        return {
            block: split[0],
            element: split[1],
            mod: split[2]
                ? {
                      key: split[2],
                      value: split[3] ? split[3] : true,
                  }
                : undefined,
        };
    }

    return {
        block: split[0],
        mod: split[1]
            ? {
                  key: split[1],
                  value: split[2] ? split[2] : true,
              }
            : undefined,
    };
}

export function formatClass(objClass: ElementClass): string {
    let result = objClass.block;
    if (objClass.element) {
        result = `${result}__${objClass.element}`;
    }
    if (objClass.mod?.value) {
        result = `${result}_${objClass.mod.key}`;
        if (typeof objClass.mod.value === 'string') {
            result = `${result}_${objClass.mod.value}`;
        }
    }
    return result;
}
