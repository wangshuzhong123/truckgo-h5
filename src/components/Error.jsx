import React,{Component} from 'react';

class Error extends Component{
    constructor(props){
        super(props);

        this.state={

        }
    }

    render(){
        return(
            <div className='error'>
                <div>验证失败</div>
            </div>
        )
    }
}

export default Error;