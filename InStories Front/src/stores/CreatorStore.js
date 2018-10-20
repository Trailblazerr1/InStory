import { observable, action, computed, flow } from 'mobx';
import Slider from '../models/Slider';
import { BackgroundImage, Hashtag } from '../models/Picker'
import { publishStory } from '../api'
import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';

export default class Creator {
    rootStore;

    @observable
    numberOfSliders = 4

    @observable
    sliders = []

    @observable
    activeSliderIndex = null

    @observable
    backgroundImages = []

    @observable
    activeBackgroundImage = null

    @observable
    hashtags = []

    @observable
    loading = false

    @observable
    publishLoading = false

    @observable
    showPublishOverlay = false

    @computed
    get showLayerEdit() {
        return this.activeLayer? true : false
    }

    @computed
    get activeLayer() {
        return this.activeSlider.layers.find((item) => item.selected)
    }

    @computed
    get activeSlider() {
        return this.sliders[this.activeSliderIndex - 1]
    }

    @action.bound
    addSlider() {
        this.sliders.push(new Slider(this))
        this.activeSliderIndex ? this.activeSliderIndex++ : this.activeSliderIndex = 1
    }

    @action.bound
    updateBackgroundImages(images) {
        let bgImage = images.map((item) => {
            return new BackgroundImage(item.url, item.thumbnail_url, {top: item.top, left: item.left}, {width: item.width, height: item.height}, this)
        })

        this.backgroundImages.replace(bgImage)
    }

    @action.bound
    updateHashtags(hashtagsJson) {
        let hashtags = hashtagsJson.map((item) => {
            return new Hashtag(item, this)
        })
    
        this.hashtags.replace(hashtags)
    }

    @action.bound
    updateArticleTitle(title) {
        let layerData = {
            type: 'text',
            position: {
                top: 400,
                left: 0
            },
            text: title
        }

        this.activeSlider.addLayer(layerData)
    }

    @action.bound
    fetchedArticles(data) {
        this.updateBackgroundImages(data.images)
        this.updateHashtags(data.keywords)
        this.updateArticleTitle(data.title)

        this.activeSlider.updateBackground(data.colors)
        this.backgroundImages[0].applyBackground()
    }

    @action.bound
    deleteLayer(layer) {
        this.activeSlider.layers.remove(layer)
    }

    publish = flow(function* () {
        this.publishLoading = true
        try {
            const blob = yield domtoimage.toBlob(document.getElementById('#slider'))
            const res = yield publishStory(blob)

            this.publishLoading = false
            this.showPublishOverlay = true
        } catch (error) {
            this.publishLoading = false
        }
    })

    constructor(rootStore) {
        this.rootStore = rootStore
        this.addSlider()
    }
}