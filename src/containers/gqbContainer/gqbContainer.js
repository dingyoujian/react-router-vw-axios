import React, { Component } from 'react'
import {observer} from 'mobx-react';
import CONSTANT from '../../common/constant'
import {h5Jump, androidNativeJump, iosNativeJump} from '../../common/common'
import './gqbContainer.css'
import ProductHeader from '../../components/product/productHeader'
import GqbFooter from '../../components/product/gqbFooter'
import ProductThreeLayers from '../../components/product/productThreeLayers'
import ProductTypeOne from '../../components/product/productTypeOne'

@observer
class GqbContainer extends Component {

    componentDidMount() {
        this.props.action.getGqbAndNovice({'activityId': CONSTANT.ACTIVITY_ID.NOVICE});
    }

    covertNavDate(navDate) {
        let desc = '七日年化'
        if (navDate) {
            desc += " (" + navDate.substring(navDate.length-4, navDate.length-2) + "/" + navDate.substring(navDate.length-4, navDate.length-2) + ")";
        }
        return desc;
    }

    covertNoviceTitle(day) {
        let title = '';
        if (day) {
            title = '加送' + day + '天活动收益';
        }
        return title;
    }

    handleGqbClick = (e) => {
        if (this.props.store.client === 'h5') {
            h5Jump('/www/index.html#/fund/600001');
        } else if (this.props.store.client === 'android') {
            androidNativeJump('product', 'FundProductDetaicActivity', '600001');
        } else if (this.props.store.client === 'ios') {
            iosNativeJump('product', 'QGGNewGQBDetailViewController', '600001');
        }
    }

    render() {
        let novice = {};
        const { noviceList, gqbDetail } = this.props.store;
        if (noviceList.length) {
            novice = noviceList[0];
        }

        return (
            <div className="gqbContainer" onClick={this.handleGqbClick}>
                <ProductHeader icon={require('../../img/gqb-icon-2x.png')} title={"滚钱宝"} subTitle={"活期起步，实时到账"}></ProductHeader>
                {
                    noviceList.length > 0 &&
                    <React.Fragment>
                        <div className="gqb_welfare">
                            <ProductThreeLayers title={'中欧滚钱宝货币'} rate={gqbDetail.yield} desc={this.covertNavDate(gqbDetail.navDate)}></ProductThreeLayers>
                            <img alt="+" src={require("../../img/add-icon-2x.png")} />
                            <ProductThreeLayers title={this.covertNoviceTitle(novice.subsidyDay)} rate={novice.subsidyRate} desc={'*已领取过则不重复下发'}></ProductThreeLayers>
                        </div>
                        <GqbFooter></GqbFooter>
                    </React.Fragment>

                }
                {
                    noviceList.length === 0 &&
                    <React.Fragment>
                        <ProductTypeOne title={'中欧滚钱宝货币'} rate={gqbDetail.yield} desc={'七日年化'} remark={'0.01元起购 | T+0确认 | 随取随用'}></ProductTypeOne>
                    </React.Fragment>
                }

            </div>
        )
    }
}

export default GqbContainer;
