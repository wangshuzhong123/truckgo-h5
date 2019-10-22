import React, { Component } from 'react';
import banner from '../assets/images/home-banner.png'
import { Flex, WhiteSpace, Button } from 'antd-mobile';
import axios from 'axios';
import ProductList from './ProductList';
import appConfig from '../config-app.json';

//引入自定义模板
import storage from '../model/storage';

class Home extends Component {


    constructor(props) {
        super(props);

        this.state = {
            list: [],
            click_num: 0,
            btn_show:false
        }
        let json = this.getUrlParam();
        this.checkApp(json);       
    }

    //组件被挂载之后，自动执行
    componentDidMount = () => {
        let json = this.getUrlParam();
        storage.set('appid', json.appid);
        storage.set('userid', json.userid);

        this.axiosPost(json.appid, 0);
    }

    //获取url参数
    getUrlParam=()=>{
        var searchHref = window.location.search.replace('?', '');
        var params = searchHref.split('&');
        var json = {};
        params.forEach(function (param) {
            var paramSplit = param.split('=');
            json[paramSplit[0]] = paramSplit[1];
        });        
        return json;
    }

    checkApp=(json)=>{
        let url = appConfig.url + 'api/shop/cooapps/LimitApps/CheckApps';
        axios({
            url: url,
            method: 'post',
            data: {
                inputView: {
                    AppId: json.appid,
                    UserId: json.userid,
                    Token: json.token
                }
            }
        }).then(res => {
            //console.log('check请求结果：', res.data);
            if (res.data.status == "success") {
                
            }
            if (res.data.status != "success") {
                alert("验证失败");
                this.props.history.push('/Error');
                return false;
            }                   
        });
    }
    
    axiosPost = (appid, click_num) => {
        let url = appConfig.url + 'api/shop/cooapps/LimitApps/GetProductInfoPagerList';
        axios.post(url, {
            inputView: {
                AppId: appid
            },
            pagesize: (click_num + 1) * 5
        }).then((response) => {
            // handle success
            //console.log(response);
            if (response.status == 200) {
                if (response.data.status == "error") {

                    return;
                }
                if (response.data.data.list.length > 0) {
                    let btn_show = false;
                    if(this.state.click_num === 0 && response.data.data.list.length <5){
                        btn_show = true;
                    }
                    this.setState({
                        list: response.data.data.list,
                        btn_show:btn_show
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
    }

    goRouter = (url) => {
        this.props.history.push({ pathname: url, state: { 'param': '所传参数' } })
    }

    getMoreCar = () => {
        let temp_num = this.state.click_num + 1;

        this.setState({
            click_num: temp_num
        })
        this.axiosPost(storage.get('appid'), temp_num);
    }

    render() {        

        return (
            <div className='home-mainer'>
                <Flex>
                    <img className='banner' src={banner} alt='' />
                </Flex>
                <WhiteSpace size="lg" />
                <Flex direction='row' className='btn-link'>
                    <Flex.Item>
                        <Button className='home-btn' type="primary"  onClick={this.goRouter.bind(this, '/FindCar')}>帮我找车</Button>
                    </Flex.Item>
                    <Flex.Item>
                        <Button className='home-btn' type="warning"  onClick={this.goRouter.bind(this, '/CarManage')}>我要卖车</Button>
                    </Flex.Item>
                </Flex>
                <WhiteSpace size="lg" />
                <div className='home-tj'>
                    <p className='home-title'>好车推荐</p>
                    <hr className='hr' />
                </div>

                <Flex style={{ margin: '15px' }}>
                    <div className='home-content'>
                        <ProductList list={this.state.list} path='Home'/>
                        {
                            (this.state.click_num+1)*5 <= this.state.list.length &&
                            <button className='home-morecar' onClick={this.getMoreCar} >查看更多车源</button>
                        }    
                        {
                            this.state.btn_show &&
                            <button className='home-morecar' onClick={this.getMoreCar} >查看更多车源</button>
                        }                      
                    </div>

                </Flex>
            </div>
        )
    }
}

export default Home;