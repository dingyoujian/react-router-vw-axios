import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import asyncComponent from './AsyncComponent'
import { Provider } from "mobx-react"
import CommonStore from './store'
import CommonAction from './action'

//异步加载currentchannel组件
const CurrentChannel = asyncComponent(() => import("./currentchannel/index"))
const store = new CommonStore();
const action = new CommonAction(store);

const App = () => (
    <div>
        <Provider commonStore={store} commonAction={action}>
            <Router>
                <div>
                    <Route exact path="/home" component={Home}/>
                    <Route path="/currentchannel" component={CurrentChannel}/>
                </div>
            </Router>
        </Provider>
    </div>
)

const Home = () => (
    <div className="home">
        <Link to="/currentchannel">跳转</Link>
    </div>
)

export default App
