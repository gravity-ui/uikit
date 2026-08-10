import path from 'node:path';

import ts from 'typescript';

export const ALLOWED_FIGMA_FILE_KEY = 'LlrQIz4F2Y06FJRdB4iE9U';
export const STICKY_COMMENT_MARKER = '<!-- gravity-ui-code-connect-contract -->';
export const EXPECTED_COMPONENT_NODE_IDS = {
    Avatar: '53348:563633',
    Button: '53098:497062',
    Checkbox: '53103:9376',
};

const PROPERTY_TYPES = new Set(['BOOLEAN', 'INSTANCE_SWAP', 'TEXT', 'VARIANT']);
const GETTER_BY_PROPERTY_TYPE = {
    BOOLEAN: 'getBoolean',
    INSTANCE_SWAP: 'getInstanceSwap',
    TEXT: 'getString',
    VARIANT: 'getEnum',
};
const PROPERTY_TYPE_BY_GETTER = Object.fromEntries(
    Object.entries(GETTER_BY_PROPERTY_TYPE).map(([propertyType, getter]) => [getter, propertyType]),
);
const MAX_JSON_BYTES = 256 * 1024;
const MAX_TEMPLATE_BYTES = 1024 * 1024;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const MAX_TRUSTED_FILES = 12;

function issue(code, fields = {}) {
    return {code, ...fields};
}

function compareText(left, right) {
    if (left < right) {
        return -1;
    }
    if (left > right) {
        return 1;
    }
    return 0;
}

function isPlainObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function componentKey(component) {
    return `${component.component}\0${component.nodeId}`;
}

function propertyKey(component, rawKey) {
    return `${component.component}\0${component.nodeId}\0${rawKey}`;
}

function validateTemplatePath(templatePath, component) {
    if (typeof templatePath !== 'string' || templatePath.includes('\\')) {
        return false;
    }
    const normalized = path.posix.normalize(templatePath);
    if (
        normalized !== templatePath ||
        normalized.startsWith('../') ||
        path.posix.isAbsolute(normalized)
    ) {
        return false;
    }
    return normalized === `src/components/${component}/${component}.figma.ts`;
}

function validateProperty(property, component) {
    const issues = [];
    if (!isPlainObject(property)) {
        return [issue('MALFORMED_PROPERTY', {component: component.component})];
    }
    if (typeof property.rawKey !== 'string' || property.rawKey.length === 0) {
        issues.push(issue('INVALID_RAW_KEY', {component: component.component}));
    }
    if (typeof property.name !== 'string' || property.name.trim().length === 0) {
        issues.push(
            issue('INVALID_PROPERTY_NAME', {
                component: component.component,
                rawKey: property.rawKey,
            }),
        );
    }
    if (!PROPERTY_TYPES.has(property.type)) {
        issues.push(
            issue('INVALID_PROPERTY_TYPE', {
                component: component.component,
                property: property.name,
                actual: property.type,
            }),
        );
    }
    if (Array.isArray(property.enumOptions) === false) {
        issues.push(
            issue('INVALID_ENUM_OPTIONS', {
                component: component.component,
                property: property.name,
            }),
        );
    } else {
        const uniqueOptions = new Set(property.enumOptions);
        const hasInvalidOption = property.enumOptions.some(
            (option) => typeof option !== 'string' || option.length === 0,
        );
        if (hasInvalidOption || uniqueOptions.size !== property.enumOptions.length) {
            issues.push(
                issue('INVALID_ENUM_OPTIONS', {
                    component: component.component,
                    property: property.name,
                }),
            );
        }
        if (property.type === 'VARIANT' && property.enumOptions.length === 0) {
            issues.push(
                issue('MISSING_ENUM_OPTIONS', {
                    component: component.component,
                    property: property.name,
                }),
            );
        }
        if (property.type !== 'VARIANT' && property.enumOptions.length > 0) {
            issues.push(
                issue('UNEXPECTED_ENUM_OPTIONS', {
                    component: component.component,
                    property: property.name,
                }),
            );
        }
    }
    if (Object.hasOwn(property, 'defaultValue') === false) {
        issues.push(
            issue('MISSING_DEFAULT_VALUE', {
                component: component.component,
                property: property.name,
            }),
        );
    }
    return issues;
}

