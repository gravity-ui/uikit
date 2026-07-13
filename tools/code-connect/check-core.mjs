import fs from 'node:fs';
import path from 'node:path';

import ts from 'typescript';

export const CANONICAL_FIGMA_FILE_KEY = 'LwOcKoxx9fpdYlUjqQhzzBb4';
export const SOURCE_PREFIX = 'https://github.com/gravity-ui/uikit/blob/main/';

function toRepoPath(rootDir, filePath) {
    return path.relative(rootDir, filePath).split(path.sep).join('/');
}

function locationFor(sourceFile, node) {
    const position = sourceFile.getLineAndCharacterOfPosition(node?.getStart(sourceFile) ?? 0);
    return {column: position.character + 1, line: position.line + 1};
}

function diagnostic(rootDir, sourceFile, node, code, message) {
    return {
        code,
        file: toRepoPath(rootDir, sourceFile.fileName),
        ...locationFor(sourceFile, node),
        message,
    };
}

function convertTypeScriptDiagnostic(rootDir, value) {
    const message = ts.flattenDiagnosticMessageText(value.messageText, '\n');
    if (!value.file) {
        return {code: `TS${value.code}`, column: 1, file: 'tsconfig.figma.json', line: 1, message};
    }

    const position = value.file.getLineAndCharacterOfPosition(value.start ?? 0);
    return {
        code: `TS${value.code}`,
        column: position.character + 1,
        file: toRepoPath(rootDir, value.file.fileName),
        line: position.line + 1,
        message,
    };
}

function propertyName(property) {
    if (!property.name) {
        return undefined;
    }
    if (ts.isIdentifier(property.name) || ts.isStringLiteralLike(property.name)) {
        return property.name.text;
    }
    return undefined;
}

function findDefaultExport(sourceFile) {
    const assignment = sourceFile.statements.find(
        (statement) => ts.isExportAssignment(statement) && !statement.isExportEquals,
    );
    return assignment && ts.isObjectLiteralExpression(assignment.expression)
        ? assignment.expression
        : undefined;
}

function findObjectProperty(object, name) {
    return object?.properties.find(
        (property) => ts.isPropertyAssignment(property) && propertyName(property) === name,
    );
}

function getStringProperty(object, name) {
    const property = findObjectProperty(object, name);
    return property && ts.isStringLiteralLike(property.initializer)
        ? property.initializer.text
        : undefined;
}

function extractMetadata(sourceFile) {
    const metadata = new Map();
    for (const line of sourceFile.text.split(/\r?\n/)) {
        const match = line.match(/^\/\/\s*(url|source|component)=(.+)$/);
        if (match) {
            metadata.set(match[1], match[2].trim());
        }
    }
    return metadata;
}

function parseFigmaUrl(value) {
    try {
        const url = new URL(value);
        const parts = url.pathname.split('/').filter(Boolean);
        const fileKey = parts[0] === 'design' ? parts[1] : undefined;
        const rawNodeId = url.searchParams.get('node-id');
        return {
            fileKey,
            nodeId: rawNodeId?.replaceAll('-', ':'),
            validHost: url.hostname === 'figma.com' || url.hostname === 'www.figma.com',
        };
    } catch {
        return {};
    }
}

function getSourcePath(rootDir, sourceUrl) {
    if (!sourceUrl?.startsWith(SOURCE_PREFIX)) {
        return undefined;
    }

    let repoPath;
    try {
        repoPath = decodeURIComponent(sourceUrl.slice(SOURCE_PREFIX.length));
    } catch {
        return undefined;
    }
    const filePath = path.resolve(rootDir, repoPath);
    const relativePath = path.relative(rootDir, filePath);
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
        return undefined;
    }
    return {filePath, repoPath: toRepoPath(rootDir, filePath)};
}

function moduleExportsComponent(checker, sourceFile, componentName) {
    const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
    return Boolean(
        moduleSymbol &&
            checker
                .getExportsOfModule(moduleSymbol)
                .some((symbol) => symbol.getName() === componentName),
    );
}

