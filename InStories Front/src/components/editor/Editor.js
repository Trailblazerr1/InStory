import { observer, inject } from 'mobx-react'
import React, { Component } from 'react';
import SliderLayer from './SliderLayer';
import TextEdit from './TextEdit';
import ColorLayer from './ColorLayer';
import ZIndexLayer from './ZIndexLayer';
import styles from './editor.module.styl'

@observer
class Editor extends Component {
    render() {
        let activeLayer = this.props.activeLayer

        if (!activeLayer) {
            return null
        }

        let elements = activeLayer.EDIT_FIELDS.map((item) => {
            if (item === 'text') {
                return <TextEdit changeText={activeLayer.changeText} text={activeLayer.text} key={activeLayer.text + 'text'}/>
            } else if (item === 'fontSize') {
                return <SliderLayer value={activeLayer.fontSize} changeValue={activeLayer.changeFontSize} min={10} max={100} key={activeLayer.text + 'fontSize'} label={'Text Size'} layer={activeLayer} />
            } else if (item === 'textColor') {
                return <ColorLayer key={activeLayer.text + 'textColor'} changeColor={activeLayer.changeColor} label={'Text Color'} layer={activeLayer} />
            } else if (item === 'scale') {
                return <SliderLayer value={activeLayer.scale} changeValue={activeLayer.changeImageScale} min={0} max={200} key={activeLayer.id + 'scale'} label={'Image Scale'} layer={activeLayer} />
            } else {
                return null
            }
        })

        return (
            <div id="test" className='container'>
                {elements}
            </div>
        );
    }
}

export default Editor;