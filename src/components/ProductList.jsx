import React, { Component } from 'react';
import nocar from '../assets/images/nocar.png';
//import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

//引入自定义模板

import appConfig from '../config-app.json';

class ProductList extends Component {

    constructor(props) {
        super(props);
        console.log("父组件传值：", props.list)                   
        
        this.state = {
            
        }
    }

    goProductDetail = (url,id) => {
        //this.props.history.push('/CarDetails')
        this.props.history.push({ pathname: url, state: { 'id': id } })
    }

    render() {
        let length=this.props.list.length-1;         

        if (this.props.list.length > 0) {                       
            return (
                <div className='products'>
                    {
                        this.props.list.map((item, index) => {
                            return (                                                                                               
                                <div key={index}>                                 
                                {console.log('index:',index)}  
                                {console.log('length:',length)}                                                                                            
                                    <div className='product' key={index}>                                    
                                        <div className='product-left'>
                                            <img src={appConfig.url + item.ThumbSrc} alt='' onClick={this.goProductDetail.bind(this,'/CarDetails',item.Id)} />
                                        </div>
                                        <div className='product-right'>
                                            <p className="title" onClick={this.goProductDetail.bind(this,'/CarDetails',item.Id)} >{item.Title}</p>
                                            <p className="other">{item.CreateYear}年|{item.Mileage}万公里|{item.RegionText}</p>
                                            <p className="price">{item.Price}万元</p>
                                        </div>
                                    </div>
                                    {console.log(`${length}==${index}?'none':'block'`)}
                                    <hr style={{display:`'${length}==${index}?'none':'block''`}}/>
                                </div>
                            )
                        })
                    }

                </div>
            )
        } else {
            return (
                <div className='products'>
                    <img className='no-iocn' src={nocar} alt='' />
                    <span className='no-text'>暂无车辆</span>
                </div>
            )
        }
    }
}

export default withRouter(ProductList);