function validateImport(defaultExport, componentName) {
    const property = findObjectProperty(defaultExport, 'imports');
    if (!property || !ts.isArrayLiteralExpression(property.initializer)) {
        return false;
    }

    return property.initializer.elements.some((element) => {
        if (!ts.isStringLiteralLike(element)) {
            return false;
        }
        const sourceFile = ts.createSourceFile(
            'code-connect-import.ts',
            element.text,
            ts.ScriptTarget.Latest,
            true,
            ts.ScriptKind.TS,
        );
        return sourceFile.statements.some(
            (statement) =>
                ts.isImportDeclaration(statement) &&
                ts.isStringLiteral(statement.moduleSpecifier) &&
                statement.moduleSpecifier.text === '@gravity-ui/uikit' &&
                statement.importClause?.namedBindings &&
                ts.isNamedImports(statement.importClause.namedBindings) &&
                statement.importClause.namedBindings.elements.some(
                    (specifier) => specifier.name.text === componentName,
                ),
        );
    });
}

function findPropsAlias(sourceFile) {
    return sourceFile.statements.find(
        (statement) => ts.isTypeAliasDeclaration(statement) && statement.name.text === 'Props',
    );
}

function propsAliasMatchesComponent(propsAlias, componentName) {
    return Boolean(
        propsAlias &&
            componentName &&
            ts.isTypeReferenceNode(propsAlias.type) &&
            ts.isIdentifier(propsAlias.type.typeName) &&
            propsAlias.type.typeName.text === `${componentName}Props` &&
            !propsAlias.type.typeArguments?.length,
    );
}

function hasFlag(value, flag) {
    // TypeScript exposes TypeFlags and SymbolFlags as bitmasks.
    // eslint-disable-next-line no-bitwise
    return (value & flag) !== 0;
}

function typeIncludesUndefined(type) {
    if (hasFlag(type.flags, ts.TypeFlags.Undefined) || hasFlag(type.flags, ts.TypeFlags.Void)) {
        return true;
    }
    return type.isUnionOrIntersection() && type.types.some(typeIncludesUndefined);
}

function getPropertyInfo(checker, type, name, location) {
    if (type.isUnion()) {
        const branches = type.types.map((branch) =>
            getPropertyInfo(checker, branch, name, location),
        );
        const existing = branches.filter((branch) => branch.exists);
        return {
            exists: existing.length > 0,
            optional:
                existing.length !== branches.length || existing.some((branch) => branch.optional),
            types: existing.flatMap((branch) => branch.types),
        };
    }

    if (type.isIntersection()) {
        const branches = type.types.map((branch) =>
            getPropertyInfo(checker, branch, name, location),
        );
        const existing = branches.filter((branch) => branch.exists);
        return {
            exists: existing.length > 0,
            optional: existing.length > 0 && existing.every((branch) => branch.optional),
            types: existing.flatMap((branch) => branch.types),
        };
    }

    const symbol = checker.getPropertyOfType(type, name);
    if (!symbol) {
        return {exists: false, optional: false, types: []};
    }

    const propertyType = checker.getTypeOfSymbolAtLocation(
        symbol,
        symbol.valueDeclaration || location,
    );
    return {
        exists: true,
        optional:
            hasFlag(symbol.flags, ts.SymbolFlags.Optional) || typeIncludesUndefined(propertyType),
        types: [propertyType],
    };
}

function typeParts(type) {
    return type.isUnion() ? type.types.flatMap(typeParts) : [type];
}

function isUndefinedType(type) {
    return hasFlag(type.flags, ts.TypeFlags.Undefined) || hasFlag(type.flags, ts.TypeFlags.Void);
}

function isAssignable(checker, sourceType, property) {
    return typeParts(sourceType).every((sourcePart) => {
        if (isUndefinedType(sourcePart) && property.optional) {
            return true;
        }
        return property.types.some((targetType) =>
            checker.isTypeAssignableTo(sourcePart, targetType),
        );
    });
}

