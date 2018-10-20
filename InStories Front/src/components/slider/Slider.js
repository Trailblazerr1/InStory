import React, { Component } from 'react';
import * as styles from './slider.module.styl'
import { observer, inject } from 'mobx-react'
import Layer from './Layer';

@inject('store')
@observer
class Slider extends Component {
    render() {

        let layers = this.props.activeSlider.layers.map((item) => {
            return <Layer key={item.id} layer={item} />
        })

        return (
            <div>  
                <div id="#slider" style={{ backgroundImage: this.props.activeSlider.gradient }} className={styles.slider}>
                    {layers}
                </div>
            </div>
        );
    }
}

export default Slider;