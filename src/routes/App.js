import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import asyncComponent from './AsyncComponent'

//异步加载currentchannel组件
const CurrentChannel = asyncComponent(() => import("./currentchannel/index"))

const App = () => (
    <div>
        <Router>
            <div>
                <Route exact path="/home" component={Home}/>
                <Route path="/currentchannel" component={CurrentChannel}/>
            </div>
        </Router>
    </div>
)

const Home = () => (
    <div className="home">
        <Link to="/currentchannel">跳转</Link>
    </div>
)

export default App
