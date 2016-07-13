'use strict';

const fs = require('fs-extra'),
      path = require('path');

let self = module.exports = {

/***********************************************************************/
generateWakandaStructure :  (name, options) => {

  console.log('\r\n');
  console.log(`Creating ${name} ...`);
  console.log('\r\n');

  if(options.workspace) {
    self.createFolder(name,'workspace')
  }
 else {
    self.createFolder(name,'project')

  }
},

/************************** STEP1 : MAIN FUNCTION TO GENERATE A PROJECT OR WORKSPACE FOLDER *********************************************/
createFolder :(name,type)=> {

  fs.mkdir(path.join(process.cwd(),name), (err) => {

    let configData,fileName;

    if (err){
      return console.error(err);
    }
    else {
        /*Write config to appropriate files*/
        if(type === "project" ) {
          configData = '<?xml version="1.0" encoding="UTF-8"?><project><folder path="./"><tag name="webFolder"/></folder></project>';
          fileName ="project.waProject";
        }
        else{
          configData = '<?xml version="1.0" encoding="UTF-8"?><workspace><project path="project.waProject"/></workspace>';
          fileName ="workspace.waWorkspace";
        }
        /****/
      fs.writeFile(path.join(process.cwd(),name, fileName),configData, (err)=>{
        if (err){
          return console.error(err);
        }
        else {
          console.log(`Your ${type} ${name} has been created !`);
        }
      });
    }

});
},
/************************** STEP2 : THE RESPONSIBLE FUNCTION OF COPYING DIFFERENT BOILERPLATE *********************************************/
copyTemplate :(templateToBeCopied,name) => {

  let templateType = templateToBeCopied.split("/").splice(-1)[0],
      templatePath = path.join(__dirname , templateToBeCopied),
      destinationPath = path.join(process.cwd(), name);

  fs.copy(templatePath, destinationPath, function (err) {
      if (err){
        return console.error(`Ouups something went wrong : ${err}`);
      }
      console.log(`Your ${templateType} ${name} has been created !`);
    })
},


/***********************************************************************/
generateWakandaBoilerplate: (name,options) => {

   if (options.mobile) {
      //TODO : Take in consideration the # mobile frameworks
    }
   if (options.web) {
      //TODO : Take in consideration the # web frameworks
    }

}
/***********************************************************************/

};
