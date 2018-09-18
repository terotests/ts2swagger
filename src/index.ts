
  
import Project from "ts-simple-ast";
import * as R from 'robowr'
import * as ProgrammerBase from './programmer/service'
import {getFunctionDoc} from './utils'

const path = require('path')

export interface GenerationOptions {
  path: string
}

export async function createProject( settings:GenerationOptions) {
  const project = new Project();

  project.addExistingSourceFiles([`${settings.path}/**/*.ts`]); // , "!**/*.d.ts"
  const RFs = new R.CodeFileSystem()
  
  // create one dummy file for setting the context for the services
  const webclient = RFs.getFile('/src/frontend/api/', 'index.ts').getWriter()
  
  // map services to state
  const services = webclient.getState().services = {}

  // mapeservice classes to the properties
  project.getSourceFiles().forEach( sourceFile => {
    sourceFile.getClasses().forEach( c=>{
      c.getJsDocs().forEach( doc => {
        const is_service = doc.getTags().filter( tag => tag.getName() === 'service' ).length > 0;
        if(is_service) {
          webclient.getState().services[c.getName()] = {
            description : doc.getComment()
          }
          doc.getTags().forEach( tag => {
            webclient.getState().services[c.getName()][tag.getName()] = tag.getComment()
          })
        }
      })
    })  
    sourceFile.getClasses().forEach( c=>{
      if( services[c.getName()] ) {
        const serviceinfo:any = services[c.getName()]
        ProgrammerBase.initSwagger( webclient, serviceinfo )
        const injectWriter = new R.CodeWriter();      
        c.getMethods().forEach( m => {
          ProgrammerBase.WriteEndpoint( injectWriter, project, c, m )
          // if(clientWriter) ProgrammerBase.WriteClientEndpoint( clientWriter, project, c, m )
        })  
        // inject declaration to some function...
        project.getSourceFiles().forEach( s => {
          s.getFunctions().forEach( f => {
            const info = getFunctionDoc(f)
            // console.log(f.getName(), info)
            if(info.tags.service === serviceinfo.service ) {
              f.setBodyText(writer => {
                writer.setIndentationLevel('  ').write(injectWriter.getCode())
              }) 
            }
          })
        })
        // create swagger file
        const swaggerPath:any = serviceinfo.swagger;
        if( swaggerPath ) {
          const swagger = RFs.getFile(path.dirname(swaggerPath), path.basename(swaggerPath)).getWriter()
          swagger.raw( JSON.stringify( swagger.getState().swagger, null, 2 ) )        
        }        
      }
    })        
  })  
  await RFs.saveTo('./', false );
  await project.save()  
  console.log('Project saved')
}
