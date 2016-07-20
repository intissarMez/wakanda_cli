'use strict';

const fs = require('fs-extra'),
      path = require('path'),
      et = require('elementtree');

let self = module.exports = {
  /*******************************************************/
  createProject :(name) => {
      fs.mkdirs(path.join(process.cwd(),name)+"/"+name, (err) => {
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

    let   wsConfigData = `<?xml version="1.0" encoding="UTF-8"?><workspace><project><path>${name}/project.waProject</path></project></workspace>`,
          wsFileName ="workspace.waWorkspace";
    fs.writeFile(path.join(process.cwd(),name, wsFileName),wsConfigData, (err)=>{
      if (err)  return console.error(err);

    });

  },

  /*******************************************************/
  configureProject : (name,projectPath) => {

    let   projectConfigData = '<?xml version="1.0" encoding="UTF-8"?><project><folder path="./"><tag name="webFolder"/></folder></project>';

    fs.writeFile(projectPath,projectConfigData, (err)=>{
        console.log(err ? err :`\r\nYour project has been created !\r\n\r\n To start working on '${name}':\r\n\r\n   cd ${name} \r\n\r\n For more information visit https://doc.wakanda.org`);
    });
  },


  /*******************************************************/

  updateWorkspaceConf :(newProjectPath)=>{
    try {

      let data = fs.readFileSync(process.cwd()+'/workspace.waWorkspace').toString(),
          xml = et.XML,
          ElementTree = et.ElementTree,
          subElement = et.SubElement,
          etree = et.parse(data),
          projectNode = subElement(etree._root,'project'),
          pathNode = subElement(projectNode, 'path');

      pathNode.text = newProjectPath;
      etree = new ElementTree(etree._root);
      xml = etree.write();
      //console.log(xml);
      fs.writeFile(process.cwd()+'/workspace.waWorkspace', xml);
    } catch (e) {
      /*The user tries to add project to a non existing workspace*/
    }

  },

  /*******************************************************/

  copyTemplate :(templateToBeCopied,name) => {
      //TODO : Copy web/mobile templates or just clone them from Git ???
    let templateType = templateToBeCopied.split("/").splice(-1)[0],
        templatePath = path.join(__dirname , templateToBeCopied),
        destinationPath = path.join(process.cwd(), name);

    fs.copy(templatePath, destinationPath, function (err) {
      console.log(err ? err :`Your ${templateType} ${name} has been created !`);
    })
  }
};
