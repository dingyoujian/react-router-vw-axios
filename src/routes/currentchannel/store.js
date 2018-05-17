// 子store
import { observable } from 'mobx'
import { CommonStore } from '../store'
import {getClient} from '../../common/common'

export default class CurrentChannelStore extends CommonStore{
    @observable carousels = [] //轮播图列表
    @observable currentList = [] //货币基金列表
    @observable currentType = 'yield'//默认选中
    @observable gqbDetail = {}//滚钱宝详情
    @observable noviceList = []//加息券
    @observable combList = []//货币组合列表
    @observable client = getClient()
}
