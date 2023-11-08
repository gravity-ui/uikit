/* eslint-env node */
const path = require('path');

const {task, src, dest, series, parallel} = require('gulp');
const sass = require('gulp-dart-sass');
const replace = require('gulp-replace');
const ts = require('gulp-typescript');
const rimraf = require('rimraf');

const BUILD_DIR = path.resolve('build');

task('clean', (done) => {
    rimraf.sync(BUILD_DIR);
    rimraf.sync('styles/**/*.css');
    done();
});

function compileTs(modules = false) {
    const tsProject = ts.createProject('tsconfig.json', {
        declaration: true,
        module: modules ? 'esnext' : 'commonjs',
        // uncomment after switching to typescript 5 with verbatimModuleSyntax: true
        // ...(modules ? undefined : {verbatimModuleSyntax: false}),
    });

    return src([
        'src/**/*.{ts,tsx}',
        '!src/demo/**/*',
        '!src/stories/**/*',
        '!src/**/__stories__/**/*',
        '!src/**/__tests__/**/*',
        '!src/**/__mocks__/**/*',
        '!src/**/*.test.{ts,tsx}',
        '!src/**/__snapshots__/**/*',
    ])
        .pipe(replace(/(import.+)\.scss/g, '$1.css'))
        .pipe(tsProject())
        .pipe(dest(path.resolve(BUILD_DIR, modules ? 'esm' : 'cjs')));
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
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('styles'));
});

task('styles-components', () => {
    return src(['src/components/**/*.scss', '!src/components/**/__stories__/**/*'])
        .pipe(sass().on('error', sass.logError))
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