function resolveInitializer(checker, expression, seen = new Set()) {
    if (ts.isParenthesizedExpression(expression)) {
        return resolveInitializer(checker, expression.expression, seen);
    }
    if (!ts.isIdentifier(expression)) {
        return expression;
    }

    const symbol = checker.getSymbolAtLocation(expression);
    if (!symbol || seen.has(symbol)) {
        return expression;
    }
    seen.add(symbol);
    const declaration = symbol.valueDeclaration;
    return declaration && ts.isVariableDeclaration(declaration) && declaration.initializer
        ? resolveInitializer(checker, declaration.initializer, seen)
        : expression;
}

function containsCodeValueHelper(checker, expression) {
    const resolved = resolveInitializer(checker, expression);
    if (ts.isConditionalExpression(resolved)) {
        return (
            containsCodeValueHelper(checker, resolved.whenTrue) ||
            containsCodeValueHelper(checker, resolved.whenFalse)
        );
    }
    if (!ts.isCallExpression(resolved)) {
        return false;
    }

    const name = resolved.expression.getText();
    return /figma\.helpers\.react\.(identifier|jsxElement|reactComponent)$/.test(name);
}

function callName(node) {
    return ts.isCallExpression(node) ? node.expression.getText() : '';
}

function walk(node, visit) {
    visit(node);
    node.forEachChild((child) => walk(child, visit));
}

function validateRenderCalls({checker, propsAlias, rootDir, sourceFile}) {
    if (!propsAlias) {
        return [];
    }

    const diagnostics = [];
    const propsType = checker.getTypeFromTypeNode(propsAlias.type);
    walk(sourceFile, (node) => {
        const name = callName(node);
        if (name.endsWith('.renderChildren')) {
            const children = getPropertyInfo(checker, propsType, 'children', propsAlias);
            if (!children.exists) {
                diagnostics.push(
                    diagnostic(
                        rootDir,
                        sourceFile,
                        node,
                        'CC008',
                        'renderChildren is used but Props has no children prop',
                    ),
                );
            }
            return;
        }

        if (!name.endsWith('.renderProp')) {
            return;
        }

        const [nameArgument, valueArgument] = node.arguments;
        if (!nameArgument || !ts.isStringLiteralLike(nameArgument) || !valueArgument) {
            diagnostics.push(
                diagnostic(
                    rootDir,
                    sourceFile,
                    node,
                    'CC006',
                    'renderProp requires a literal prop name and a value',
                ),
            );
            return;
        }

        const property = getPropertyInfo(checker, propsType, nameArgument.text, propsAlias);
        if (!property.exists) {
            diagnostics.push(
                diagnostic(
                    rootDir,
                    sourceFile,
                    nameArgument,
                    'CC006',
                    `${nameArgument.text} is not a public React prop of Props`,
                ),
            );
            return;
        }

        if (containsCodeValueHelper(checker, valueArgument)) {
            return;
        }

        const valueType = checker.getTypeAtLocation(valueArgument);
        if (!isAssignable(checker, valueType, property)) {
            const expected = [...new Set(property.types.map((type) => checker.typeToString(type)))];
            diagnostics.push(
                diagnostic(
                    rootDir,
                    sourceFile,
                    valueArgument,
                    'CC007',
                    `${checker.typeToString(valueType)} is not assignable to ${nameArgument.text}: ${expected.join(' | ')}`,
                ),
            );
        }
    });
    return diagnostics;
}