export function validateSnapshotDocument(snapshot) {
    const issues = [];
    if (!isPlainObject(snapshot)) {
        return [issue('MALFORMED_SNAPSHOT')];
    }
    if (snapshot.schemaVersion !== 1) {
        issues.push(issue('INVALID_SCHEMA_VERSION', {actual: snapshot.schemaVersion}));
    }
    if (snapshot.fileKey !== ALLOWED_FIGMA_FILE_KEY) {
        issues.push(issue('INVALID_FILE_KEY', {actual: snapshot.fileKey}));
    }
    if (!Array.isArray(snapshot.components)) {
        issues.push(issue('MALFORMED_COMPONENTS'));
        return issues;
    }

    const seenComponents = new Set();
    const seenNodeIds = new Set();
    for (const component of snapshot.components) {
        if (!isPlainObject(component)) {
            issues.push(issue('MALFORMED_COMPONENT'));
            continue;
        }
        const nameIsValid =
            typeof component.component === 'string' &&
            /^[A-Z][A-Za-z0-9]*$/.test(component.component);
        if (!nameIsValid) {
            issues.push(issue('INVALID_COMPONENT_NAME', {component: component.component}));
        }
        const expectedNodeId = EXPECTED_COMPONENT_NODE_IDS[component.component];
        if (
            typeof component.nodeId !== 'string' ||
            !/^\d+:\d+$/.test(component.nodeId) ||
            (expectedNodeId && component.nodeId !== expectedNodeId)
        ) {
            issues.push(
                issue('INVALID_NODE_ID', {
                    component: component.component,
                    actual: component.nodeId,
                }),
            );
        }
        if (!validateTemplatePath(component.template, component.component)) {
            issues.push(
                issue('INVALID_TEMPLATE_PATH', {
                    component: component.component,
                    actual: component.template,
                }),
            );
        }

        const key = componentKey(component);
        if (seenComponents.has(key) || seenNodeIds.has(component.nodeId)) {
            issues.push(
                issue('DUPLICATE_COMPONENT', {
                    component: component.component,
                    nodeId: component.nodeId,
                }),
            );
        }
        seenComponents.add(key);
        seenNodeIds.add(component.nodeId);

        if (!Array.isArray(component.properties)) {
            issues.push(issue('MALFORMED_PROPERTIES', {component: component.component}));
            continue;
        }
        const seenRawKeys = new Set();
        const seenNames = new Set();
        for (const property of component.properties) {
            issues.push(...validateProperty(property, component));
            if (!isPlainObject(property)) {
                continue;
            }
            if (seenRawKeys.has(property.rawKey) || seenNames.has(property.name)) {
                issues.push(
                    issue('DUPLICATE_PROPERTY', {
                        component: component.component,
                        property: property.name,
                        rawKey: property.rawKey,
                    }),
                );
            }
            seenRawKeys.add(property.rawKey);
            seenNames.add(property.name);
        }
    }
    return issues;
}

function getStaticObjectKeys(node) {
    let expression = node;
    while (
        expression &&
        (ts.isParenthesizedExpression(expression) ||
            ts.isAsExpression(expression) ||
            ts.isSatisfiesExpression(expression))
    ) {
        expression = expression.expression;
    }
    if (!expression || !ts.isObjectLiteralExpression(expression)) {
        return {keys: [], dynamic: true};
    }
    const keys = [];
    let dynamic = false;
    for (const entry of expression.properties) {
        if (!ts.isPropertyAssignment(entry) && !ts.isShorthandPropertyAssignment(entry)) {
            dynamic = true;
            continue;
        }
        const name = entry.name;
        if (ts.isIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name)) {
            keys.push(name.text);
        } else {
            dynamic = true;
        }
    }
    return {keys, dynamic};
}

function isSelectedInstanceGetter(expression) {
    if (!ts.isPropertyAccessExpression(expression)) {
        return false;
    }
    const receiver = expression.expression;
    return (
        ts.isPropertyAccessExpression(receiver) &&
        ts.isIdentifier(receiver.expression) &&
        receiver.expression.text === 'figma' &&
        receiver.name.text === 'selectedInstance'
    );
}

