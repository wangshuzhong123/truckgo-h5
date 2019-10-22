import React,{Component} from 'react';
import {Grid} from 'antd-mobile';
import qy from '../assets/images/sorts/qy.png';
import fb from '../assets/images/sorts/fb.png';
import gc from '../assets/images/sorts/gc.png';
import gua from '../assets/images/sorts/gua.png';
import huo from '../assets/images/sorts/huo.png';
import pi from '../assets/images/sorts/pi.png';
import wei from '../assets/images/sorts/wei.png';
import xie from '../assets/images/sorts/xie.png';
import zy from '../assets/images/sorts/zy.png'

class SelectCarSort extends Component{
    constructor(props){
        super(props);
        console.log(props.location.state);

        this.state={
            data:[
                {
                    img:qy,
                    text:'牵引车',
                    value:1
                },
                {
                    img:gua,
                    text:'挂车',
                    value:2
                },
                {
                    img:huo,
                    text:'载货车',
                    value:3
                },
                {
                    img:xie,
                    text:'自卸车',
                    value:4
                },
                {
                    img:pi,
                    text:'皮卡',
                    value:6
                },
                {
                    img:wei,
                    text:'微面',
                    value:7
                },
                {
                    img:fb,
                    text:'封闭货车',
                    value:8
                },
                {
                    img:gc,
                    text:'工程车',
                    value:9
                },    
                {
                    img:zy,
                    text:'专用车',
                    value:10
                }           
            ]
        }
    }

    componentDidMount(){
        console.log("data:",this.state.data);
        
    }

    clickSort=(value,text)=>{
        if(this.props.location.state.page=='FindCar'){
            console.log('来自找车')
            this.props.history.push({ pathname: '/FindCarInfo', state: { 'pid': value,'sortList':this.state.data } })
            //this.props.history.push({ pathname: '/FindCarInfo'})
        }
        if(this.props.location.state.page=='CarManage'){
            console.log('来自卖车')
            this.props.history.push({ pathname: '/SellCarInfo', state: { 'pid': value,'sortName':text} })
        }        
    }

    render(){
        return(
            <div className='select' style={{padding:'10px'}}>
                <h2>选择车型</h2>                
                <Grid data={this.state.data}
                    columnNum={3}
                    renderItem={dataItem => (
                        <div className='carbox' square='false' onClick={this.clickSort.bind(this,dataItem.value,dataItem.text)}> 
                            <div>
                                <img src={dataItem.img} style={{ width: '70%', height: '70%' }} alt={dataItem.text} />     
                                <div style={{ color: '#888', fontSize: 'calc(7px + 2vmin)', marginTop: '12px' }}>
                                    <span>{dataItem.text}</span>
                                </div>
                            </div>                                                      
                        </div>
                    )}
                />
            </div>            
        )
    }
}

export default SelectCarSort;