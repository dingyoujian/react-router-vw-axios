// import httpService from '../axios/httpService'
import { getUserInfo } from '../common/common'
import { action, runInAction } from 'mobx'

export default class CommonAction {

    constructor(store) {
        this.store = store;
    }

    //获取滚钱宝加送收益
    @action getUserInfo = () => {
        this.store.userInfo = getUserInfo();
    }

}
