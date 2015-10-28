import gulp from 'gulp'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import serve from 'gulp-serve'
import qunit from 'gulp-qunit'
import jshint from 'gulp-jshint'
import stylish from 'jshint-stylish'

gulp.task('js', ['hint'], () => {
  gulp.src('./jShit.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./'))
})

gulp.task('hint', () => {
  return gulp.src('./jShit.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
})

gulp.task('watch', () => {
  gulp.watch('./jShit.js', ['js'])
})

gulp.task('test', () => {
  gulp.src('./test/index.html')
    .pipe(qunit({
      timeout: 20
    }))
})

gulp.task('serve', serve({
  port: 3000,
  root: '.'
}))

gulp.task('build', ['js'])

gulp.task('default', ['build', 'watch', 'serve'])
