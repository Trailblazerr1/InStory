import React, { Component } from 'react';
import styles from './url.module.styl';
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class Url extends Component {
	render() {
		return (
			<div className={`container ${styles.urlContainer}`}>
				<div className={styles.left}>
					<h1>Create Insta <span>Stories</span> From an Article in Matter of Seconds.</h1>
					<p>Paste URL of your article</p>

					<div className={styles.underHeadline}>
						<input onChange={(e) => this.props.store.urlStore.url = e.target.value} type="text" placeholder="https://saddaArticle.com/" />
						<div className={styles.buttonFirst} onClick={this.props.store.urlStore.submitUrl}>{this.props.store.urlStore.loading ? <div className={styles.loader}></div> : 'Create a story'}</div>
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.imgStories}></div>
					<div className={styles.imgBg}></div>
				</div>
			</div >
		);
	}
}

export default Url;