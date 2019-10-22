import React, { Component } from 'react';
import ImageUpload from "../components/ImageUpload"
import { Picker, List, InputItem, TextareaItem, Radio, Flex } from 'antd-mobile';
import axios from 'axios';
import appConfig from '../config-app.json';
import storage from '../model/storage';

const ListItem = List.Item;
const driveTypeArr = [
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
];
const outStandardArr = [
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
];



class SellCarInfo extends Component {
    constructor(props) {
        super(props);
        console.log('卖车信息：', props)

        this.state = {
            contactName: null,
            contactTel: null,
            motorArr: [],   //发动机
            motor: '必填',
            fuelArr: [],      //燃料
            fuel: '必填',
            areas: [],
            carPower: '',
            driveType: '必填',
            mileage: '',
            outStandard: '必填',
            cardTime: null,
            address: '必填',      //车辆所在地
            regionText: '必填',    //车辆归属地
            remake: null,
            regionId: null,
            remark: null,
            kgh:1,      //是否可过户 默认 可过户
            kghText:'可过户',
            price:null
        }
    };

    componentDidMount = () => {
        let pid = this.props.location.state.pid;
        this.getData(pid);
        this.getRegion();
    };

    getData = (pid) => {
        let url = appConfig.url + 'api/shop/cooapps/limitapps/getsingle';
        axios.post(url, {
            inputView: { pid: pid }
        }).then((response) => {
            //console.log(response);
            if (response.status == 200) {

                if (response.data.status == "error") {
                    alert(response.data.message);
                    return;
                }
                if (response.data.data.list.length > 0) {
                    let list = response.data.data.list;
                    let tempMotorArr = list[20].DefaultValue.split("|");
                    let motorArr = this.changeArrType(tempMotorArr);

                    let tempFuelArr = list[22].DefaultValue.split("|");
                    let fuelArr = this.changeArrType(tempFuelArr);
                    this.setState({
                        motorArr: motorArr,
                        fuelArr: fuelArr
                    })
                }
            }
        })
    };

