import React, { Component } from 'react'
import {observer} from "mobx-react"
import './revenueRankContainer.css'
import CONSTANT from '../../common/constant'
import ProductHeader from '../../components/product/productHeader'
import ListHeader from '../../components/list/listHeader'
import ProductTypeTwo from '../../components/product/productTypeTwo'
import {h5Jump, androidNativeJump, iosNativeJump} from '../../common/common'

@observer
class RevenueRankContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: [
                {
                    title: '七日年化',
                    type: 'yield',
                    showType: 'yield'
                },
                {
                    title: '万份收益',
                    type: 'profit_unit',
                    showType: 'profitUnit',
                },
                {
                    title: '近一月',
                    type: 'latest_month_rate',
                    showType: 'latestMonthRate',
                },
                {
                    title: '近三月',
                    type: 'quarter_rate',
                    showType: 'latestQuarterRate',
                },
                {
                    title: '近六月',
                    type: 'half_year_rate',
                    showType: 'latestHalfYearRate',
                },
                {
                    title: '近一年',
                    type: 'latest_year_rate',
                    showType: 'latestYearRate',
                }
            ]
        }
    }
    //切换头部对应调取接口
    typeChange = (type) => {
        this.getCurrentList(type);
    }

    componentDidMount() {
        this.getCurrentList(this.props.store.currentType);
    }

    //获取货币基金列表
    getCurrentList(type) {
        this.props.action.getProductList({
            'productSort': type,
            'productSortsType': 'desc',
            'productTag': CONSTANT.PRODUCT_TAG.CURRENCY,//货币基金
            'aipFundList': false,
            'needRedemptionRate': false
        });//获取货币基金
    }

    //格式化 选择原因
    covertChoiceDesc(desc) {
        if (desc) {
            return desc.replace(/，/g, ' | ')
        }
        return '';
    }

    handleProductClick = (productId) => {
        if (this.props.store.client === 'h5') {
            h5Jump('/www/index.html#/fund/' + productId);
        } else if (this.props.store.client === 'android') {
            androidNativeJump('product', 'FundProductDetaicActivity', productId);
        } else if (this.props.store.client === 'ios') {
            iosNativeJump('product', 'QGGProductDetailViewController', productId);
        }
    }

    handleMore = () => {
        if (this.props.store.client === 'h5') {
            h5Jump('/www/index.html#/investment/allFund?fundType=0210');
        } else if (this.props.store.client === 'android') {
            androidNativeJump('allFund', 'com.qiangungun.ui.fund.all.AllFundsActivity', {allFundControllType: '1', productTag: '0210'});
        } else if (this.props.store.client === 'ios') {
            iosNativeJump('allFund', 'QGGAllFundViewController', {allFundControllType: '1', productTag: '0210'});
        }

    }

    render() {
        const currentList = this.props.store.currentList;
        const titles = this.state.titles.filter((item) => {
            return item.type === this.props.store.currentType;
        })[0];
        const desc = titles.title;
        const showType = titles.showType;

        return (
            <div className="revenueRankContainer">
                <ProductHeader title={"货基收益榜"} subTitle={"多维度表现排行"} more={this.handleMore}></ProductHeader>
                <ListHeader titles={this.state.titles} currentType={this.props.store.currentType} onTypeChange={this.typeChange}></ListHeader>
                {
                    currentList.map((item, index) => {
                        if (index < 2) {
                            return <div className="revenueRankList" key={index} onClick={(e) => {this.handleProductClick(item.productId)}}>
                                <div className="rRL_left">
                                    {
                                        index === 0 && <img alt="top" className="rRL_top" src={require("../../img/topOne-2x.png")} />
                                    }
                                    {
                                        index === 1 && <img alt="top" className="rRL_top" src={require("../../img/topTwo-2x.png")} />
                                    }
                                </div>
                                <div className="rRL_right">
                                    <ProductTypeTwo title={item.productName} rate={item[showType]} desc={desc} remark={this.covertChoiceDesc(item.choiceDesc)}></ProductTypeTwo>
                                </div>
                            </div>
                        } else {
                            return '';
                        }
                    })
                }
            </div>
        )
    }
}

export default RevenueRankContainer;
