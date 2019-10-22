import React from 'react';
import './assets/css/App.css';
import { HashRouter as Router, Route, Link } from "react-router-dom";

import AppRouter from './model/router';




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div>
            {/* <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/findCar">FindCar</Link>
              </li>
              <li>
                <Link to="/submit">Submit</Link>
              </li> 
              <li>
                <Link to="/ImageUpload">ImageUpload</Link>
              </li>   
              <li>
                <Link to="/ant">ant</Link>
              </li>            
            </ul>

            <hr /> */}
        
            {
              AppRouter.map((route,key) => {
                if(route.exact) {
                  // 严格模式返回
                  return(
                      <Route exact key={key} path={route.path} render={props => (
                                 //主要是为了传递嵌套路由到子组件
                                 //类似于 <User {...props} routes={route.routes} />
                                 <route.component {...props} routes={route.routes} />
                             )}
                      />
                  )
                }else {
                  return(
                      <Route key={key} path={route.path} render={props => (
                              //主要是为了传递嵌套路由到子组件
                              //类似于 <User {...props} routes={route.routes} />
                              <route.component {...props} routes={route.routes} />
                          )}
                      />
                  )
                }
              })
            }
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
