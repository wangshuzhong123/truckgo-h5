import Home from '../components/Home'                           //首页
import FindCar from '../components/FindCar'                     //找车
import CarManage from '../components/CarManage'                 //车辆管理
import CarDetails from "../components/CarDetails"               //车辆详情
import SelectCarSort from "../components/SelectCarSort"         //选择车辆类型
import Submit from "../components/Submit"                       //提交成功
import ProductList from "../components/ProductList"             //产品列表
import FindCarInfo from "../components/FindCarInfo"             //找车信息
import SellCarInfo from "../components/SellCarInfo"             //卖车信息
import ImageUpload from "../components/ImageUpload"             //图片上传组件
import Error from "../components/Error"                         //验证失败


 
let AppRouter = [
    {
        path:'/',// 首页默认加载的页面
        component:Home,// 所使用的组件
        exact: true //是否为严格模式
    },
    {
        path:'/FindCar',
        component:FindCar        
    },
    {
        path:'/CarManage',
        component:CarManage       
    },
    {
        path:'/SelectCarSort',
        component:SelectCarSort        
    },
    {
        path:'/Submit',
        component:Submit        
    },
    {
        path:'/ProductList',
        component:ProductList       
    },
    {
        path:'/CarDetails',
        component:CarDetails
    },
    {
        path:'/FindCarInfo',
        component:FindCarInfo
    },
    {
        path:'/SellCarInfo',                
        component:SellCarInfo
    },    
    {
        path:'/ImageUpload',                
        component:ImageUpload
    },    
    {
        path:'/Error',                
        component:Error
    }
    
]
export default AppRouter;