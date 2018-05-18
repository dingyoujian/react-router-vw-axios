import React, { Component } from 'react'
import {observer, inject} from "mobx-react"
import CONSTANT from '../../common/constant'
import CurrentChannelStore from './store'
import CurrentChannelAction from './action'
import Swipes from '../../components/swipes/swipes'
import Header from '../../components/header/header'
import GqbContainer from '../../containers/gqbContainer/gqbContainer'
import RevenueRankContainer from '../../containers/revenueRankContainer/revenueRankContainer'
import CurrencyCombContainer from '../../containers/currencyCombContainer/currencyCombContainer'
import './index.css'
const store = new CurrentChannelStore();
const action = new CurrentChannelAction(store);

@inject("commonStore")
@observer
class CurrentChannel extends Component {

    componentDidMount() {
        action.getCarousels({'tabSite': CONSTANT.TAB_SITE.CURRENTCHANNEL});//获取活期频道轮播图列表
    }

    render() {
        return (
            <div className="channel">
                <Header title="活期优选" client={this.props.commonStore.client}></Header>
                <Swipes swipes={store.carousels}></Swipes>
                <GqbContainer action={action} store={store}></GqbContainer>
                <RevenueRankContainer action={action} store={store}></RevenueRankContainer>
                <CurrencyCombContainer action={action} store={store}></CurrencyCombContainer>
            </div>
        )
    }
}

export default CurrentChannel;
