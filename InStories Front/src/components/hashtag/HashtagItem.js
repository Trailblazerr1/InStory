import React, { Component } from 'react';
import styles from './hashtags.module.styl'
import { observer } from 'mobx-react'

@observer
class HashtagItem extends Component {
    render() {
        return (
            <div onClick={() => this.props.hashtag.addHashtagLayer()} className={this.props.hashtag.active? styles.active : styles.hashtag}>#{this.props.hashtag.name}</div>
        );
    }
}

export default HashtagItem;