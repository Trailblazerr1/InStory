import React, { Component } from 'react';
import styles from './hashtags.module.styl'
import HashtagItem from './HashtagItem'
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class Hashtags extends Component {
    render() {
        let hashtags = this.props.store.creatorStore.hashtags.map((item) => {
            return <HashtagItem key={item.name} hashtag={item} />
        })

        return (
            <div>
                <h3>keywords:</h3>
                <div className={styles.hashtags}>
                    {hashtags}
                </div>
            </div>
        );
    }
}

export default Hashtags;