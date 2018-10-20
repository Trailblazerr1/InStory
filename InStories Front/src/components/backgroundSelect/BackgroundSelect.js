import React, { Component } from 'react';
import styles from './background.module.styl'
import { observer, inject } from 'mobx-react'
import BackgroundSelectItem from './BackgroundSelectItem';

@inject('store')
@observer
class BackgroundSelect extends Component {
    render() {
        let images = this.props.store.creatorStore.backgroundImages.map((item) => {
            return <BackgroundSelectItem key={item.src} image={item} />
        })

        return (
            <div>
                <h3>Select Image</h3>
                <div className={styles.container}>
                    {images}
                    <div className={styles.gradient}></div>
                </div>
            </div>

        );
    }
}

export default BackgroundSelect;