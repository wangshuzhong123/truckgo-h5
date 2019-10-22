import React,{Component} from 'react';
import success from '../assets/images/sub-success.png';
import { Flex, Button } from 'antd-mobile';

class Submit extends Component{
    constructor(props){
        super(props);

        this.state={
            time:5
        }
    }

    timer=(num)=>{
        setInterval(()=>{
            num--;
            if(num===0){
                this.props.history.push({pathname:'/',state:{'path':'Submit'}})
                return;
            }else{
                this.setState({
                    time:num
                })
            }            
        },1000)
    }

    componentDidMount=()=>{
        let num = this.state.time;      
        this.timer(num);
    }

    render(){
        return(
            <div className='result-s'>
                <img src={success} alt=''></img>
                <p className='info'>提交成功</p>
                <p className='remind'>客服会第一时间与您取得联系</p>
                <p className='gohome'>{this.state.time}s后回到首页</p>

                
                    <button className='btn' href="tel:400-6561-919">客服热线:400-656-1919</button>                    
                
            </div>
        )
    }
}

export default Submit;