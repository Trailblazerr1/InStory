import React, { Component } from 'react';
import Slider, { Range } from 'rc-slider';
import styles from './editor.module.styl'
import 'rc-slider/assets/index.css';

class SliderLayer extends Component {
    render() {
        return (
            <div className={styles.fieldContainer}>
                <h3>{this.props.label}</h3>
                <div className={`field-content ${styles.slider}`}>
                    <Slider value={this.props.value} onChange={(val) => this.props.changeValue(val)} min={this.props.min} max={this.props.max} />
                </div>
            </div>
        );
    }
}

export default SliderLayer;