import React, { Component } from 'react';
import styles from './toolbar.module.styl'
import textLayerToolbar from '../../assets/textlayer-toolbar.svg'
import imageLayerToolbar from '../../assets/toolbar-img.svg'
//import locationLayerToolbar from '../../assets/toolbar-location.svg'
//import moreLayerToolbar from '../../assets/toolbar-more.svg'

import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class Toolbar extends Component {
    addTextLayer() {
        let layerData = {
            type: 'text',
            position: {
                top: 175,
                left: 0
            },
            text: 'text'
        }

        this.props.store.creatorStore.activeSlider.addLayer(layerData)
    }

    render() {
        return (
            <div className={styles.toolbar}>
                <div className={styles.icons}>
                    <div className={styles.icon}>
                        <img onClick={this.addTextLayer.bind(this)} src={textLayerToolbar} alt=""/>
                    </div>
                    <div className={styles.icon}>
                        <img src={imageLayerToolbar} alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Toolbar;