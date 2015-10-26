'use strict';

var _ = require('lodash');
var event_stream = require('event-stream');
var gulp = require('gulp');
var gulp_bump = require('gulp-bump');
var gulp_newer = require('gulp-newer');
var gulp_filter = require('gulp-filter');
var gulp_typescript = require('gulp-typescript');
var gulp_util = require('gulp-util');
var map_stream = require('map-stream');
var path = require('path');
var through = require('through2');

var PluginError = gulp_util.PluginError;

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
        app: ['server/src/**/*.ts', 'typings/tsd.d.ts']
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

gulp.task('npmbump', function() {
    gulp_util.log('Detecting appropriate starting directory for bump...', process.env.INIT_CWD);

    return gulp.src('modules/**/package.json')
        .pipe(map_stream(function(file, done) {
            var module = path.dirname(file.path) + '/**/*';
            var packageFilter = gulp_filter('**/package.json');

            gulp.src(module)
                .pipe(gulp_newer(file.path))
                .pipe(packageFilter)
                .pipe(gulp_bump())
                .pipe(gulp.dest(path.dirname(file.path)))
                .on('end', function() {
                    done(null, file);
                });
        }));
});

gulp.task('npmbuild', function() {
    gulp_util.log('Detecting appropriate starting directory...', process.env.INIT_CWD);

    var out = process.env.INIT_CWD + '/app';
    var build = [process.env.INIT_CWD + '/**/*.ts', 'typings/tsd.d.ts', '!' + process.env.INIT_CWD + '/node_modules/**/*'];
    var typings = 'typings/tsd.d.ts';

    var project = gulp_typescript.createProject({
        declarationFiles: true,
        noExternalResolve: false,
        target: 'ES5',
        module: 'commonjs',
        noEmitOnError: true
    });

    var tsResult = gulp.src(_.flatten([build, typings]))
        .pipe(gulp_typescript(project));

    return event_stream.merge(
        tsResult.dts.pipe(gulp.dest(out)),
        tsResult.js.pipe(gulp.dest(out))
    );
});
