import React, { Component } from 'react';
import styles from './editor.module.styl'

class ColorLayer extends Component {
    render() {
        let colorsRaw = ['#fff', '#000000', '#3897f1', '#fdcb5c', '#ed4a57', '#d00769', '#a306bb','#e1e8f0', '#3a4660',  '#c9af98','#ed8a63','#845007','#feda6a', '#d4d4dc']
        let colors2 = ['#313d4b','#b11a21' ,'#CAE4DB','#DCAE1D' ,' #00303F' , '#393939','#be4f0c','#4ABDAC','#FC4A1A' ,'#DFDCE3','#3d3d3f','#005995','#91684a','#00c07f']
        let colors = colorsRaw.map((item) => {
            return (
                <div onClick={() => this.props.changeColor(item)} key={item} style={{background: item}} className={styles.color}></div>
            )
        })
        let colors11 = colors2.map((item) => {
            return (
                <div onClick={() => this.props.changeColor(item)} key={item} style={{background: item}} className={styles.color}></div>
            )
        })

        return (
            <div className={styles.fieldContainer}>
                <h3>{this.props.label}</h3>
                <div className={`field-content ${styles.colorContent}`}>
                    {colors}
                </div>
                <div className={`field-content ${styles.colorContent}`}>
                    {colors11}
                </div>
            </div>
        );
    }
}

export default ColorLayer;