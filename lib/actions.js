'use strict';

const ncp  = require('ncp').ncp,
      path = require('path');

let self = module.exports = {
/***********************************************************************/
generateWakandaStructure :  (name, options) => {
  console.log('\r\n');
  console.log(`Creating ${name} ...`);
  console.log('\r\n');

  if(options.workspace) {
      self.copyFolder('../templates/workspace',name);
  }
 else {
     self.copyFolder('../templates/project',name);
  }
},

/***********************************************************************/
copyFolder :(templateToBeCopied,name) => {
  let templateType = templateToBeCopied.split("/").splice(-1)[0],
      templatePath = path.join(__dirname , templateToBeCopied),
      destinationPath = path.join(process.cwd(), name);

  ncp(templatePath, destinationPath, function (err) {
      if (err){
        return console.error(`Ouups something went wrong : ${err}`);
      }
      console.log(`Your ${templateType} ${name} has been created !`);
    })
},

/***********************************************************************/
generateWakandaBoilerplate: (name,options) => {
    if(options.backend){
        //TODO : What is a backend?
    }
   if (options.database) {
        //TODO : What is a model?
    }
   if (options.mobile) {
      //TODO : Take in consideration the # mobile frameworks
    }
   if (options.web) {
      //TODO : Take in consideration the # web frameworks
    }

}
/***********************************************************************/

};
