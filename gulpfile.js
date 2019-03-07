var gulp = require("gulp");
var webserver = require("gulp-webserver");
var less = require("gulp-less");


gulp.task("less",function(){
	return gulp.src('./css/*.less')
	.pipe(less())
	.pipe(gulp.dest('./css/'))
})

gulp.task('watch',function(){
	return gulp.watch('./css/*.less',gulp.series('less'));
})

gulp.task("webserver",function(){
	return gulp.src('./')
	.pipe(webserver({
		port:8086,
		open:true,
		// livereload:true
	}))
})

gulp.task('dev',gulp.series("less","webserver","watch"));
