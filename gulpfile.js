'use strict';

var _ = require('lodash');
var event_stream = require('event-stream');
var gulp = require('gulp');
var gulp_typescript = require('gulp-typescript');

var modules_paths = {
    source: {
        app: ['modules/src/**/*.ts'],
        files: ['modules/src/**/*.{json,js}']
    },

    built_paths: {
        app: 'modules/app',
        typings: 'modules/app'
    }
};

var server_paths = {
    source: {
        app: ['server/src/**/*.ts', 'server/typings/tsd.d.ts']
    },

    built_paths: {
        app: 'server/app',
        typings: 'server/app'
    }
};

gulp.task('modules', function() {
    var project = gulp_typescript.createProject({
        declarationFiles: true,
        noExternalResolve: false,
        target: 'ES5',
        module: 'commonjs',
        noEmitOnError: true
    });

    var tsResult = gulp.src(_.flatten(modules_paths.source.app))
        .pipe(gulp_typescript(project));

    return event_stream.merge(
        tsResult.dts.pipe(gulp.dest(modules_paths.built_paths.typings)),
        tsResult.js.pipe(gulp.dest(modules_paths.built_paths.app)),
        gulp.src(modules_paths.source.files).pipe(gulp.dest(modules_paths.built_paths.app))
    );
});

gulp.task('server', function() {
    var project = gulp_typescript.createProject({
        declarationFiles: true,
        noExternalResolve: false,
        target: 'ES5',
        module: 'commonjs',
        noEmitOnError: true
    });

    var tsResult = gulp.src(_.flatten(server_paths.source.app))
        .pipe(gulp_typescript(project));

    return event_stream.merge(
        tsResult.dts.pipe(gulp.dest(server_paths.built_paths.typings)),
        tsResult.js.pipe(gulp.dest(server_paths.built_paths.app))
    );
});
