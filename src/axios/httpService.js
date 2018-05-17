import instance from './instance'

const httpService = {
    getUserInfo(...params) {
        return instance.post('/v1/user/getUserInfo', ...params);
    },
    //获取板块配置
    getPlateList(...params) {
        return instance.post('/v1/plate/queryPlateList', ...params);
    },
    //获取基金详情
    getFundDetail(...params) {
        return instance.post('/v2/product/detail', ...params);
    },
    //获取滚钱宝加送收益
    getNovicePrize(...params) {
        return instance.post('/v1/marketing/queryNovicePrizeList', ...params);
    },
    //获取货币组合
    getStrategyList(...params) {
        return instance.post('/v1/fof/queryStrategyList', ...params);
    },
    //获取货币基金列表
    getProductList(...params) {
        return instance.post('/v1/product/queryProductList', ...params);
    },
    //获取滚钱宝七日年化
    getGqbYield(...params) {
        return instance.post('/v1/merchant/virtual/yield', ...params);
    },
    getWxShare() {
        return instance.get('/v1/wxconfig?url=' + encodeURIComponent(window.location.href.split('#')[0]));
    }
}

export default httpService