    changeArrType = (arr) => {
        let newArr = [];
        let temp = {};
        for (let i in arr) {
            temp = {
                label: arr[i],
                value: arr[i]
            };
            newArr.push(temp);
        }
        return newArr;
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
        }).catch((error) => {
            // handle error
            console.log(error);
        })
    };

    getAreasName = (param, value) => {
        console.log('areaIds:', value)
        console.log('param:', param)

        let areas = this.state.areas;
        let p = '';
        let pId = 0;
        let c = '';
        let cId = 0;
        let q = '';
        let qId = 0;
        let areaName = null;
        if (param === "address") {
            areaName = this.state.address;
        }
        if (param === "regionText") {
            areaName = this.state.regionText;
        }
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
                            //value = value[0] + ',' + value[1];
                        } else {
                            for (var k in quss) {
                                if (qId == quss[k].value) {
                                    q = quss[k].label;
                                }
                            }
                            areaName = p + ',' + c + ',' + q;
                            //value = value[0] + ',' + value[1] + ',' + value[2];
                        }
                    }
                }
                console.log("areaName:", areaName);
                if (param === "address") {
                    this.setState({
                        address: areaName,
                        regionId: value
                    })
                }
                if (param === "regionText") {
                    this.setState({
                        regionText: areaName,
                        regionId: value
                    })
                }
            }
        }

    };

    handleGuohu=(e)=>{
        console.log("过户：",e.target.value);
        let text=null;
        if(e.target.value==0){
            text='不可过户';
        }
        if(e.target.value==1){
            text='可过户';
        }
        console.log(text)
        this.setState({
            kgh:e.target.value,
            kghText:text
        })

    };

    subSellInfo = () => {
        if(this.refs.child.state.uploadArr.length<4){
            alert("请根据要求上传4张车辆照片")
            return false;
        }
        if(this.state.contactName==null || this.state.contactName==""){
            alert("请输入姓名")
            return false;
        }
        if(!(/^1[23456789]\d{9}$/.test(this.state.contactTel))){
            alert("请输入正确的手机号")
            this.setState({
                contactTel:null
            })
            return;
        }
        if(this.state.carPower==''){
            alert("请输入最大马力")
            return false;
        }
        if(this.state.motor=='必填'){
            alert("请选择发动机品牌")
            return false;
        }
        if(this.state.fuel=='必填'){
            alert("请选择燃料类型")
            return false;
        }
        if(this.state.driveType=='必填'){
            alert("请选择驱动形式")
            return false;
        }
        if(this.state.mileage==''){
            alert("请输入表显里程")
            return false;
        }
        if(this.state.outStandard=='必填'){
            alert("请选择排放标准")
            return false;
        }
        if(this.state.cardTime=='' || this.state.cardTime==null){
            alert("请填写上牌时间")
            return false;
        }
        if(this.state.address=='必填'){
            alert("请选车辆所在地")
            return false;
        }
        if(this.state.regionText=='必填'){
            alert("请选择车辆归属地")
            return false;
        }

        var testmoney = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9](0-9)?$)/;
        if(!testmoney.test(this.state.price)){
            alert("请输入合法的价格")
            this.setState({
                testmoney:null
            })
            return false;
        }

        let driveType=this.state.driveType[0];
        let outStandard = this.state.outStandard[0];
        let motor = this.state.motor[0];
        let fuel = this.state.fuel[0];
        let mileage = this.state.mileage;
        let carPower = this.state.carPower;
        let title=carPower+'马力 ' +driveType+' '+outStandard+' '+this.props.location.state.sortName;
        let thumbSrc = this.refs.child.state.uploadArr[0].thumbUrl;     //未完成
        let thumbSrcArr = thumbSrc.split("/");
        thumbSrc=thumbSrcArr[2];
        //console.log("------------thumbSrc:",thumbSrc)
        if(this.props.location.state.pid==2){
            driveType=null;
            outStandard=null;
            motor=null;
            fuel=null;
            mileage=null;
        }

        let url = appConfig.url + 'api/shop/cooapps/LimitApps/InsertProduct';
        let inputview = {
            Title:title,
            SortId:this.props.location.state.pid,
            AppId: storage.get("appid"),
            AppUserId: storage.get("userid"),
            AppMobile: this.state.contactTel,
            AppUserName: this.state.contactName,
            //MemberId:storage.get("memberId"),
            CarPower: carPower,
            DriveType: driveType,
            Mileage: mileage,
            OutStandard: outStandard,
            CardTime: this.state.cardTime,
            Address: this.state.address,
            RegionName: this.state.regionText,
            RegionIds: this.state.regionId,
            SitePrice:this.state.price*10000,
            Price:this.state.price*10000,
            Remark: this.state.remark,
            Guid:this.refs.child.state.guid,     //图片上传的guid
            SellNum:1,
            AdminId:1,
            ThumbSrc:thumbSrc
        }
        let ExtContent = [
            { InfoId: 0, ItemId: 78, Content: motor },
            { InfoId: 0, ItemId: 80, Content: fuel },
            { InfoId: 0, ItemId: 98, Content: this.state.kghText }
        ];
        inputview.ExtContent=ExtContent;
        //console.log("inputview:",inputview)
        let param = {
            inputview: inputview
        }
        axios.post(url, param).then((response) => {
            // handle success
            //console.log('插入:', response.data);
            if (response.data.status == "success") {
                this.props.history.push('/Submit');
            }
        }).catch((error) => {
            // handle error
            console.log(error);
        })
    };


    render() {
        return (
            <div className='mainer sell-mainer'>            
                <div className='sell-top'>
                    <span className='sell-title'>车辆照片<span>(必填项)</span></span>
                    <span className="img-warn">请上传<span>车辆正面</span>、<span>左前45度</span>、<span>车辆铭牌</span>、<span>车辆牌照</span><span> 4 </span>张照片</span>
                    <ImageUpload ref="child" />
                </div>

                <div className="sell-item">
                    <List className="picker-list">
                        <InputItem clear placeholder="必填 " onChange={v => this.setState({ contactName: v })}>姓名</InputItem>
                        <hr />
                        <InputItem clear placeholder="必填 " onChange={v => this.setState({ contactTel: v })}>联系电话</InputItem>
                    </List>
                </div>

                <div className="sell-item">
                    <List className="picker-list sell-info-list">
                        <span className="sell-item-title">{this.props.location.state.sortName}</span>
                        <hr />
                        {this.props.location.state.pid != 2 &&
                            <InputItem clear placeholder="必填 " extra='匹' type='number' onChange={v => this.setState({ carPower: v })}>最大马力</InputItem>
                        }
                        {this.props.location.state.pid != 2 && <hr />}
                        {
                            this.props.location.state.pid != 2 &&

                            <Picker className="forss"
                                data={this.state.motorArr}
                                extra={this.state.motor}
                                onChange={v => this.setState({ motor: v })}
                                onOk={v => this.setState({ motor: v })}
                                cols={1}
                                itemStyle={{ fontSize: '15px' }}
                                title="发动机品牌"
                            >
                                <ListItem className='list-item' arrow="horizontal">发动机品牌</ListItem>
                            </Picker>
                        }
                        {this.props.location.state.pid != 2 && <hr />}
                        {
                            this.props.location.state.pid != 2 &&

                            <Picker className="forss"
                                data={this.state.fuelArr}
                                extra={this.state.fuel}
                                onChange={v => this.setState({ fuel: v })}
                                onOk={v => this.setState({ fuel: v })}
                                cols={1}
                                itemStyle={{ fontSize: '15px' }}
                                title="燃料类型"
                            >
                                <ListItem className='list-item' arrow="horizontal">燃料类型</ListItem>
                            </Picker>
                        }
                        {this.props.location.state.pid != 2 && <hr />}
                        {
                            this.props.location.state.pid != 2 &&

                            <Picker className="forss"
                                data={driveTypeArr}
                                extra={this.state.driveType}
                                onChange={v => this.setState({ driveType: v })}
                                onOk={v => this.setState({ driveType: v })}
                                cols={1}
                                itemStyle={{ fontSize: '15px' }}
                                title="驱动形式"
                            >
                                <ListItem className='list-item' arrow="horizontal">驱动形式</ListItem>
                            </Picker>
                        }
                        {this.props.location.state.pid != 2 && <hr />}
                        {this.props.location.state.pid != 2 &&
                            <InputItem clear placeholder="必填 " extra='公里' type='number' onChange={v => this.setState({ mileage: v })}>表显里程</InputItem>
                        }
                        {this.props.location.state.pid != 2 && <hr />}

                        {this.props.location.state.pid != 2 && <hr />}
                        {
                            this.props.location.state.pid != 2 &&

                            <Picker className="forss"
                                data={outStandardArr}
                                extra={this.state.outStandard}
                                onChange={v => this.setState({ outStandard: v })}
                                onOk={v => this.setState({ outStandard: v })}
                                cols={1}
                                itemStyle={{ fontSize: '15px' }}
                                title="排放标准"
                            >
                                <ListItem className='list-item' arrow="horizontal">排放标准</ListItem>
                            </Picker>
                        }
                        <hr />
                        <InputItem clear placeholder="必填 " type='date' onChange={v => this.setState({ cardTime: v })}>上牌日期</InputItem>
                        {this.props.location.state.pid != 2 && <hr />}
                        {
                            this.props.location.state.pid != 2 &&

                            <Picker className="forss"
                                data={this.state.areas}
                                extra={this.state.address}
                                onOk={this.getAreasName.bind(this, "address")}
                                onDismiss={e => console.log('dismiss', e)}
                                itemStyle={{ fontSize: '15px' }}
                                title="车辆所在地"
                            >
                                <ListItem className='list-item' arrow="horizontal">车辆所在地</ListItem>
                            </Picker>
                        }
                        {this.props.location.state.pid != 2 && <hr />}
                        {
                            this.props.location.state.pid != 2 &&

                            <Picker className="forss"
                                data={this.state.areas}
                                extra={this.state.regionText}
                                onOk={this.getAreasName.bind(this, "regionText")}
                                onDismiss={e => console.log('dismiss', e)}
                                itemStyle={{ fontSize: '15px' }}
                                title="车辆归属地"
                            >
                                <ListItem className='list-item' arrow="horizontal">车辆归属地</ListItem>
                            </Picker>
                        }
                        <hr/>
                        <InputItem clear placeholder="必填 " extra='万元' onChange={v => this.setState({ price: v })}>车辆报价</InputItem>
                        <hr/>
                        <ListItem>
                            <span className='sell-kgh'>是否可过户</span>
                            <input type="radio" value="1" checked={this.state.kgh==1} onChange={this.handleGuohu} />可过户
                            <input type="radio" value="0" className='sell-radio' checked={this.state.kgh==0} onChange={this.handleGuohu} />不可过户
                        </ListItem>
                        
                    </List>                   
                    <div className="sell-item sell-remake">
                        <List className="picker-list">
                            <TextareaItem
                                placeholder="请描述一下车辆情况"
                                data-seed="logId"
                                rows={4}
                                count={100}
                                ref={el => this.autoFocusInst = el}
                                autoHeight
                                onChange={v => this.setState({ remark: v })}
                            />
                        </List>
                    </div>

                    <div className="sell-buttom">
                        <button className="sell-sub" onClick={this.subSellInfo}>提交卖车</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default SellCarInfo;