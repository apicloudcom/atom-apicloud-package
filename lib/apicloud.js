'use babel';

import { CompositeDisposable,TextEditor,Directory} from 'atom';
import React from 'react';
import ReactDOM from 'react-dom';
const {spawn}  = require('child_process')
const Path = require("path")
const APICloud = require("apicloud-tools-core")

export default {
  subscriptions: null,
  modalPanel: null,
  port: null,
  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    /* 真机同步服务自启动. */
    let port = null
    let portDict = atom.config.get('apicloud.port')

    if( ! portDict){
      portDict = {}
    }

    const timestamp = Math.floor(Date.now() / 1000)
    for(port = 8686; port < 100 + 8686; ++ port){ // 最多允许100个实例.
      if(! portDict["" + port] ||
       (timestamp - parseInt(portDict["" + port])> 60 * 60)){
        /* 60 * 60s不再使用,即判定为端口已被释放. */
        portDict["" + this.port] = Math.floor(Date.now() / 1000)
        atom.config.set('apicloud.port', portDict)
        break
      }
    }

    console.log(`可用端口:${port}`)

    this.port = port
    this.startWifi({port: this.port})

    APICloud.wifiLog(({level,content})=>{
      if(level === "warn"){
        console.warn(content)
        return
      }

      if(level === "error"){
        console.error(content)
        return
      }

      console.log(content)
    })
    .then(()=>{
      console.log("WiFi 日志服务已启动...")
    })

    this.subscriptions = new CompositeDisposable();

    atom.commands.add('.apicloud-view-dialog', 'core:cancel',
      (event)=>{
        this.modalPanel && this.modalPanel.destroy()
      })

    atom.commands.add('.apicloud-view-dialog', 'core:confirm',
      (event)=>{
        this.modalPanel && this.modalPanel.hide()
      })

    /* 项目模板指令集. */
    atom.commands.add('atom-workspace', 'apicloud:initApp,template=default',
      (event)=>(this.convertCommandToMethod({event:event})))
    atom.commands.add('atom-workspace', 'apicloud:initApp,template=bottom',
      (event)=>(this.convertCommandToMethod({event:event})))
    atom.commands.add('atom-workspace', 'apicloud:initApp,template=home',
      (event)=>(this.convertCommandToMethod({event:event})))
    atom.commands.add('atom-workspace', 'apicloud:initApp,template=slide',
      (event)=>(this.convertCommandToMethod({event:event})))

    /* 页面模板指令集. */
    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page001',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page002',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page003',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page004',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page005',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page006',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page007',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page008',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page009',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page010',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page011',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page012',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page013',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page014',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page015',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page016',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page017',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page018',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page019',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page020',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page021',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page022',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page023',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page024',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page025',
      (event)=>(this.convertCommandToMethod({event:event})))

    atom.commands.add('atom-workspace', 'apicloud:addFileTemplate,template=page026',
      (event)=>(this.convertCommandToMethod({event:event})))

    /* wifi 同步指令. */
    atom.commands.add('atom-workspace', 'apicloud:previewWifi',
      (event)=>(this.convertCommandToMethod({event:event})))
    atom.commands.add('atom-workspace', 'apicloud:syncWifi',
      (event)=>(this.convertCommandToMethod({event:event})))
    atom.commands.add('atom-workspace', 'apicloud:syncAllWifi',
      (event)=>(this.convertCommandToMethod({event:event})))
    atom.commands.add('atom-workspace', 'apicloud:wifiLog',
      (event)=>(this.convertCommandToMethod({event:event})))
    atom.commands.add('atom-workspace', 'apicloud:wifiInfo',
      (event)=>(this.convertCommandToMethod({event:event})))
    atom.commands.add('atom-workspace', 'apicloud:startWifi',
      (event)=>(this.convertCommandToMethod({event:event})))
    atom.commands.add('atom-workspace', 'apicloud:endWifi',
      (event)=>(this.convertCommandToMethod({event:event})))
  },
  deactivate() {
    this.modalPanel && this.modalPanel.destroy();
    this.subscriptions.dispose();
    APICloud.endWifi({})
  },
  serialize() {
    /* 实时记录正在使用的端口. */
    let portDict = atom.config.get('apicloud.port')
    portDict["" + this.port] = Math.floor(Date.now() / 1000)
    atom.config.set('apicloud.port', portDict)
    return {
    };
  },
  /* 将指令解析为对应的参数与方法,指令与方法对应的规则为: 命令空间:方法名,参数1=值1,参数2=值2,
      event 为保留参数,用于传递完整字段. */
  convertCommandToMethod({event:event}){
    const namespace = "apicloud:"
    let command = event.type

    if( ! (new RegExp(`^${namespace}`)).test(command)){ // 说明不是自己插件的方法.
      return
    }

    let methodName = ""
    let params = {event:event}

    let methodInfo = command.substring(namespace.length, command.length).split(",")
    methodInfo.map((item,idx)=>{
      if(0 === idx){
        methodName = item
      }else{
        let paramPair = item.split("=")
        if(paramPair && 2 === paramPair.length){
          params[paramPair[0]] = paramPair[1]
        }
      }
    })

    if("function" === typeof this[methodName]){
      this[methodName](params)
    }else{
      console.warning(`${methodName} 似乎不是一个有效的方法`)
    }
  },
  /* 新建 APICloud 页面框架. */
  addFileTemplate({template, event}){
    let name = template

    if(this.modalPanel){
      this.modalPanel.destroy()
    }

    const element = document.createElement('div');

    ReactDOM.render(
        <div className={"apicloud-view-dialog"}>请输入模板名称: <input type="text"
          placeholder={template}
          onChange={(event)=>{
            name = event.target.value
          }}

          /></div>,
      element,
    )

    this.modalPanel = atom.workspace.addModalPanel({
      item: element
    })

    this.modalPanel.onDidChangeVisible((visible)=>{
      if( ! visible){// 目前只有确认操作,才会隐藏,其他都是直接销毁.
        this.modalPanel.destroy()
        let projectRootPath = this.fetchProjectRootPath({event:event})

        APICloud.addFileTemplate({name:name,output:projectRootPath,template:template})
      }
    })
  },
  /* 新建 APICloud 项目模板. */
  initApp({template, event}){
    let name = template

    if(this.modalPanel){
      this.modalPanel.destroy()
    }

    const element = document.createElement('div');

    ReactDOM.render(
        <div className={"apicloud-view-dialog"}>请输入模板名称: <input type="text"
          placeholder={template}
          onChange={(event)=>{
            name = event.target.value
          }}

          /></div>,
      element,
    )

    this.modalPanel = atom.workspace.addModalPanel({
      item: element
    })

    this.modalPanel.onDidChangeVisible((visible)=>{
      if( ! visible){// 目前只有确认操作,才会隐藏,其他都是直接销毁.
        this.modalPanel.destroy()
        let projectRootPath = this.fetchProjectRootPath({event:event})
        let workspacePath = Path.resolve(projectRootPath,"../")

        APICloud.init({name:name, template:template, output:workspacePath})

        let newAppProjectPath = Path.resolve(workspacePath,name)
        atom.project.addPath(newAppProjectPath)
      }
    })
  },
  /* 获取当前活跃的工程目录,如果event存在,将优先使用event中文件路径所在的路径. */
  fetchProjectRootPath({event}){
    // 优先 event 里的.
    let projectPaths = atom.project.getPaths()

    if( ! projectPaths || 1 === projectPaths.length){
      return projectPaths[0]
    }

    let textEditor = atom.workspace.getActiveTextEditor()
    let textPath = textEditor.getPath()

    let targetProjectPath = [event.target.dataset.path,textPath].reduce(
      (targetProjectPath,domPath, index)=>{
        if(targetProjectPath || ! domPath){
          return targetProjectPath
        }

        let targetPath = domPath

        for (let i = 0; i < projectPaths.length; i++) {
          let projectPath = projectPaths[i]

          if(targetPath.startsWith(projectPath)){
            return projectPath
          }
        }
      },null)

    return targetProjectPath ? targetProjectPath : projectPaths[0]
  },
  previewWifi({event}){
    let {port,ip,clientsCount} = APICloud.wifiInfo()
    let tip = "同步成功,请在手机上查看运行效果!"
    if(0 === clientsCount){
      tip = "当前网速过慢或没有设备处于连接状态,可能会影响相关同步功能的使用"
    }

    let filePath = event.target.dataset.path

    if( ! filePath){
      let textEditor = atom.workspace.getActiveTextEditor()
      filePath = textEditor.getPath()
    }

    APICloud.previewWifi({file:filePath})
    atom.notifications.addInfo(tip)
  },
  syncWifi({event}){
    this.syncAllWifi({event:event, syncAll:false})
  },
  syncAllWifi({event,syncAll=true}){
    let tip = "同步成功,请在手机上查看运行效果!"

    let {port,ip,clientsCount} = APICloud.wifiInfo()

    if(0 === clientsCount){
      tip = "当前网速过慢或没有设备处于连接状态,可能会影响相关同步功能的使用"
    }

    let projectRootPath = this.fetchProjectRootPath({event:event})
    if( ! projectRootPath){
      atom.notifications.addWarning("似乎没有有效的APICloud项目!")
      return
    }

    syncAll = syncAll ? 1 : 0

    APICloud.syncWifi({projectPath:projectRootPath,syncAll:syncAll})
    atom.notifications.addInfo(tip)
  },
  wifiLog({event}){
    atom.openDevTools()
        .then(()=>{
          const defaultSuccessTip = "请在Atom开发控制台查看日志信息"
          atom.notifications.addInfo(defaultSuccessTip)
        })
  },
  wifiInfo({event}){
    let {port,ip,clientsCount} = APICloud.wifiInfo()
    atom.confirm({
      message: "APICloud WiFi 真机同步服务",
      detailedMessage: `IP :${ip}\n端口:${port}\n设备连接数:${clientsCount}`
    })
  },
  startWifi({event,port}){
    APICloud.startWifi({port:port})
    console.log("APICloud WiFi 真机同步服务已启动")
  },
  endWifi({event}){
    APICloud.endWifi({})
    console.log("APICloud WiFi 真机同步服务已关闭")
  },
};
