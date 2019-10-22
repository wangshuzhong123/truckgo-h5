import React, { Component } from 'react';
import { ImagePicker } from 'antd-mobile';
import appConfig from '../config-app.json';
import axios from 'axios';

class ImageUpload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      url: '',
      uploadArr: [],    //上传图片集合
      guid:null   //上传时的guid
    };
  }


  //组件被挂载之后，自动执行
  componentDidMount = () => {
    console.log("files:", this.state.files.length)
    if (this.state.files.length === 0) {
      let guid = this.guid();
      this.setState({
        guid: guid
      })
    }
    let formUrl = appConfig.url + 'api/shop/cooapps/LimitApps/UploadImage';
    this.setState({
      url: formUrl
    })
  }


  guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  onChange = (files, type, index) => {
    console.log("diyi:", files, type, index);
    if (type === 'add') {
      let add_idx = files.length - 1;   //新增时的索引
      console.log(files, type, add_idx);
      
      files[add_idx].id = 0;

      this.setState({
        files,
      });
      console.log("this.state.files22:", this.state.files)


      let currentFile = files[add_idx].file;
      let newfile = new File([currentFile], new Date().getTime() + "_h5.jpg", { type: "image/jpeg" });

      console.log('当前图片文件：', currentFile);
      console.log('重命名后图片文件：', newfile);

      this.uploadImgToServer(newfile)

    }
    if (type === 'remove') {
      console.log(files, type, index);

      let imgArr=this.state.uploadArr;
      let temp=imgArr[index];
      imgArr.splice(index,1);
      this.setState({
        files,
        uploadArr:imgArr
      });
      this.deleteImg(temp);
    }

  };

  uploadImgToServer = (file) => {

    /* eslint-disable no-undef */
    let param = new FormData()  // 创建form对象

    param.append('uid', file.lastModified)
    param.append('typeId', 70006)
    param.append('fileType', 3)
    param.append('guid', this.state.guid)
    param.append('file', file, file.name) // 通过append向form对象添加数据


    let config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    // 添加请求头
    axios.post(this.state.url, param, config)
      .then(response => {
        if (response.data.status === "success") {
          console.log("success", response.data.data)
          let imgArr=this.state.uploadArr;
          imgArr.push(response.data.data);
          this.setState({
            uploadArr:imgArr
          })         
        }

        console.log("this.state.uploadArr:",this.state.uploadArr)
      })
  };

  deleteImg=(imgFile)=>{
    console.log("imgFile:",imgFile)
    let url=appConfig.url + 'api/shop/cooapps/LimitApps/Delete';
    axios.post(url, {
      inputview:{
        typeId:70006,
        uid:imgFile.uid
      }      
    })
      .then(response => {
        if (response.data.status === "success") {
          console.log("success", response.data.message)        
        }
      })
  }



  onTabChange = (key) => {
    console.log(key);
  };
  render() {
    const { files } = this.state;
    return (
      <div className="img-content">        
        <ImagePicker
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 4}
          className="upimg"
          accept="image/gif,image/jpeg,image/jpg,image/png"
        />
      </div>
    );
  }
}
export default ImageUpload;