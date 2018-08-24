import React, {Component} from 'react';
import FileUpload from "./../FileUpload";
import _ from 'lodash';
import {EMPTY_URL} from './../../consts'

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class PageData extends Component {
    constructor(props) {
        super(props);

        let stateImg = EMPTY_URL;
        let width = 130 * 4;
        let height = 105 * 4
        ;
        this.state = {
            zoom : 100.0,
            'title': '',
            'croppieUrl': stateImg,
            'imgData': stateImg,
            width,
            height
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.croppieUrl !== this.state.croppieUrl) {
            this.componentDidMount()
        }

        if(prevState.zoom !== this.state.zoom){
            this.refs.cropper.zoomTo(this.state.zoom/100.0);
        }
    }

    _crop() {
        const croppedCanvas = this.refs.cropper.getCroppedCanvas(
            {
                width: 520,
                height: 420,
                fillColor: '#fff'
            });

        const imgData = croppedCanvas.toDataURL();
        console.log(imgData)
        if (this.state.imageDate !== imgData) {
            this.setState({imgData})
        }
    }

    _setZoom(e){
        _.debounce((zoom)=>{
            this.setState({zoom})
        })(e.target.value);
    }

    render() {
        return (
            <div className="col">
                <div className="form-group">
                    <FileUpload updateUrl={(url) => {
                        this.setState({"croppieUrl": url});
                        // this.croppie.bind({'url': url})
                    }}/>
                </div>
                {/*<div ref="croppieElement"></div>*/}
                <div>
                    <Cropper
                        src={this.state.croppieUrl}
                        viewMode={0}
                        dragMode={'move'}
                        autoCropArea={1}
                        restore={false}
                        modal={false}
                        guides={false}
                        highlight={false}
                        cropBoxMovable={false}
                        cropBoxResizable={false}
                        toggleDragModeOnDblclick={false}
                        aspectRation={this.state.width/this.state.height}
                        zoomable={true}
                        background={true}
                        backgroundColor={'#fff'}
                        ref='cropper'
                        crop={this._crop.bind(this)}

                    />
                    <input type="range" min={0.00} max={400.00} step={0.1} value={this.state.zoom} onChange={(e)=>{
                        this.setState({zoom:e.target.value})
                    }
                    }/>
                    <input type="number"  min={0.00} max={400.00} step={0.1}  value={this.state.zoom} onChange={(e)=>{
                        this.setState({zoom:e.target.value})
                    }
                    }/>
                </div>
                <div>
                    <img src={this.state.imgData} style={{'border': '1px solid red'}}/>
                </div>
                <div className="form-group">
                    <input className="form-control text-center" onChange={(input) => {
                        this.setState({title: this.titleInput.value})
                    }} placeholder="Tytuł" ref={(input) => {
                        this.titleInput = input;
                    }}/></div>
                <hr/>
            </div>
        )
            ;
    }
}

export default PageData;
