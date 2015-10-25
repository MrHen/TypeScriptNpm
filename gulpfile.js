'use strict';

var _ = require('lodash');
var event_stream = require('event-stream');
var gulp = require('gulp');
var gulp_typescript = require('gulp-typescript');

var modules_paths = {
    source: {
        app: ['modules/**/*.ts']
    },

    built_paths: {
        app: 'modules/',
        typings: 'modules/'
    }
};

var server_paths = {
    source: {
        app: ['server/**/*.ts']
    },

    built_paths: {
        app: 'server/',
        typings: 'server/'
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
        tsResult.js.pipe(gulp.dest(modules_paths.built_paths.app))
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
