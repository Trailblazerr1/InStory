import { observable, action, computed } from 'mobx';

export default class Slider {
    @observable
    layers = []

    @observable
    gradient = ''
    
    store;

    constructor(store) {
        this.store = store
    }

    @action.bound
    applyBackgroundLayer(data) {
        let len = this.layers.length
        let layer = new ImageLayer('img', data.position, 0, this.store, data.src, data.dimension, true)
        this.layers.push(layer)
        return layer
    }

    @action.bound
    updateBackground(colors) {
        this.gradient = `linear-gradient(to bottom, ${colors[0]} 0%, ${colors[1]} 100%)`
    }

    @action.bound
    addLayer(data) {
        let len = this.layers.length
        let layer;

        if (data.type === 'text') {
            layer = new TextLayer('text', data.position, len + 1, this.store, data.text)
        } else {
            layer = new ImageLayer('img', data.position, len + 1, this.store, data.src, data.dimension)
        }
        this.layers.push(layer)
        return layer
    }
}

class Layer {

    @observable
    selected = false

    @observable
    type

    @observable
    index

    id;
    store;

    @observable.struct
    position = {
        top: 0,
        left: 0
    }

    @observable.struct
    initalPosition = {
        top: 0,
        left: 0
    }

    constructor(type, position, index, store) {
        this.type = type
        this.initalPosition = Object.assign({}, position)
        this.initalPosition.left = this.initalPosition.left * -1
        this.index = index
        this.id = guidGenerator()
        this.store = store
    }

    @action.bound
    changePosition(top, left) {
        this.position.top = top
        this.position.left = left
    }

    @action.bound
    selectLayer() {
        this.selected = true
    }

    @action.bound
    unselectLayer() {
        this.selected = false
    }

    @action.bound
    zIndexDown() {
        this.index--
    }

    @action.bound
    zIndexUp() {
        this.index++
    }

    @action.bound
    delete() {
        this.store.deleteLayer(this)
    }
}

class TextLayer extends Layer {
    @observable
    text

    @observable
    fontSize

    @observable
    color

    EDIT_FIELDS = ['text', 'fontSize', 'textColor', 'textBackground', 'zIndex']

    constructor(type, position, index, store, text, fontSize=32) {
        super(type, position, index, store)
        this.text = text
        this.fontSize = fontSize
        this.color = '#fff'
    }

    @action.bound
    changeText(text) {
        this.text = text
    }

    @action.bound
    changeFontSize(size) {
        this.fontSize = size
    }

    @action.bound
    changeColor(color) {
        this.color = color
    }
}

class ImageLayer extends Layer {
    @observable
    src

    @observable
    isBackground = false

    @observable.struct
    initialDimension = {
        width: 0,
        height: 0
    }

    @observable
    scale

    EDIT_FIELDS = ['scale', 'zIndex']

    constructor(type, position, index, store, src, dimension, isBackground=false) {
        super(type, position, index, store)
        this.src = src
        this.initialDimension = Object.assign({}, dimension)
        this.isBackground = isBackground

        let height = this.initialDimension.height
        this.scale = (667 / height) * 100

    }

    @computed
    get width() {
        return this.initialDimension.width * (this.scale / 100)
    }

    @computed
    get height() {
        return this.initialDimension.height * (this.scale / 100)
    }

    @action.bound
    changeDimension(width, height) {
        this.width = width,
        this.height = height
    }

    @action.bound
    changeImageScale(scale) {
        this.scale = scale
    }
}

export function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}