import React, { Component } from 'react';
import Draggable from 'react-draggable';
import styles from './slider.module.styl'
import { observer, inject } from 'mobx-react';


@inject('store')
@observer
class Layer extends Component {

    constructor(props) {
        super(props)
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    dragEnd(e, data) {
        this.props.layer.changePosition(data.y, data.x)
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.props.layer.selected && (document.getElementById('test') && !document.getElementById('test').contains(event.target))) {
            this.props.layer.unselectLayer()
        }
    }

    render() {

        let content;

        if (this.props.layer.type === 'text') {
            let style = `${styles.layerText}`

            if (this.props.layer.selected) {
                style = `${styles.layerText} ${styles.selected}`
            }

            content = <p
                style={{ position: 'absolute', color: this.props.layer.color, left: this.props.layer.initalPosition.left, top: this.props.layer.initalPosition.top, fontSize: `${this.props.layer.fontSize}px`}}
                className={`${style} no-default-select`}>{this.props.layer.text}</p>
        } else if (this.props.layer.type === 'img') {
            content = <img
                        className='no-default-select'
                        style={{ position: 'absolute', left: this.props.layer.initalPosition.left, top: this.props.layer.initalPosition.top, objectFit: 'cover' , width: `${this.props.layer.width}px`, height: `${this.props.layer.height}px`}}
                        src={this.props.layer.src}></img>
        }

        
        return (
            <Draggable onStart={() => {this.props.layer.selectLayer()}} onStop={this.dragEnd.bind(this)}>
                <div style={{ position: 'relative', zIndex: this.props.layer.index }} ref={this.setWrapperRef}>
                    {content}
                </div>
            </Draggable>
        );
    }
}

export default Layer;