import httpService from '../../axios/httpService'
import { action, runInAction } from 'mobx'

export default class CurrentChannelAction {

    constructor(store) {
        this.store = store;
    }

    //获取轮播图列表
    @action getCarousels = (...params) => {
        httpService.getPlateList(...params).then((res) => {
            runInAction(() => {
                this.store.carousels = res.plateList[0].list;
            })
        })
    }

    //获取滚钱宝
    @action getGqbYield = () => {
        httpService.getFundDetail({'productId': '600001'}).then((res) => {
            runInAction(() => {
                this.store.gqbDetail = res;
            })
        })
    }

    //获取货币组合列表
    @action getStrategyList = (...params) => {
        httpService.getStrategyList(...params).then((res) => {
            runInAction(() => {
                res.strategyList.forEach((item) => {
                    this.store.combList = this.store.combList.concat(item.list);
                })
            })
        })
    }

    //获取货币基金
    @action getProductList = (...params) => {
        httpService.getProductList(...params).then((res) => {
            runInAction(() => {
                this.store.currentList = res.productList;
                this.store.currentType = params[0].productSort;
            })
        })
    }

    //获取滚钱宝加送收益
    @action getNovicePrize = (...params) => {
        httpService.getNovicePrize(...params).then((res) => {
            runInAction(() => {
                res.prizeInfoList.forEach((item) => {
                    if (item.prizeType === '04') {
                        this.store.noviceList.push(item);
                    }
                })
            })
        })
    }
}
