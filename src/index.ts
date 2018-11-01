
  
import Project, { FunctionDeclaration } from "ts-simple-ast";
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
  const clients:{[key:string]:FunctionDeclaration} = webclient.getState().clients = {}
  // const client:{[key:string]:FunctionDeclaration} = {}

  project.getSourceFiles().forEach( sourceFile => {
    sourceFile.getFunctions().forEach( f=>{
      f.getJsDocs().forEach( doc => {
        let serviceName = ''
        const is_client = doc.getTags().filter( tag => {
          if( tag.getName() === 'client' ) {
            serviceName = tag.getComment()
            return true
          }
          return false
        }).length > 0;
        if(is_client) {
          if(clients[serviceName]) {
            throw `Duplicate client declaration for service ${serviceName}`
          }
          clients[serviceName] = f
          console.log('Found client ' + f.getName()+ ' for service ' + serviceName)
        }        
      })
    })
  })  
  
  // mapeservice classes to the properties
  project.getSourceFiles().forEach( sourceFile => {
    sourceFile.getFunctions().forEach( f=>{
      f.getJsDocs().forEach( doc => {
        const is_client = doc.getTags().filter( tag => tag.getName() === 'client' ).length > 0;
        if(is_client) {
          webclient.getState().clients[f.getName()] = f
        }        
      })
    })
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
        let clientWriter:R.CodeWriter
        let clientInnerWriter:R.CodeWriter 
        const clientFn = clients[serviceinfo.service]
        // console.log(serviceinfo)
        if(clientFn) {
          console.log('^ has a client')
          clientWriter = new R.CodeWriter();
          clientWriter.out(`return new class ${c.getName()} {`, true)
          clientWriter.indent(1)
          clientInnerWriter = clientWriter.fork()
          clientWriter.indent(-1)
          clientWriter.out(`}`, true)
        }
        ProgrammerBase.initSwagger( webclient, serviceinfo )
        const injectWriter = new R.CodeWriter();      
        c.getMethods().forEach( m => {
          ProgrammerBase.WriteEndpoint( injectWriter, project, c, m, clientInnerWriter )
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
            if(info.tags.client === serviceinfo.service ) {
              console.log(clientWriter.getCode())
              f.setBodyText(writer => {
                // writer.write('/* OK */')
                writer.setIndentationLevel('  ').write(clientWriter.getCode())
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
