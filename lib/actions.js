'use strict';

const fs = require('fs-extra'),
      path = require('path'),
      mkdirp = require('mkdirp'),
      et = require('elementtree');

let self = module.exports = {

/***********************************************************************/
initializeFolder :  (name) => {

  console.log('\r\n');
  console.log(`Creating ${name} ...`);
  console.log('\r\n');
  self.createProject(name)
},

/*******************************************************/
createProject :(name) => {
    fs.mkdirp(path.join(process.cwd(),name)+"/"+name, (err) => {
      if(err){
          return console.error(err);
      }
      else {
        fs.access(process.cwd()+'/'+name+'/workspace.waWorkspace', (err) => {
          if(err){
            self.configureWorkspace(name);
          }
          self.configureProject(name,path.join(process.cwd(),name,name,"project.waProject"));
        });

      }
    });
},

/*******************************************************/
configureWorkspace :(name)=> {

  let   wsConfigData = `<?xml version="1.0" encoding="UTF-8"?><workspace><project path="${name}/project.waProject"/></workspace>`,
        wsFileName ="workspace.waWorkspace";
  fs.writeFile(path.join(process.cwd(),name, wsFileName),wsConfigData, (err)=>{
    if (err)  return console.error(err);

  });

},

/*******************************************************/
configureProject : (name,projectPath) => {

  let   projectConfigData = '<?xml version="1.0" encoding="UTF-8"?><project><folder path="./"><tag name="webFolder"/></folder></project>';

  fs.writeFile(projectPath,projectConfigData, (err)=>{
      console.log(err ? err :`Your project ${name} has been created !`);
  });
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
       self.configureProject(name,path.join(process.cwd(),name, "project.waProject"));
        //TODO : Update xml file of workspace to add the new created project
      }

    });
},

/*******************************************************/

updateWorkspaceConf :()=>{
  const data = fs.readFileSync(process.cwd()+'/workspace.waWorkspace').toString();
  let xml = et.XML,
      ElementTree = et.ElementTree,
      subElement = et.SubElement,
      etree = et.parse(data),
      projectNode = subElement(etree._root,'project'),
      pathNode = subElement(projectNode, 'path');

  pathNode.text ="new project path to be added here";
  etree = new ElementTree(etree._root);
  xml = etree.write();
  console.log(xml);
  fs.writeFile(process.cwd()+'/workspace.waWorkspace', xml);
},
/*******************************************************/

copyTemplate :(templateToBeCopied,name) => {

  let templateType = templateToBeCopied.split("/").splice(-1)[0],
      templatePath = path.join(__dirname , templateToBeCopied),
      destinationPath = path.join(process.cwd(), name);

  fs.copy(templatePath, destinationPath, function (err) {
    console.log(err ? err :`Your ${templateType} ${name} has been created !`);
  })
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
/***********************************************************************/

};
