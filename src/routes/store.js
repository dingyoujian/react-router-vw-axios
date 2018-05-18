// 总store容器需继承
import { configure, observable } from 'mobx'
import { getClient } from '../common/common'

configure({ enforceActions: true });

export default class CommonStore {
    @observable client = getClient()
}
