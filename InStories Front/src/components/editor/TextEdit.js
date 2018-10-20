import React, { Component } from 'react';
import styles from './editor.module.styl'

class TextEdit extends Component {
    constructor(props) {
        super(props)
        this.handleShit = this.handleShit.bind(this)
    }

    handleShit(e) {
        this.props.changeText(e.target.value)
    }

    render() {
        return (
            <div className={styles.fieldContainer}>
                <h3>Text</h3>
                <div className='field-content'>
                    <TextEditArea change={this.handleShit} data={this.props} />
                </div>
            </div>
        );
    }
}

class TextEditArea extends Component {
    render() {
        return (
            <textarea
                autoFocus
                value={this.props.data.text}
                onChange={(e) => this.props.change(e)} 
                onFocus={function(e) {
                    var val = e.target.value;
                    e.target.value = '';
                    e.target.value = val;
                }}
                className={styles.text}></textarea>
        );
    }
}



export default TextEdit;