function validateTemplate({checker, program, rootDir, sourceFile}) {
    const diagnostics = [];
    const metadata = extractMetadata(sourceFile);
    const figmaUrl = metadata.get('url');
    const sourceUrl = metadata.get('source');
    const componentName = metadata.get('component');
    const parsedFigmaUrl = parseFigmaUrl(figmaUrl);

    for (const field of ['url', 'source', 'component']) {
        if (!metadata.get(field)) {
            diagnostics.push(
                diagnostic(
                    rootDir,
                    sourceFile,
                    sourceFile,
                    'CC001',
                    `Missing // ${field}= metadata`,
                ),
            );
        }
    }

    if (
        !parsedFigmaUrl.validHost ||
        !parsedFigmaUrl.nodeId ||
        parsedFigmaUrl.fileKey !== CANONICAL_FIGMA_FILE_KEY
    ) {
        diagnostics.push(
            diagnostic(
                rootDir,
                sourceFile,
                sourceFile,
                'CC002',
                `Figma URL must target ${CANONICAL_FIGMA_FILE_KEY} and include node-id`,
            ),
        );
    }

    const source = getSourcePath(rootDir, sourceUrl);
    if (!source) {
        diagnostics.push(
            diagnostic(
                rootDir,
                sourceFile,
                sourceFile,
                'CC003',
                `Source URL must start with ${SOURCE_PREFIX}`,
            ),
        );
    }

    const defaultExport = findDefaultExport(sourceFile);
    const id = getStringProperty(defaultExport, 'id');
    if (!id) {
        diagnostics.push(
            diagnostic(
                rootDir,
                sourceFile,
                defaultExport || sourceFile,
                'CC009',
                'Template id is required',
            ),
        );
    }

    if (source && componentName) {
        const componentSource = program.getSourceFile(source.filePath);
        if (
            !fs.existsSync(source.filePath) ||
            !componentSource ||
            !moduleExportsComponent(checker, componentSource, componentName) ||
            !validateImport(defaultExport, componentName)
        ) {
            diagnostics.push(
                diagnostic(
                    rootDir,
                    sourceFile,
                    defaultExport || sourceFile,
                    'CC004',
                    `Source, exported component, and @gravity-ui/uikit import must agree for ${componentName}`,
                ),
            );
        }
    }

    const propsAlias = findPropsAlias(sourceFile);
    if (!propsAliasMatchesComponent(propsAlias, componentName)) {
        diagnostics.push(
            diagnostic(
                rootDir,
                sourceFile,
                propsAlias || sourceFile,
                'CC005',
                'Template must declare type Props = <Component>Props',
            ),
        );
    }
    diagnostics.push(...validateRenderCalls({checker, propsAlias, rootDir, sourceFile}));

    return {
        componentName,
        diagnostics,
        id,
        nodeId: parsedFigmaUrl.nodeId,
        sourcePath: source?.repoPath,
        sourceFile,
    };
}

function reportDuplicates(rootDir, templates, field, code, label) {
    const diagnostics = [];
    const seen = new Map();
    for (const template of templates) {
        const value = template[field];
        if (!value) {
            continue;
        }
        const previous = seen.get(value);
        if (previous) {
            diagnostics.push(
                diagnostic(
                    rootDir,
                    template.sourceFile,
                    template.sourceFile,
                    code,
                    `Duplicate ${label} ${value}; first used in ${toRepoPath(rootDir, previous.fileName)}`,
                ),
            );
        } else {
            seen.set(value, template.sourceFile);
        }
    }
    return diagnostics;
}

function collectCoverage(rootDir, templates) {
    const indexPath = path.join(rootDir, 'src/components/index.ts');
    if (!fs.existsSync(indexPath)) {
        return {connected: 0, missing: [], total: 0};
    }

    const index = ts.createSourceFile(
        indexPath,
        fs.readFileSync(indexPath, 'utf8'),
        ts.ScriptTarget.Latest,
        true,
    );
    const components = [];
    for (const statement of index.statements) {
        if (!ts.isExportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) {
            continue;
        }
        const match = statement.moduleSpecifier.text.match(/^\.\/([A-Z][A-Za-z0-9]*)$/);
        if (!match) {
            continue;
        }
        const name = match[1];
        if (fs.existsSync(path.join(rootDir, `src/components/${name}/${name}.tsx`))) {
            components.push(name);
        }
    }

    const connectedPaths = new Set(templates.map((template) => template.sourcePath));
    const missing = components.filter(
        (name) => !connectedPaths.has(`src/components/${name}/${name}.tsx`),
    );
    return {
        connected: components.length - missing.length,
        missing,
        total: components.length,
    };
}

