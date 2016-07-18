'use strict';

const fs = require('fs-extra'),
      path = require('path'),
      cfg = require('./config'),
      templesArray = require('./template'),
      program = require('commander'),
      spawn = require('child_process').spawn;

 module.exports = {

/*******************************************************/
initializeFolder :  (name) => {

  console.log('\r\n');
  console.log(`Creating ${name} ...`);
  console.log('\r\n');
  cfg.createProject(name)
},

/*******************************************************/
addProject :(name) => {

    console.log('\r\n');
    console.log(`Creating ${name} ...`);
    console.log('\r\n');

   fs.mkdir(path.join(process.cwd(),name), (err) => {
      if(err){
          return console.error(err);
      }
     else {
       cfg.configureProject(name,path.join(process.cwd(),name, "project.waProject"));
       cfg.updateWorkspaceConf(name+"/project.waProject");
      }

    });
},

/*******************************************************/
generateWakandaBoilerplate: (name,options) => {

  if ((templesArray.VALUES.includes(name))) {
      spawn('git', options.web ? ['clone',`https://github.com/wakanda/templates/web/vote/${name}`] : ['clone',`https://github.com/wakanda/templates/mobile/${name}`]);
  } else {
      console.log(`\r\n${name} can not be found, those are the available templates :\r\n`);
      for(let value of  templesArray.VALUES) {
          console.log(value);
      }
      program.help();
  }

}
/*******************************************************/

};
