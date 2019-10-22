import React,{Component} from 'react';
import { Flex, Button } from 'antd-mobile';
import bg from '../assets/images/findcar-bg.png'
import location from '../assets/images/location.png'
//import axios from 'axios';

class FindCar extends Component{
    constructor(props){
        super(props);        

        this.state={
            dataList:[
                {
                    ProductSort:"牵引车",
                    Created:"2019/09/30",
                    Region:"深圳",
                    Standard:"国四",
                    BuildYear:"2015",
                    DriveType:"四驱",
                    CarPower:"500",
                    Budget:"13万",
                },
                {
                    ProductSort:"载货车",
                    Created:"2018/09/30",
                    Region:"高安",
                    Standard:"国四",
                    BuildYear:"2015",
                    DriveType:"四驱",
                    CarPower:"600",
                    Budget:"13万",
                },
                {
                    ProductSort:"专用车",
                    Created:"2019/09/30",
                    Region:"深圳",
                    Standard:"国四",
                    BuildYear:"2015",
                    DriveType:"四驱",
                    CarPower:"500",
                    Budget:"13万",
                }
            ]
        }
    }

    goRouter(url,page) {
        console.log(url,page);
        this.props.history.push({pathname:url,state:{'page':page}})
    }

    render(){
        return(
            <div className='find-mainer'>
                <Flex>                                
                    <div className='find-header' style={{backgroundImage:`url(${bg})`}}>                    
                        <div className='header-buttom'>
                            <p className='header-text'>海量车源，尽在卡车易购</p>
                            <Button className='btn' style={{color:'#1A69FF'}} onClick={this.goRouter.bind(this,'/SelectCarSort','FindCar')}>帮我找车</Button>
                        </div>
                    </div>
                </Flex>            
            
                <Flex style={{margin:'10px'}}>
                    <p className='findcar-title'>找车记录</p>
                    <hr className='hr'/>                    
                </Flex>

                <Flex style={{margin:'15px'}} direction='column'>
                    {
                        this.state.dataList.map((item,key)=>{
                           return(
                                <div className="notes" key={key}>
                                    <div className="notes-left">
                                        <span>{item.ProductSort}</span>
                                    </div>
                                    <div className="notes-right">
                                        <span className="datetime">{item.Created}</span>
                                        <span className="location"><img src={location} alt=''/>{item.Region}</span>
                                        <span className="infos">{item.Standard}/{item.BuildYear}/{item.DriveType}/{item.CarPower}马力</span>
                                        <span className="budget">{item.Budget}</span>
                                    </div>
                                </div>
                           )
                        })
                    }                  
                </Flex>
            </div>
        )
    }
}

export default FindCar;