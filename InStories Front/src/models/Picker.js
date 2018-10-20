import { observable, action } from 'mobx';
import { guidGenerator } from './Slider';

export class BackgroundImage {

    id

    @observable
    src

    @observable
    previewUrl

    @observable.struct
    position = {
        top: 0,
        left: 0
    }

    @observable.struct
    dimension = {
        width: 0,
        height: 0
    }

    @observable
    active = false

    layer = null

    constructor(src, previewUrl, position, dimension, store) {
        this.store = store
        this.src = src
        this.position = position
        this.dimension = dimension
        this.previewUrl = previewUrl
        this.id = guidGenerator()
    }

    @action.bound
    unapplyBackground() {
        this.active = false
        this.layer.delete()
    }

    @action.bound
    applyBackground() {
        if (this.active) {
            this.unapplyBackground()
            return
        }

        let layer = this.store.activeSlider.applyBackgroundLayer({src: this.src, dimension: this.dimension, position: this.position})
        this.layer = layer
        this.active = true
    }
}

export class Hashtag {

    @observable
    name

    store = null

    @observable
    active = false

    layer = null

    constructor(name, store) {
        this.name = name
        this.store = store
    }

    @action.bound
    removeHashtagLayer() {
        this.layer.delete()
        this.active = false
    }

    @action.bound
    addHashtagLayer() {
        if (this.active) {
            this.removeHashtagLayer()
            return
        }

        let layerData = {
            type: 'text',
            position: {
                top: 175,
                left: 0
            },
            text: `#${this.name}`,
            fontSize: 18
        }

        let layer = this.store.activeSlider.addLayer(layerData)
        this.active = true
        this.layer = layer
    }
}