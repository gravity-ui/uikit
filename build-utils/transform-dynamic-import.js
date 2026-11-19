/**
 * `import('./module')` → `Promise.resolve().then(() => require('./module'))`
 *
 * The CommonJS build is compiled with `module: nodenext`, and in that mode TypeScript leaves a
 * dynamic import native. Node runs it, but Jest without `--experimental-vm-modules` does not — the
 * tests of this repository (ts-jest, NodeNext as well) and those of a consumer running on
 * `build/cjs` alike. The ESM build keeps `import()`: that is where the bundlers split the chunk.
 *
 * Used by gulpfile.js for the CommonJS build, and by jest.config.js as an AST transformer of ts-jest.
 * @param {typeof import('typescript')} ts The compiler the transformer builds nodes for
 * @returns {import('typescript').TransformerFactory<import('typescript').SourceFile>} The transformer
 */
function createDynamicImportTransformer(ts) {
    return (context) => {
        const {factory} = context;

        const visitor = (node) => {
            if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
                const specifier = ts.visitNode(node.arguments[0], visitor);
                const load = factory.createArrowFunction(
                    undefined,
                    undefined,
                    [],
                    undefined,
                    factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                    factory.createCallExpression(factory.createIdentifier('require'), undefined, [
                        specifier,
                    ]),
                );
                const resolved = factory.createCallExpression(
                    factory.createPropertyAccessExpression(
                        factory.createIdentifier('Promise'),
                        'resolve',
                    ),
                    undefined,
                    [],
                );
                const result = factory.createCallExpression(
                    factory.createPropertyAccessExpression(resolved, 'then'),
                    undefined,
                    [load],
                );
                ts.setSourceMapRange(result, ts.getSourceMapRange(node));
                return result;
            }
            return ts.visitEachChild(node, visitor, context);
        };

        return (sourceFile) => ts.visitNode(sourceFile, visitor);
    };
}

module.exports = {
    createDynamicImportTransformer,
    // The AST transformer interface of ts-jest
    name: 'transform-dynamic-import',
    version: '1',
    factory: (tsCompiler) => createDynamicImportTransformer(tsCompiler.configSet.compilerModule),
};
