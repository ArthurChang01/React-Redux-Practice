var gulp = require('gulp'),
    args = require('yargs').argv,
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
	exec('docker push localhost:5000/nginxweb:' + args.buildversion, function (err,outlog,errlog){
		console.log(outlog);
		console.log(errlog);
	});
	exec('docker push localhost:5000/nginxweb:latest', function (err,outlog,errlog){
		console.log(outlog);
		console.log(errlog);
	});
})
//這段是for play-with-docker特別寫的 與實際server ssh不同
gulp.task('UpdateDockerCompose',['DeleteImage'],function() {
	exec('cd /docker/');
	exec('ssh ip172-18-0-16-baga5moo6i4000c49q6g@direct.labs.play-with-docker.com');
	exec('docker-compose pull web','docker-compose up -d --no-deps --build web');
})

gulp.task('Deploy.stg',['UpdateDockerCompose']);