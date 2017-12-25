const gulp = require('gulp');
const clean = require('gulp-clean');
const nodemon = require('gulp-nodemon');
const exec = require('child_process').exec;

// clean dist folder
gulp.task('clean', () => {
  return gulp.src('dist', {read: false})
  .pipe(clean());
});

// compile to js and pipe to dist
gulp.task('build', ['clean'], (cb) => {
  exec('node node_modules/typescript/bin/tsc', function (err, stdout, stderr) {
    gulp.src(['package.json']).pipe(gulp.dest('dist'));
    cb(stdout)
  });
});

// compile and serve
gulp.task('serve', ['build'], () => {
  return nodemon({
    script: "dist/index.js"
  });
});

// watch for changes
gulp.task('watch', ['serve'], () => {
  return gulp.watch('src/**/*.ts', ['build']);
});

gulp.task('default', ['watch']);
