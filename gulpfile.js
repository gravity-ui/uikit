/* eslint-env node */
const path = require('path');

const utils = require('@gravity-ui/gulp-utils');
const {task, src, dest, series, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const {rimrafSync} = require('rimraf');

const {sassFunctions} = require('./build-utils/sass-functions');

const {version} = require('./package.json');

const BUILD_DIR = path.resolve('build');

task('clean', (done) => {
    rimrafSync(BUILD_DIR);
    rimrafSync('styles/**/*.css', {glob: true});
    done();
});

async function compileTs(modules = false) {
    const tsProject = await utils.createTypescriptProject({
        compilerOptions: {
            declaration: true,
            module: modules ? 'esnext' : 'nodenext',
            moduleResolution: modules ? 'bundler' : 'nodenext',
            ...(modules ? undefined : {verbatimModuleSyntax: false}),
        },
    });

    const transformers = [
        tsProject.customTransformers.transformScssImports,
        tsProject.customTransformers.transformLocalModules,
    ];
    return new Promise((resolve) => {
        src([
            'src/**/*.{ts,tsx}',
            '!src/demo/**/*',
            '!src/stories/**/*',
            '!src/**/__stories__/**/*',
            '!src/**/__tests__/**/*',
            '!src/**/__mocks__/**/*',
            '!src/**/*.test.{ts,tsx}',
            '!src/**/__snapshots__/**/*',
        ])
            .pipe(sourcemaps.init())
            .pipe(
                tsProject({
                    customTransformers: {
                        before: transformers,
                        afterDeclarations: transformers,
                    },
                }),
            )
            .pipe(sourcemaps.write('.', {includeContent: true, sourceRoot: '../../src'}))
            .pipe(
                utils.addVirtualFile({
                    fileName: 'package.json',
                    text: JSON.stringify({
                        version,
                        type: modules ? 'module' : 'commonjs',
                        sideEffects: ['*.css', '*.scss'],
                    }),
                }),
            )
            .pipe(dest(path.resolve(BUILD_DIR, modules ? 'esm' : 'cjs')))
            .on('end', resolve);
    });
}

task('compile-to-esm', () => {
    return compileTs(true);
});

task('compile-to-cjs', () => {
    return compileTs();
});

task('copy-i18n', () => {
    return src(['src/**/i18n/*.json'])
        .pipe(dest(path.resolve(BUILD_DIR, 'esm')))
        .pipe(dest(path.resolve(BUILD_DIR, 'cjs')));
});

task('styles-global', () => {
    return src(['styles/styles.scss', 'styles/fonts.scss'])
        .pipe(
            sass.sync().on('error', function (error) {
                sass.logError.call(this, error);
                process.exit(1);
            }),
        )
        .pipe(dest('styles'));
});

task('styles-components', () => {
    return src(['src/components/**/*.scss', '!src/components/**/__stories__/**/*'])
        .pipe(
            sass.sync({functions: sassFunctions}).on('error', function (error) {
                sass.logError.call(this, error);
                process.exit(1);
            }),
        )
        .pipe(dest(path.resolve(BUILD_DIR, 'esm', 'components')))
        .pipe(dest(path.resolve(BUILD_DIR, 'cjs', 'components')));
});

task(
    'build',
    series([
        'clean',
        parallel(['compile-to-esm', 'compile-to-cjs']),
        'copy-i18n',
        parallel(['styles-global', 'styles-components']),
    ]),
);

task('default', series(['build']));
