import React, { Component } from 'react';
import axios from 'axios';
import { Flex, Carousel } from 'antd-mobile';

import appConfig from '../config-app.json';
import step1 from '../assets/images/step1.png';
import step2 from '../assets/images/step2.png';
import step3 from '../assets/images/step3.png';
import step4 from '../assets/images/step4.png';
import stepgo from '../assets/images/step-go.png'

class CarDetails extends Component {
    constructor(props) {
        super(props);
        console.log('详情：', props)
        let carId = props.location.state.id;
        let param = {
            Id: carId
        };

        this.state = {
            param: param,
            model: {},
            imgs: [],
            gj: {},
            imgHeight: 100
        }

        console.log("gouzao", this.state.model)
    }

    //组件被挂载之后，自动执行
    componentDidMount = () => {
        this.axiosPost(this.state.param);        
    }

    axiosPost = (param) => {
        console.log('请求参数：', param)
        let url = appConfig.url + 'api/shop/cooapps/limitapps/getsingle';
        axios.post(url, {
            inputView: param
        }).then((response) => {
            // handle success
            console.log(response);
            if (response.status == 200) {

                if (response.data.status == "error") {
                    alert(response.data.message);
                    return;
                }
                if (response.data.data.imgs.length > 0) {
                    console.log("imgs:", response.data.data.imgs)
                    console.log("TypeId:", response.data.data.imgs[0].TypeId)
                    let model = response.data.data.model;
                    model.CardTime = model.CardTime.substring(0, 4);
                    model.Mileage = model.Mileage / 10000;
                    model.AddDateTime = model.AddDateTime.substring(0, 11);
                    this.setState({
                        model: model,
                        imgs: response.data.data.imgs,
                        gj: response.data.data.gj
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

    render() {
        return (
            <div className='productDetail'>
                {this.state.imgs.length > 1 &&
                    <Carousel
                        autoplay={false}
                        infinite={false}
                    >
                        {this.state.imgs.map((item, index) => (
                            <div key={index} style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}>
                                <img
                                    src={appConfig.url + item.ImgList[0].FileSrc}
                                    alt=""
                                    style={{ width: '100%', heigth: '250px' }}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            </div>
                        ))}
                    </Carousel>
                } 

                {this.state.imgs.length === 1 &&
                    <Carousel
                        autoplay={false}
                        infinite={false}
                    >
                        {this.state.imgs[0].ImgList.map((item, index) => (
                            <div key={index} style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}>
                                <img
                                    src={appConfig.url + item.FileSrc}
                                    alt=""
                                    style={{ width: '100%', heigth: '250px' }}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            </div>
                        ))}
                    </Carousel>
                }


                <div className='productInfo'>
                    <div className='infotop'>

                        <span className='infotop-title'>{this.state.model.Title}</span>
                        <span className='infotop-productNo'>车辆编号：{this.state.model.ProductNo}</span>

                        <a className='infotop-btn' type="button" href="tel:400-6561-919">咨询底价</a>
                        <span className='infotop-price'>{this.state.model.Price}万</span>


                    </div>
                    <hr className='product-hr' />
                    <div className='infosecond'>
                        <Flex>
                            <Flex.Item className='f-item'>
                                <span className='infosecond-tit'>上牌时间</span>
                                <span className='infosecond-info'>{this.state.model.CardTime}年</span>
                            </Flex.Item>
                            <Flex.Item className='f-item'>
                                <span className='infosecond-tit'>表里程数</span>
                                <span className='infosecond-info'>{this.state.model.Mileage}万公里</span>
                            </Flex.Item>
                            <Flex.Item className='f-item'>
                                <span className='infosecond-tit'>排放标准</span>
                                <span className='infosecond-info'>{this.state.model.OutStandard}</span>
                            </Flex.Item>
                            <Flex.Item className='f-item'>
                                <span className='infosecond-tit'>发布时间</span>
                                <span className='infosecond-info'>{this.state.model.AddDateTime}</span>
                            </Flex.Item>
                        </Flex>
                    </div>
                    <hr className='product-hr' />
                    <div className='gj'>
                        <div className='gj-top'>
                            <a type="button" className='gj-zx' href="tel:400-6561-919">咨询车况</a>
                            <div className='gj-main'>
                                <img src={appConfig.url + this.state.gj.CompanyLogo} />
                                <div className='gj-info'>
                                    <span className='gj-info-top'>
                                        卡购管家-{this.state.gj.NickName}
                                    </span>
                                    <span className='gj-info-buttom'>
                                        累计交易{this.state.gj.TotalTrade}台，近30天带看{this.state.gj.MonthLook}次
                                    </span>
                                </div>
                            </div>

                        </div>

                        <div className='gj-buttom'>
                            <p>
                                <span className='gjs' style={{ display: 'inline-block' }}>管家说</span>车辆都是自己平常开着在工地干活的，平时也是按时保<br />养，性能没有问题的，大可以放心购买，绝对靠谱！
                                </p>
                        </div>
                    </div>
                    <hr className='product-hr' />
                    <div className='buystep'>
                        <Flex className='buystep-top'>
                            <span>购买流程</span>
                        </Flex>
                        <Flex>
                            <Flex.Item>
                                <div className='step'>
                                    <img src={step1} alt='' />
                                    <span>电话咨询</span>
                                    <span>预约看车</span>
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div className='stepgo'>
                                    <img src={stepgo} alt='' />
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div className='step'>
                                    <img src={step2} alt='' />
                                    <span>管家陪同</span>
                                    <span>现场看车</span>
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div className='stepgo'>
                                    <img src={stepgo} alt='' />
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div className='step'>
                                    <img src={step3} alt='' />
                                    <span>签订协议</span>
                                    <span>支付定金</span>
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div className='stepgo'>
                                    <img src={stepgo} alt='' />
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div className='step'>
                                    <img src={step4} alt='' />
                                    <span>交易完成</span>
                                    <span>开车回家</span>
                                </div>
                            </Flex.Item>

                        </Flex>
                    </div>
                    <div className='infobuttom'>
                        <Flex className='infobuttom-top'>
                            <span>设备实拍</span>
                        </Flex>
                        <Flex>
                            <Flex.Item>    
                      
                                {this.state.imgs.length > 1 &&
                                    <div className='showImgs'>
                                        {
                                            this.state.imgs.map((item, index) => {
                                                return (
                                                    <img className='showimg' src={appConfig.url + item.ImgList[0].FileSrc} key={index} alt='' />
                                                )
                                            })
                                        }
                                    </div>
                                }

                                {this.state.imgs.length === 1 &&
                                    <div className='showImgs'>
                                        {
                                            this.state.imgs[0].ImgList.map((item, index) => {
                                                return (
                                                    <img className='showimg' src={appConfig.url + item.FileSrc} key={index} alt='' />
                                                )
                                            })
                                        }
                                    </div>
                                }

                            </Flex.Item>
                        </Flex>

                    </div>
                </div>
            </div>
        )
    }
}

export default CarDetails;