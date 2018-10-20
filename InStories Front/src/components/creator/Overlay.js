import React, { Component } from 'react';
import styles from './creator.module.styl'
import circles from '../../assets/backup-circles-copy.svg'

class Overlay extends Component {
    render() {
        return (
            <div className={styles.overlay}>
                <div className={styles.overlayContent}>
                    <h4>Your story has been published. Binge on the fame now!</h4>
                    <div className={styles.button}>Let’s create another one!</div>
                    <img src={circles} alt=""/>
                </div>
            </div>
        );
    }
}

export default Overlay;