import React, { Component } from 'react';
import { Picker, List, InputItem } from 'antd-mobile';
import appConfig from '../config-app.json';
import axios from 'axios';
import storage from '../model/storage';

const ListItem = List.Item;

class FindCarInfo extends Component {
    constructor(props) {
        super(props);
        console.log('找车信息：', this.props.location.state)


        this.state = {
            subData: {},     //提交的数据集
            sortArr: [],
            sortName: '牵引车',
            sortId: 0,
            outStandardArr: [
                {
                    label: '国三',
                    value: '国三'
                },
                {
                    label: '国四',
                    value: '国四'
                },
                {
                    label: '国五',
                    value: '国五'
                },
                {
                    label: '其他',
                    value: '其他'
                },
            ],
            carYearArr: [
                {
                    label: '2019',
                    value: '2019-01-01'
                },
                {
                    label: '2018',
                    value: '2018-01-01'
                },
                {
                    label: '2017',
                    value: '2017-01-01'
                },
                {
                    label: '2016',
                    value: '2016-01-01'
                },
                {
                    label: '2015',
                    value: '2015-01-01'
                },
                {
                    label: '2014',
                    value: '2014-01-01'
                },
                {
                    label: '其他',
                    value: '1753-12-12'
                }
            ],
            driveTypeArr: [
                {
                    label: '4x2',
                    value: '4x2'
                },
                {
                    label: '6x2',
                    value: '6x2'
                },
                {
                    label: '6x4',
                    value: '6x4'
                },
                {
                    label: '8x2',
                    value: '8x2'
                },
                {
                    label: '8x4',
                    value: '8x4'
                },
                {
                    label: '其它',
                    value: '其它'
                }
            ],
            areas: [],
            carYear: '',
            RegionId: '',
            citys: [],
            qus: [],         //区
            year: '请选择车辆年份',
            outStandard: '请选择排放标准',
            driveType: '请选择驱动',
            areaName: '请选择地区',
            preMoney: 0,
            carPower: 0,
            contactName:'',
            contactTel:''
        }
    }

    componentDidMount = () => {
        let sortArr = this.props.location.state.sortList;
        this.getData(sortArr);
        this.getRegion();
    }

    getData = (sortList) => {
        let arr = [];
        let defaultValue = '';
        for (let i in sortList) {
            let label = sortList[i].text;
            let value = sortList[i].value;
            if (value == this.props.location.state.pid) {
                defaultValue = label;
            }
            let item = {
                label: label,
                value: value
            }
            arr.push(item);
        }
        this.setState({
            sortArr: arr,
            sortName: defaultValue,
            sortId: this.props.location.state.pid
        })
        console.log('数据：', arr)
    }

    getSortInfo = (value) => {
        let sortList = this.state.sortArr;
        let sortName = this.state.sortName;
        for (let i in sortList) {
            if (value == sortList[i].value) {
                sortName = sortList[i].label;
            }
        }
        this.setState({
            sortId: value[0],
            sortName: sortName
        })
    }

    carYearInfo = (value) => {
        let carYearArr = this.state.carYearArr;
        let year = this.state.year;
        let carYear = this.state.carYear;
        for (let i in carYearArr) {
            if (value == carYearArr[i].value) {
                year = carYearArr[i].label;
            }
        }
        this.setState({
            carYear: value,
            year: year,
            carYearArr: carYearArr
        })
    }

