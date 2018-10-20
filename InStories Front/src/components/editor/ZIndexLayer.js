
import React, { Component } from 'react';
import styles from './editor.module.styl'
import arrowUp from '../../assets/arrow_up.svg'
import arrowDown from '../../assets/arrow_down.svg'


class ZIndexLayer extends Component {
    render() {
        return (
            <div className={styles.fieldContainer}>
                <h3>{this.props.label}</h3>
                <div className={`field-content ${styles.zIndex}`}>
                    <img onClick={() => this.props.up()} src={arrowUp} alt=""/>
                    <img onClick={() => this.props.down()} src={arrowDown} alt=""/>
                </div>
            </div>
        );
    }
}

export default ZIndexLayer;