import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import { history } from '../../index';
import Picker from '../picker/Picker';
import Editor from '../editor/Editor';
import Slider from '../slider/Slider';
import styles from './creator.module.styl';
import Toolbar from '../toolbar/Toolbar';
import Overlay from './Overlay';
import { If, Then, Else } from 'react-if';

@inject('store')
@observer
class Creator extends Component {
    render() {
        let activeLayer = this.props.store.creatorStore.activeLayer

        let overlay = null;

        if (this.props.store.creatorStore.showPublishOverlay) {
            overlay = <Overlay />
        }

        return (
            <div>
                {overlay}
                <Toolbar />
                <div className={`container ${styles.creatorContainer}`}>
                    <div>
                        <h2 className={styles.headline}>Your story</h2>
                        <Slider activeSlider={this.props.store.creatorStore.activeSlider} />
                    </div>
                    <div>
                        <If condition={this.props.store.creatorStore.showLayerEdit}>
                            <Then>
                                <Editor activeLayer={activeLayer} />
                            </Then>
                            <Else>
                                <Picker />
                            </Else>
                        </If>
                    </div>
                </div>
            </div>

        );
    }
}

export default Creator;