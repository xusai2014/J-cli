#!/usr/bin/env node

var y = require('yargs');
var shell = require('shelljs');
var path = require('path');
var fs = require('fs');
var PROJECT_NAME = 'PROJECT_NAME';
if (!shell.which('react-native')) {
  shell.echo('Sorry, this script requires react-native! please use: npm install -g yarn react-native-cli');
  shell.exit(1);
}

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

y.usage('Usage: $0 <command> [options]')
  .command('create [projectname]', '创建sx-RN项目')
  .command('rename [projectname] [giturl]', '修改RN项目的名称')
  .demand(['projectname'])
  .help('h')
  .alias('h', 'help');

var argv = y.argv;
var command = argv._[0];
var projectname = argv.projectname;
var basepath = shell.pwd().stdout;
var projectpath = basepath+'/'+projectname;
var templatepath = path.resolve(__dirname,'./template/*');
if (command === 'create') {
  console.log(projectpath)
  shell.mkdir('-p',[projectpath])

  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
  }
  // 远程仓库更改
  //shell.exec("git clone https://github.com/chengkaigithub/ReactNativeScaffold "+projectpath);
  //PROJECT_NAME = 'ReactNativeScaffold';

  // 本地文件更改
  shell.cp('-Rf',templatepath,projectpath);
  shell.cd(projectpath);
  // TODO Replace projectName

  refactor(PROJECT_NAME,projectname,projectpath)


} else if(command === 'rename'){
  var giturl = argv.giturl;
  console.log(projectpath)
  shell.mkdir('-p',[projectpath])
  // 远程仓库更改
  shell.exec("git clone "+giturl+" "+projectpath);

  shell.cd(projectpath);
  var string =  fs.readFileSync('./package.json');
  var obj = JSON.parse(string);
  PROJECT_NAME = obj.name;
  // TODO Replace projectName

  refactor(PROJECT_NAME,projectname,projectpath)

} else {
  y.showHelp();
}

function refactor(PROJECT_NAME,projectname,projectpath) {
  renameDic('ios');
  renameDic('android/app/src/main/java/com');
  shell.ls('-R','ios').forEach(function (file) {
    if(file.indexOf(PROJECT_NAME)>-1){
      var neFile = file.replace(PROJECT_NAME,projectname)
      fs.renameSync(projectpath+'/ios/'+file,projectpath+'/ios/'+neFile,function(){
      })
    }
  });


  shell.ls('-R','./').forEach(function (file) {
    if(isFile(file) && file.indexOf('Images.xcassets')<= -1){
      shell.sed('-i', PROJECT_NAME, projectname, file);
    }
  });
  shell.ls('ios/'+projectname+'.xcodeproj/project.pbxproj').forEach(function (file) {
    if(isFile(file)){
      shell.sed('-i', PROJECT_NAME, projectname, file);
    }
  });

}

function isFile(path){
  return fs.existsSync(path) && fs.statSync(path).isFile();
}


function renameDic(name) {
  shell.ls(name).forEach(function (file) {
    if(file.indexOf(PROJECT_NAME)>-1){
      var neFile = file.replace(PROJECT_NAME,projectname)
      fs.renameSync(projectpath+'/'+name+'/'+file,projectpath+'/'+name+'/'+neFile,function(){
      })
    }
  });
}