    // 获取地区
    getRegion = () => {
        let url = appConfig.url + 'api/shop/cooapps/LimitApps/getcascader';
        axios.post(url).then((response) => {
            // handle success
            console.log('地区:', response.data.data);
            if (response.status == 200) {
                if (response.data.data.length > 0) {
                    this.setState({
                        areas: response.data.data
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

    getAreasName = (value) => {
        console.log('areaIds:', value)

        let areas = this.state.areas;
        let p = '';
        let pId = 0;
        let c = '';
        let cId = 0;
        let q = '';
        let qId = 0;
        let areaName = this.state.areaName;
        if (value.length === 3) {
            pId = value[0];
            cId = value[1];
            qId = value[2];
        }
        if (value.length === 2) {
            pId = value[0];
            cId = value[1];
        }
        for (var i in areas) {
            if (pId == areas[i].value) {
                p = areas[i].label;
                let citys = areas[i].children;
                let quss = [];
                for (var j in citys) {

                    if (cId == citys[j].value) {
                        c = citys[j].label;
                        console.log('c:', citys[j])
                        console.log('c2:', citys[j].children)
                        quss = citys[j].children;
                        console.log('quss:', quss)

                        if (quss === undefined) {
                            areaName = p + ',' + c;
                            value=value[0]+','+value[1];
                        } else {
                            for (var k in quss) {
                                if (qId == quss[k].value) {
                                    q = quss[k].label;
                                }
                            }
                            areaName = p + ',' + c + ',' + q;
                            value=value[0]+','+value[1]+','+value[2];
                        }
                    }
                }
                console.log(areaName);
                this.setState({
                    areaName: areaName,
                    RegionId: value
                })
            }
        }

    }

    //提交
    helpBuyCar=()=>{
        if(this.state.carYear==""){
            alert("请选择车辆年份！")
            return;
        }
        if(this.state.preMoney==0){
            alert("请填写预算！")
            return;
        }
        if(this.state.outStandard=='请选择排放标准' && this.state.sortId !=2 ){
            alert("请选择排放标准")
            return;
        }
        if(this.state.driveType=='请选择驱动' && this.state.sortId !=2){
            alert("请选择驱动")
            return;
        }
        if(this.state.areaName=='请选择地区'){
            alert("请选择地区")
            return;
        }
        if(this.state.contactName==''){
            alert("请输入联系人")
            return;
        }
        if(!(/^1[23456789]\d{9}$/.test(this.state.contactTel))){
            alert("请输入正确的手机号")
            return;
        }

        let url = appConfig.url + 'api/shop/cooapps/LimitApps/HelpBuyCar';
        let OutStandard='';
        let DriveType='';
        let CarPower='';
        if(this.state.sortId!=2){
            OutStandard=this.state.outStandard[0];
            DriveType=this.state.driveType[0];
            CarPower=this.state.carPower;
        }
        
        let inputView={
            CarYear:this.state.carYear[0],
            ContactTel:this.state.contactTel,
            ContactName:this.state.contactName,
            RegionId:this.state.RegionId,
            RegionName:this.state.areaName,
            SortId:this.state.sortId,
            SortName:this.state.sortName,
            OutStandard:OutStandard,
            PreMoney:this.state.preMoney,
            DriveType:DriveType,
            CarPower:CarPower,
            UserId:storage.get("userid")
        };
        //console.log("数据：",inputView)
        axios.post(url,{inputview:inputView}).then((response) => {
            // handle success
            console.log('数据:', response);
            if (response.status == 200) {
                this.props.history.push('/Submit')
            }
        })          
    }

    render() {
        return (
            <div className='write-info'>
                <List className="picker-list">
                    <Picker className="forss"
                        data={this.state.sortArr}
                        extra={this.state.sortName}
                        onChange={this.getSortInfo}
                        onOk={this.getSortInfo}
                        cols={1}
                        itemStyle={{ fontSize: '15px' }}
                    >
                        <ListItem className='list-item' arrow="horizontal">车辆信息</ListItem>
                    </Picker>
                    <hr />
                    <Picker className="forss"
                        data={this.state.carYearArr}
                        extra={this.state.year}
                        onChange={this.carYearInfo}
                        onOk={this.carYearInfo}
                        cols={1}
                        itemStyle={{ fontSize: '15px' }}
                    >
                        <ListItem className='list-item' arrow="horizontal">年份</ListItem>
                    </Picker>
                    <hr />
                    <InputItem clear placeholder="请输入整数" extra='万元' type='number' onChange={v => this.setState({ preMoney: v })}>预算</InputItem>
                    {this.state.sortId != 2 && <hr />}
                    {this.state.sortId != 2 &&
                        <InputItem clear placeholder="请输入整数" extra='匹' type='number' onChange={v => this.setState({ carPower: v })}>马力</InputItem>
                    }
                    {this.state.sortId != 2 &&

                        <Picker className="forss"
                            data={this.state.outStandardArr}
                            extra={this.state.outStandard}
                            onChange={v => this.setState({ outStandard: v })}
                            onOk={v => this.setState({ outStandard: v })}
                            cols={1}
                            itemStyle={{ fontSize: '15px' }}
                        >
                            <ListItem className='list-item' arrow="horizontal">排放标准</ListItem>
                        </Picker>
                    }
                    {this.state.sortId != 2 && <hr />}
                    {
                        this.state.sortId != 2 &&

                        <Picker className="forss"
                            data={this.state.driveTypeArr}
                            extra={this.state.driveType}
                            onChange={v => this.setState({ driveType: v })}
                            onOk={v => this.setState({ driveType: v })}
                            cols={1}
                            itemStyle={{ fontSize: '15px' }}
                            title="驱动"
                        >
                            <ListItem className='list-item' arrow="horizontal">驱动</ListItem>
                        </Picker>
                    }
                    <hr />
                    <Picker extra={this.state.areaName}
                        data={this.state.areas}
                        title="地域"
                        itemStyle={{ fontSize: '15px' }}
                        onOk={this.getAreasName}
                        onDismiss={e => console.log('dismiss', e)}
                        className='dy'
                    >
                        <ListItem arrow="horizontal">地域</ListItem>
                    </Picker>
                </List>

                <List className="picker-list">
                    <InputItem clear placeholder="请输入联系人姓名" onChange={v => this.setState({ contactName: v })}>联系人</InputItem>
                    <hr />
                    <InputItem clear placeholder="请输入手机号码"  onChange={v => this.setState({ contactTel: v })}>手机号</InputItem>
                </List>
                <div className="sell-buttom">
                <button className='helpBuyCar' onClick={this.helpBuyCar}>帮我找车</button>
                </div>                
            </div>
        )
    }
}

export default FindCarInfo;