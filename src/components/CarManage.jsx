import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
//import nocar from '../assets/images/nocar.png'
import ProductList from './ProductList';
import axios from 'axios';
import appConfig from '../config-app.json';
import storage from '../model/storage';

class CarManage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '车辆管理',
            num: 3,
            on_num: 2,
            off_num: 1,
            in_num: 0,
            index: 0,
            list: []
        }        
        
    };

    //组件被挂载之后，自动执行
    componentDidMount = () => {
        let param={
            inputview:{
                AppId:storage.get('appid'),
                AppUserId:storage.get('userid')
            }            
        }

        this.axiosPost(param);
    }

    axiosPost = (param) => {
        let url = appConfig.url + 'api/shop/cooapps/LimitApps/GetProductInfoPagerList';
        axios.post(url,param).then((response) => {
            // handle success
            //console.log(response);
 
            if (response.status == 200) {
                if (response.data.status == "error") {
                    alert(response.data.message);
                    return;
                }
                if (response.data.status == "success") {                   
                    this.setState({
                        allList: response.data.data.list == undefined ? [] : response.data.data.list,
                        num: response.data.data.list == undefined ? 0 : response.data.data.list.length,
                        confirmingList:response.data.data.ConfirmingList == undefined ? [] : response.data.data.ConfirmingList,
                        in_num: response.data.data.ConfirmingList == undefined ? 0 : response.data.data.ConfirmingList.length,
                        sellingList:response.data.data.SellingList == undefined ? [] : response.data.data.SellingList,
                        on_num: response.data.data.SellingList == undefined ? 0 : response.data.data.SellingList.length ,
                        unSellList:response.data.data.UnSellList == undefined ? [] : response.data.data.UnSellList,
                        off_num: response.data.data.unSellList == undefined ? 0 : response.data.data.UnSellList.length,
                        list:response.data.data.list == undefined ? [] : response.data.data.list,
                    })
                }
            }
        })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .finally(() => {
                // always executed
            });
    };

    getData = (state) => {
        console.log(state)
        if(state==0){
            //console.log("进入0")
            this.setState({
                list: this.state.allList,
                index: state
            })
        }
        if(state==1){
            this.setState({
                list: this.state.sellingList,
                index: state
            })
        }
        if(state==2){
            this.setState({
                list: this.state.unSellList,
                index: state
            })
        }
        if(state==3){
            this.setState({
                list: this.state.confirmingList,
                index: state
            })
        }                
    };

    uploadProduct=()=>{
        this.props.history.push({ pathname: '/SelectCarSort', state: { 'page': 'CarManage' } })
    };

    render() {
        return (
            <div className='cm-mainer'>   
                {console.log(this.state.list)} 
                {console.log("allList",this.state.allList)}             
                <div className='manage-title'>
                    <h3 className='tit'>{this.state.title}</h3>
                    <Flex>
                        <Flex.Item className={`tabbar ${this.state.index == 0 ? "active" : null}`} onClick={this.getData.bind(this, "0")}>全部({this.state.num})</Flex.Item>
                        <Flex.Item className={`tabbar ${this.state.index == 1 ? "active" : null}`} onClick={this.getData.bind(this, "1")}>已上架({this.state.on_num})</Flex.Item>
                        <Flex.Item className={`tabbar ${this.state.index == 2 ? "active" : null}`} onClick={this.getData.bind(this, "2")}>未上架({this.state.off_num})</Flex.Item>
                        <Flex.Item className={`tabbar ${this.state.index == 3 ? "active" : null}`} onClick={this.getData.bind(this, "3")}>审核中({this.state.in_num})</Flex.Item>
                    </Flex>

                </div>
                <hr className='cm-hr' />
                <div className='cm-contenter'>
                    <ProductList list={this.state.list} path='CarManage' />
                    <div className='upload'>
                        <button className='btn-upload' onClick={this.uploadProduct}>上架商品</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CarManage;