// 总store容器需继承
import { configure, observable } from 'mobx'

configure({ enforceActions: true });

export class CommonStore {
    //正在测试继承可不可以在不同store之间交互
    //不使用React.context上下文，如果未来react在最新稳定版中确定则需要重新组织store
    get(id) {
        return this[id];
    }
    set(id, data) {
        return this[id] = data;
    }
    @observable common = {
        userName: 'dingyoujian'
    } //公共store
}
