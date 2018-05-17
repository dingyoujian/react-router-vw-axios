import React, { Component } from 'react'
import {observer} from "mobx-react"
import './currencyCombContainer.css'
import ProductHeader from '../../components/product/productHeader'
import ProductCurrencyComb from '../../components/product/productCurrencyComb'
import {h5Jump, androidNativeJump, iosNativeJump} from '../../common/common'

@observer
class CurrencyCombContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rate: {
                "lastMonthRate": "latestMonthRate",
                "lastThdMonthRate": "latestQuarterRate",
                "lastSixMonthRate": "latestHalfYearRate",
                "lastYearRate": "latestYearRate",
                "curYearRate": "currentYearRate",
                "lastThdYearRate": "latestThreeYearRate",
                "curHistoryRate": "historyYearRate",
                "maxYearRate": "maxYield",
                "minYearRate": "minYield",
                "maxRodThdMonthRate": "maxAnyQuarter",
                "minRodThdMonthRate": "minAnyQuarter",
                "totalRate": "totalRate",
                "sevenDayYearRate": "yield"
            },
            text: {
                'lastMonthRate': '最近一月',
                'lastThdMonthRate': '最近三月',
                'lastSixMonthRate': '最近六月',
                'lastYearRate': '最近一年',
                'curYearRate': '今年以来',
                'lastThdYearRate': '最近三年',
                'curHistoryRate': '历史年化',
                'maxYearRate': '最好年化',
                'minYearRate': '最差年化',
                'maxRodThdMonthRate': '最好三个月',
                'minRodThdMonthRate': '最坏三个月',
                'totalRate': '成立以来',
                'sevenDayYearRate': '七日年化'
            }
        }
    }

    componentDidMount() {
        this.props.action.getStrategyList({'fofRiskCode': '01'});//查询低风险组合
    }

    handleProductClick = (productId) => {
        if (this.props.store.client === 'h5') {
            h5Jump('/www/index.html#/fund/' + productId + '/weaveFunds');
        } else if (this.props.store.client === 'android') {
            androidNativeJump('comb', 'FundProductDetaicActivity', productId);
        } else if (this.props.store.client === 'ios') {
            iosNativeJump('comb', 'com.qiangungun.my.DingQiActivity', productId);
        }
    }

    render() {

        return (
            <div className="currencyCombContainer">
                <ProductHeader title={"货币组合"} subTitle={"全市场优选，轮动配置"}></ProductHeader>
                {
                    this.props.store.combList.map((product, index) => {
                        return <ProductCurrencyComb key={index} title={product.fofName}
                            rate={product[this.state.rate[product.rateIntervalName]]} handleClick={(e)=> {this.handleProductClick(product.fofId)}}
                            desc={this.state.text[product.rateIntervalName]} remark={product.recommendDesc} riskLevel={product.riskName} riskName={product.riskDesc}></ProductCurrencyComb>
                    })
                }
            </div>
        )
    }
}

export default CurrencyCombContainer;
