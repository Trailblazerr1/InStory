import { observable } from 'mobx';
import UrlStore from './UrlStore'
import CreatorStore from './CreatorStore'
import { RouterStore } from 'mobx-react-router'

export default class RootStore {
    @observable
    startedEditing = false

    urlStore = new UrlStore(this)
    routingStore = new RouterStore();
    creatorStore = new CreatorStore();
}