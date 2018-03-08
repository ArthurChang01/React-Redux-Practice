var gulp = require('gulp'),
    gulpSSH = require('gulp-ssh'),
    exec = require('child_process').execSync,
    log = require('fancy-log');

gulp.task('NpmDeploy', function(){
	exec('npm run deploy', function (err,outlog,errlog){
		console.log(outlog);
		console.log(errlog);
	});
})

gulp.task('BuildDockerImage',['NpmBuild'],function(){
	exec('docker build -f Dockerfile -t localhost:5000/nginxweb:1.0 -t ocalhost:5000/nginxweb:latest --rm --no-cache .', function (err,outlog,errlog){
		console.log(outlog);
		console.log(errlog);
	});
})

gulp.task('PushImage',['BuildDockerImage'],function(){
	exec('docker push localhost:5000/nginxweb:1.0', function (err,outlog,errlog){
		console.log(outlog);
		console.log(errlog);
	});
	exec('docker push localhost:5000/nginxweb:latest', function (err,outlog,errlog){
		console.log(outlog);
		console.log(errlog);
	});
})


gulp.task('Deploy.stg',['PushImage']);