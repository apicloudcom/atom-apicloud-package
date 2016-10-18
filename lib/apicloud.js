'use babel';

import ApicloudView from './apicloud-view';
import { CompositeDisposable } from 'atom';

export default {

  apicloudView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    this.apicloudView = new ApicloudView(state)


    // Register command that toggles this view
    let cmds = ["get_wifisync_info","install_wifysync_app","start_wifysync_app",
    "stop_wifysync_app","wifi_sync","wifi_syncall","wifi_preview","new_default_app",
    "new_bottom_app","new_home_app","new_slide_app","new_html","loader_android",
     "loader_ios","compress_widget","build_apk"]
    let cmdDict = cmds.reduce((cmdDict, cmd)=>{
       cmdDict["apicloud:" + cmd] = ()=>this[cmd]()
       return cmdDict
    }, {})
    this.subscriptions.add(atom.commands.add('atom-workspace', cmdDict));
  },
  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.apicloudView.destroy();
  },

  serialize() {
    return {
      apicloudViewState: this.apicloudView.serialize()
    };
  },
  /* Wifi真机同步配置-查看Wifi真机同步服务器地址. */
  get_wifisync_info(){
    let editor = atom.workspace.getActiveTextEditor()
    let query = editor.getSelectedText()
    let language = editor.getGrammar().name
    atom.notifications.addInfo(language + "get_wifisync_info")
  },
  /* Wifi真机同步配置-安装服务. */
  install_wifysync_app(){
    alert("install_wifysync_app")

  },
  /* Wifi真机同步配置-启动服务. */
  start_wifysync_app(){
    alert("start_wifysync_app")
  },
  /* Wifi真机同步配置-停止服务. */
  stop_wifysync_app(){
    alert("stop_wifysync_app")

  },
  /* Wifi真机同步. */
  wifi_sync(){
    alert("wifi_sync")

  },
  /* Wifi全量真机同步. */
  wifi_syncall(){
    alert("wifi_syncall")

  },
  /* Wifi真机预览. */
  wifi_preview(){
    alert("wifi_preview")

  },
  /* 新建APICloud项目-空白应用. */
  new_default_app(){
    alert("new_default_app")

  },
  /* 新建APICloud项目-底部导航. */
  new_bottom_app(){
      alert("new_bottom_app")
  },
  /* 新建APICloud项目-首页导航. */
  new_home_app(){
    alert("new_home_app")
  },
  /* 新建APICloud项目-侧边导航. */
  new_slide_app(){
    alert("new_slide_app")

  },
  /* 新建APICloud文件. */
  new_html(){
    alert("new_html")

  },
  /* Android真机同步. */
  loader_android(){
    alert("loader_android")
  },
  /* iOS真机同步. */
  loader_ios(){
    alert("loader_ios")
  },
  /* 压缩Widget包. */
  compress_widget(){
    alert("compress_widget")
  },
  /* 本地打包. */
  build_apk(){
    alert("build_apk")
  }
};
