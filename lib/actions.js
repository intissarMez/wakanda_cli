'use strict';

const fs = require('fs-extra'),
      path = require('path'),
      cfg = require('./config');

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

   if (options.mobile) {
      //TODO : Take in consideration the # mobile frameworks
    }
   if (options.web) {
      //TODO : Take in consideration the # web frameworks
    }

}
/*******************************************************/

};
