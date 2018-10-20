import React, { Component } from 'react';
import styles from './nav.module.styl'
import logo from '../../assets/logo.svg';
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class Nav extends Component {
    render() {
        let text = 'Publish Story'

        if (!this.props.store.startedEditing) {
            text = 'username'
        }

        return (
            <nav className={styles.nav}>
                <div className={styles.content}>
                    <img src={logo} alt="" />
                    <div onClick={() => this.props.store.creatorStore.publish()} className={styles.button}>{this.props.store.creatorStore.publishLoading ? <div className={styles.loader}> </div> : text}</div>
                </div>
            </nav>
        );
    }
}

export default Nav;