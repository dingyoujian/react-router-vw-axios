import CommonStore from './store'
import CommonAction from './action'
import CurrentChannelStore from './currentchannel/store'
import CurrentChannelAction from './currentchannel/action'

// 公共store
const commonStore = new CommonStore();
const commonAction = new CommonAction(commonStore);
// 活期频道store
const currentChannelStore = new CurrentChannelStore();
const currentChannelAction = new CurrentChannelAction(currentChannelStore);

const stores = {
    commonStore,
    currentChannelStore,
    commonAction,
    currentChannelAction
}
export default stores
