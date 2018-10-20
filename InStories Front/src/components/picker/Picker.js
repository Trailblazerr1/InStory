import React, { Component } from 'react';
import BackgroundSelect from '../backgroundSelect/BackgroundSelect';
import Hashtags from '../hashtag/Hashtags'
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class Picker extends Component {
    render() {
        return (
            <div>
                <BackgroundSelect />
                <Hashtags />
            </div>
        );
    }
}

export default Picker;