export function analyzeCodeConnect({rootDir = process.cwd(), tsconfigPath} = {}) {
    const configPath = tsconfigPath || path.join(rootDir, 'tsconfig.figma.json');
    const config = ts.readConfigFile(configPath, ts.sys.readFile);
    if (config.error) {
        return {
            coverage: {connected: 0, missing: [], total: 0},
            diagnostics: [convertTypeScriptDiagnostic(rootDir, config.error)],
            templates: [],
        };
    }

    const parsed = ts.parseJsonConfigFileContent(
        config.config,
        ts.sys,
        rootDir,
        undefined,
        configPath,
    );
    const program = ts.createProgram({options: parsed.options, rootNames: parsed.fileNames});
    const checker = program.getTypeChecker();
    const templateSourceFiles = program
        .getSourceFiles()
        .filter((sourceFile) => sourceFile.fileName.endsWith('.figma.ts'));
    const templates = templateSourceFiles.map((sourceFile) =>
        validateTemplate({checker, program, rootDir, sourceFile}),
    );
    const diagnostics = [
        ...parsed.errors.map((value) => convertTypeScriptDiagnostic(rootDir, value)),
        ...ts
            .getPreEmitDiagnostics(program)
            .map((value) => convertTypeScriptDiagnostic(rootDir, value)),
        ...templates.flatMap((template) => template.diagnostics),
        ...reportDuplicates(rootDir, templates, 'id', 'CC010', 'template id'),
        ...reportDuplicates(rootDir, templates, 'nodeId', 'CC011', 'Figma node id'),
    ];

    diagnostics.sort(
        (left, right) =>
            left.file.localeCompare(right.file) ||
            left.line - right.line ||
            left.column - right.column ||
            left.code.localeCompare(right.code),
    );
    return {
        coverage: collectCoverage(rootDir, templates),
        diagnostics,
        templates,
    };
}

function escapeCommandValue(value, {property = false} = {}) {
    let escaped = String(value)
        .replaceAll('%', '%25')
        .replaceAll('\r', '%0D')
        .replaceAll('\n', '%0A');
    if (property) {
        escaped = escaped.replaceAll(':', '%3A').replaceAll(',', '%2C');
    }
    return escaped;
}

export function formatGithubAnnotation(value) {
    const properties = [
        `file=${escapeCommandValue(value.file, {property: true})}`,
        `line=${value.line}`,
        `col=${value.column}`,
        `title=${escapeCommandValue(value.code, {property: true})}`,
    ].join(',');
    return `::error ${properties}::${escapeCommandValue(value.message)}`;
}

function escapeMarkdown(value) {
    return String(value).replaceAll('|', '\\|').replaceAll('\n', '<br>');
}

export function renderGithubSummary(result) {
    const lines = [
        '## Figma Code Connect',
        '',
        `Coverage: **${result.coverage.connected}/${result.coverage.total}** public component folders have reviewed templates.`,
        '',
    ];
    if (result.diagnostics.length === 0) {
        lines.push('No TypeScript or semantic mapping errors.', '');
    } else {
        lines.push('| Location | Code | Message |', '| --- | --- | --- |');
        for (const value of result.diagnostics) {
            lines.push(
                `| ${escapeMarkdown(`${value.file}:${value.line}:${value.column}`)} | ${escapeMarkdown(value.code)} | ${escapeMarkdown(value.message)} |`,
            );
        }
        lines.push('');
    }

    if (result.coverage.missing.length > 0) {
        lines.push(
            '<details><summary>Missing templates (informational)</summary>',
            '',
            ...result.coverage.missing.map((name) => `- ${name}`),
            '',
            '</details>',
            '',
        );
    }
    return `${lines.join('\n')}\n`;
}
