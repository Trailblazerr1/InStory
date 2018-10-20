import { observable, action, flow } from 'mobx';
import { fetchArticeData } from '../api.js'

export default class UrlStore {

    @observable
    url = null

    @observable
    loading = false

    rootStore;

    constructor(rootStore) {
        this.rootStore = rootStore
    }

    fetchArticle = flow(function * () {
        this.loading = true
        try {
            const data = yield fetchArticeData(this.url) // yield instead of await
            
            // the asynchronous blocks will automatically be wrapped actions and can modify state
            this.rootStore.creatorStore.fetchedArticles(data)
            console.log(data)
            this.loading = false
            this.rootStore.startedEditing = true
            this.rootStore.routingStore.history.push('/')
        } catch (error) {
            this.loading = false
        }
    })

    @action.bound
    submitUrl() {
        this.fetchArticle()
    }
}