function extractTemplateMappings(templatePath, source) {
    const sourceFile = ts.createSourceFile(
        templatePath,
        source,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS,
    );
    const mappings = [];
    const issues = [];

    for (const diagnostic of sourceFile.parseDiagnostics ?? []) {
        issues.push(
            issue('TEMPLATE_PARSE_ERROR', {
                template: templatePath,
                detail: ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
            }),
        );
    }

    function visit(node) {
        if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
            const getter = node.expression.name.text;
            if (getter === 'getPropertyValue' || getter === '__getPropertyValue__') {
                issues.push(issue('FORBIDDEN_GENERIC_GETTER', {template: templatePath}));
            } else if (Object.hasOwn(PROPERTY_TYPE_BY_GETTER, getter)) {
                if (!isSelectedInstanceGetter(node.expression)) {
                    issues.push(
                        issue('UNSUPPORTED_GETTER_RECEIVER', {
                            template: templatePath,
                            getter,
                        }),
                    );
                }
                const propertyArgument = node.arguments[0];
                if (!propertyArgument || !ts.isStringLiteralLike(propertyArgument)) {
                    issues.push(
                        issue('DYNAMIC_PROPERTY_NAME', {
                            template: templatePath,
                            getter,
                        }),
                    );
                } else {
                    const mapping = {
                        property: propertyArgument.text,
                        getter,
                        template: templatePath,
                    };
                    if (getter === 'getEnum') {
                        const enumMapping = getStaticObjectKeys(node.arguments[1]);
                        mapping.enumOptions = enumMapping.keys;
                        if (enumMapping.dynamic) {
                            issues.push(
                                issue('DYNAMIC_ENUM_OPTIONS', {
                                    template: templatePath,
                                    property: mapping.property,
                                }),
                            );
                        }
                    }
                    mappings.push(mapping);
                }
            }
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    return {issues, mappings};
}

function validateIgnoreDocument(ignores, componentsByKey, propertiesByKey) {
    const issues = [];
    const ignored = new Map();
    if (!isPlainObject(ignores) || ignores.schemaVersion !== 1 || !Array.isArray(ignores.ignores)) {
        return {ignored, issues: [issue('MALFORMED_IGNORES')]};
    }

    for (const entry of ignores.ignores) {
        if (!isPlainObject(entry)) {
            issues.push(issue('MALFORMED_IGNORE'));
            continue;
        }
        const syntheticComponent = {component: entry.component, nodeId: entry.nodeId};
        const key = propertyKey(syntheticComponent, entry.rawKey);
        if (typeof entry.reason !== 'string' || entry.reason.trim().length === 0) {
            issues.push(
                issue('EMPTY_IGNORE_REASON', {
                    component: entry.component,
                    rawKey: entry.rawKey,
                }),
            );
        }
        if (!componentsByKey.has(componentKey(syntheticComponent)) || !propertiesByKey.has(key)) {
            issues.push(
                issue('STALE_IGNORE', {
                    component: entry.component,
                    rawKey: entry.rawKey,
                }),
            );
        }
        if (ignored.has(key)) {
            issues.push(
                issue('DUPLICATE_IGNORE', {
                    component: entry.component,
                    rawKey: entry.rawKey,
                }),
            );
        }
        ignored.set(key, entry);
    }
    return {ignored, issues};
}

export function validateContract({snapshot, ignores, templates}) {
    const issues = [...validateSnapshotDocument(snapshot)];
    if (!isPlainObject(snapshot) || !Array.isArray(snapshot.components)) {
        return {status: 'FAIL', issues};
    }

    const componentsByKey = new Map(
        snapshot.components.map((component) => [componentKey(component), component]),
    );
    const propertiesByKey = new Map();
    for (const component of snapshot.components) {
        for (const property of component.properties ?? []) {
            propertiesByKey.set(propertyKey(component, property.rawKey), {component, property});
        }
    }

    const ignoreValidation = validateIgnoreDocument(ignores, componentsByKey, propertiesByKey);
    issues.push(...ignoreValidation.issues);

    for (const component of snapshot.components) {
        const source = templates?.[component.template];
        if (typeof source !== 'string') {
            issues.push(
                issue('MISSING_TEMPLATE', {
                    component: component.component,
                    template: component.template,
                }),
            );
            continue;
        }

        const extracted = extractTemplateMappings(component.template, source);
        issues.push(...extracted.issues.map((item) => ({component: component.component, ...item})));
        const mappingsByName = new Map();
        for (const mapping of extracted.mappings) {
            const current = mappingsByName.get(mapping.property) ?? [];
            current.push(mapping);
            mappingsByName.set(mapping.property, current);
        }

        for (const [name, mappings] of mappingsByName) {
            const property = component.properties.find((item) => item.name === name);
            if (!property) {
                issues.push(
                    issue('STALE_MAPPING', {
                        component: component.component,
                        property: name,
                        template: component.template,
                    }),
                );
                continue;
            }
            if (mappings.length > 1) {
                issues.push(
                    issue('DUPLICATE_MAPPING', {
                        component: component.component,
                        property: name,
                        template: component.template,
                    }),
                );
            }
            const mapping = mappings[0];
            const expectedGetter = GETTER_BY_PROPERTY_TYPE[property.type];
            if (mapping.getter !== expectedGetter) {
                issues.push(
                    issue('WRONG_GETTER_TYPE', {
                        component: component.component,
                        property: name,
                        expected: expectedGetter,
                        actual: mapping.getter,
                    }),
                );
            }
            if (property.type === 'VARIANT' && mapping.getter === 'getEnum') {
                const expectedOptions = new Set(property.enumOptions);
                const actualOptions = new Set(mapping.enumOptions ?? []);
                for (const option of expectedOptions) {
                    if (!actualOptions.has(option)) {
                        issues.push(
                            issue('MISSING_ENUM_MAPPING', {
                                component: component.component,
                                property: name,
                                option,
                            }),
                        );
                    }
                }
                for (const option of actualOptions) {
                    if (!expectedOptions.has(option)) {
                        issues.push(
                            issue('STALE_ENUM_MAPPING', {
                                component: component.component,
                                property: name,
                                option,
                            }),
                        );
                    }
                }
            }
        }

        for (const property of component.properties) {
            const mappings = mappingsByName.get(property.name) ?? [];
            const ignoreKey = propertyKey(component, property.rawKey);
            const isIgnored = ignoreValidation.ignored.has(ignoreKey);
            if (mappings.length === 0 && !isIgnored) {
                issues.push(
                    issue('MISSING_COVERAGE', {
                        component: component.component,
                        property: property.name,
                        rawKey: property.rawKey,
                    }),
                );
            }
            if (mappings.length > 0 && isIgnored) {
                issues.push(
                    issue('MAPPED_AND_IGNORED', {
                        component: component.component,
                        property: property.name,
                        rawKey: property.rawKey,
                    }),
                );
            }
        }
    }

    return {status: issues.length === 0 ? 'PASS' : 'FAIL', issues};
}

export function compareSnapshots(snapshot, live) {
    const issues = [];
    if (snapshot.fileKey !== live.fileKey) {
        issues.push(issue('FILE_KEY_CHANGED', {expected: snapshot.fileKey, actual: live.fileKey}));
    }
    const snapshotComponents = new Map(
        (snapshot.components ?? []).map((component) => [componentKey(component), component]),
    );
    const liveComponents = new Map(
        (live.components ?? []).map((component) => [componentKey(component), component]),
    );

    for (const [key, component] of liveComponents) {
        if (!snapshotComponents.has(key)) {
            issues.push(
                issue('ADDED_COMPONENT', {
                    component: component.component,
                    nodeId: component.nodeId,
                }),
            );
        }
    }
    for (const [key, component] of snapshotComponents) {
        const current = liveComponents.get(key);
        if (!current) {
            issues.push(
                issue('REMOVED_COMPONENT', {
                    component: component.component,
                    nodeId: component.nodeId,
                }),
            );
            continue;
        }
        const expectedProperties = new Map(
            component.properties.map((property) => [property.rawKey, property]),
        );
        const currentProperties = new Map(
            current.properties.map((property) => [property.rawKey, property]),
        );
        for (const [rawKey, property] of currentProperties) {
            if (!expectedProperties.has(rawKey)) {
                issues.push(
                    issue('ADDED_PROPERTY', {
                        component: component.component,
                        property: property.name,
                        rawKey,
                    }),
                );
            }
        }
        for (const [rawKey, property] of expectedProperties) {
            const currentProperty = currentProperties.get(rawKey);
            if (!currentProperty) {
                issues.push(
                    issue('REMOVED_PROPERTY', {
                        component: component.component,
                        property: property.name,
                        rawKey,
                    }),
                );
                continue;
            }
            if (property.type !== currentProperty.type) {
                issues.push(
                    issue('PROPERTY_TYPE_CHANGED', {
                        component: component.component,
                        property: property.name,
                        expected: property.type,
                        actual: currentProperty.type,
                    }),
                );
            }
            if (
                JSON.stringify(property.defaultValue) !==
                JSON.stringify(currentProperty.defaultValue)
            ) {
                issues.push(
                    issue('DEFAULT_VALUE_CHANGED', {
                        component: component.component,
                        property: property.name,
                        expected: property.defaultValue,
                        actual: currentProperty.defaultValue,
                    }),
                );
            }
            const expectedOptions = new Set(property.enumOptions ?? []);
            const currentOptions = new Set(currentProperty.enumOptions ?? []);
            for (const option of currentOptions) {
                if (!expectedOptions.has(option)) {
                    issues.push(
                        issue('ADDED_ENUM_OPTION', {
                            component: component.component,
                            property: property.name,
                            option,
                        }),
                    );
                }
            }
            for (const option of expectedOptions) {
                if (!currentOptions.has(option)) {
                    issues.push(
                        issue('REMOVED_ENUM_OPTION', {
                            component: component.component,
                            property: property.name,
                            option,
                        }),
                    );
                }
            }
        }
    }
    return issues;
}

function normalizePropertyName(rawKey) {
    return rawKey.replace(/^\s+/, '').replace(/#\d+:\d+$/, '');
}

export function normalizeFigmaNodes(response, {fileKey, templatesByNode}) {
    const components = [];
    for (const [nodeId, node] of Object.entries(response.nodes ?? {})) {
        const document = node?.document;
        if (!document || !templatesByNode[nodeId]) {
            continue;
        }
        const properties = Object.entries(document.componentPropertyDefinitions ?? {})
            .map(([rawKey, definition]) => ({
                rawKey,
                name: normalizePropertyName(rawKey),
                type: definition.type,
                defaultValue: definition.defaultValue,
                enumOptions:
                    definition.type === 'VARIANT' ? [...(definition.variantOptions ?? [])] : [],
            }))
            .sort((left, right) => compareText(left.rawKey, right.rawKey));
        components.push({
            component: document.name,
            nodeId,
            template: templatesByNode[nodeId],
            properties,
        });
    }
    components.sort(
        (left, right) =>
            compareText(left.component, right.component) || compareText(left.nodeId, right.nodeId),
    );
    return {schemaVersion: 1, fileKey, components};
}

export function serializeSnapshot(snapshot) {
    return `${JSON.stringify(snapshot, null, 4)}\n`;
}

function hasTraversal(filePath) {
    if (typeof filePath !== 'string' || filePath.includes('\0') || filePath.includes('\\')) {
        return true;
    }
    if (path.posix.isAbsolute(filePath)) {
        return true;
    }
    return filePath.split('/').some((part) => part === '..' || part === '');
}

function isAllowedTrustedPath(filePath) {
    return (
        filePath === 'code-connect/figma.schema.snapshot.json' ||
        filePath === 'code-connect/ignores.json' ||
        /^src\/components\/([A-Z][A-Za-z0-9]*)\/\1\.figma\.ts$/.test(filePath)
    );
}

export function validateTrustedFiles(files) {
    const issues = [];
    if (!Array.isArray(files)) {
        return [issue('MALFORMED_PR_DATA')];
    }
    if (files.length > MAX_TRUSTED_FILES) {
        issues.push(issue('TOO_MANY_PR_FILES', {actual: files.length, maximum: MAX_TRUSTED_FILES}));
    }
    const seen = new Set();
    let totalBytes = 0;
    for (const file of files) {
        if (
            !isPlainObject(file) ||
            typeof file.path !== 'string' ||
            typeof file.content !== 'string'
        ) {
            issues.push(issue('MALFORMED_PR_DATA'));
            continue;
        }
        if (hasTraversal(file.path)) {
            issues.push(issue('PATH_TRAVERSAL', {path: file.path}));
        } else if (!isAllowedTrustedPath(file.path)) {
            issues.push(issue('UNEXPECTED_PR_PATH', {path: file.path}));
        }
        if (seen.has(file.path)) {
            issues.push(issue('DUPLICATE_PR_PATH', {path: file.path}));
        }
        seen.add(file.path);
        const bytes = Buffer.byteLength(file.content, 'utf8');
        totalBytes += bytes;
        const maximum = file.path.endsWith('.json') ? MAX_JSON_BYTES : MAX_TEMPLATE_BYTES;
        if (bytes > maximum) {
            issues.push(issue('OVERSIZED_PR_DATA', {path: file.path, actual: bytes, maximum}));
        }
        if (file.path.endsWith('.json')) {
            try {
                JSON.parse(file.content);
            } catch {
                issues.push(issue('MALFORMED_JSON', {path: file.path}));
            }
        }
    }
    if (totalBytes > MAX_TOTAL_BYTES) {
        issues.push(issue('OVERSIZED_PR_DATA', {actual: totalBytes, maximum: MAX_TOTAL_BYTES}));
    }
    return issues;
}

export function classifyFigmaStatus(status) {
    if (status >= 200 && status < 300) {
        return 'PASS';
    }
    if (status === 401 || status === 403) {
        return 'AUTH_BLOCKED';
    }
    if (status === 429 || status >= 500) {
        return 'DATA_MISSING';
    }
    return 'FAIL';
}

export function planStickyCommentUpdate(comments, body) {
    const existing = comments.find(
        (comment) =>
            typeof comment.body === 'string' && comment.body.includes(STICKY_COMMENT_MARKER),
    );
    if (!existing) {
        return {action: 'create'};
    }
    if (existing.body === body) {
        return {action: 'none', commentId: existing.id};
    }
    return {action: 'update', commentId: existing.id};
}
