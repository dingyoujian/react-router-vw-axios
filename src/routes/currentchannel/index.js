import React, { Component } from 'react'
import {observer, inject} from "mobx-react"
import CONSTANT from '../../common/constant'
import Swipes from '../../components/swipes/swipes'
import Header from '../../components/header/header'
import GqbContainer from '../../containers/gqbContainer/gqbContainer'
import RevenueRankContainer from '../../containers/revenueRankContainer/revenueRankContainer'
import CurrencyCombContainer from '../../containers/currencyCombContainer/currencyCombContainer'
import './index.css'

@inject("commonStore", "currentChannelStore", "currentChannelAction")
@observer
class CurrentChannel extends Component {

    componentDidMount() {
        this.props.currentChannelAction.getCarousels({'tabSite': CONSTANT.TAB_SITE.CURRENTCHANNEL});//获取活期频道轮播图列表
    }

    render() {
        return (
            <div className="channel">
                <Header title="活期优选" client={this.props.commonStore.client}></Header>
                <Swipes swipes={this.props.currentChannelStore.carousels}></Swipes>
                <GqbContainer action={this.props.currentChannelAction} store={this.props.currentChannelStore}></GqbContainer>
                <RevenueRankContainer action={this.props.currentChannelAction} store={this.props.currentChannelStore}></RevenueRankContainer>
                <CurrencyCombContainer action={this.props.currentChannelAction} store={this.props.currentChannelStore}></CurrencyCombContainer>
            </div>
        )
    }
}

export default CurrentChannel;
