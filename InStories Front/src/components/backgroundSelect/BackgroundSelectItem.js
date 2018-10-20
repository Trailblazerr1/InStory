import React, { Component } from 'react';
import styles from './background.module.styl'
import imgInactive from '../../assets/img-inactive.svg';
import imgActive from '../../assets/img-active.svg';
import { observer } from 'mobx-react';

@observer
class BackgroundSelectItem extends Component {
    render() {
        return (
            <div onClick={() => this.props.image.applyBackground()} className={styles.backgroundImage}>
                <img style={{objectFit: 'cover'}} src={this.props.image.previewUrl} width="145" height="236" alt=""/>
                <img width="22" className={styles.checkmark} src={this.props.image.active? imgActive : imgInactive} alt=""/>
            </div>
        );
    }
}

export default BackgroundSelectItem;