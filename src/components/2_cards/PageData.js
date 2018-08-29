import React, {Component} from 'react';
import FileUpload from "./../FileUpload";
import _ from 'lodash';
import {CARD_SIZES, EMPTY_URL_SQUARE, ZOOM, ZOOM_PERCENTAGE} from './../../consts'
import Cropper from "react-cropper";

class PageData extends Component {
    constructor(props) {
        super(props);

        let stateImg = EMPTY_URL_SQUARE;
        let width = CARD_SIZES.width;
        let height = CARD_SIZES.width;
        this.state = {
            'title': '',
            'croppieUrl': stateImg,
            'imgData': stateImg,
            width,
            height,
            zoom: 100.0,
            boundryAndViewPort: {width, height}
        };
    }

    stateSet(cropper, zoom) {
        cropper.zoomTo(zoom);
    }

    delayedSetState = _.debounce(this.stateSet, 300);

    componentDidUpdate(prevProps, prevState) {
        if (prevState.zoom !== this.state.zoom) {
            const cropper = this.refs.cropper;
            const zoom = this.state.zoom / 100.0;
            if (this.state.delayed) {
                this.delayedSetState(cropper, zoom)
            }
            else {
                this.stateSet(cropper, zoom);
            }
        }
    }
    _read() {
        this.refs.cropper.setCropBoxData({width: CARD_SIZES.width});
    }

    _crop() {
        const croppedCanvas = this.refs.cropper.getCroppedCanvas(
            {
                width: CARD_SIZES.width,
                height: CARD_SIZES.height,
                fillColor: '#fff'
            });

        const imgData = croppedCanvas.toDataURL();
        const data = this.refs.cropper.getData();
        let newState = {};
        if (this.state.imgData !== imgData) {
            newState = {imgData}
        }
        if (this.state.croppieUrl === EMPTY_URL_SQUARE && (Math.abs(data.x) > 1 || Math.abs(data.y) > 1)) {
            console.log("changed")
            newState = {...newState, changed: true}
        }
        const zoom = PageData.extractZoom(this.refs.cropper);
        const currentZoom = parseFloat(this.state.zoom);
        if (currentZoom.toFixed(2) !== zoom.toFixed(2)) {
            newState = {...newState, zoom: zoom.toFixed(2), delayed: false}
        }
        if (newState !== {}) {
            this.setState({...newState})
        }
    }

    static extractZoom(cropper) {
        let image = cropper.getImageData();
        return (image.width / image.naturalWidth) * 100.0;
    }

    _setZoom(e) {
        const detail = e.detail;
        if (detail.ratio > ZOOM.max) {
            e.preventDefault();
            this.refs.cropper.zoomTo(ZOOM.max);
        }
        if (detail.ratio < ZOOM.min) {
            e.preventDefault();
            this.refs.cropper.zoomTo(ZOOM.min);
        }
    }


    render() {
        return (
            <div className="col">
                <div className="form-group">
                    <FileUpload updateUrl={(url) => {
                        this.setState({"croppieUrl": url});
                        this.croppie.bind({'url': url})
                    }}/>
                </div>

                <div className={"my-cropper-container"}>

                    <Cropper
                        className={"cropper-container"}
                        src={this.state.croppieUrl}
                        viewMode={0}
                        dragMode={'move'}
                        limited={true}
                        autoCrop={true}
                        autoCropArea={1.0}
                        restore={false}
                        modal={false}
                        guides={false}
                        highlight={false}
                        cropBoxMovable={false}
                        cropBoxResizable={false}
                        toggleDragModeOnDblclick={false}
                        aspectRatio={1}
                        zoomable={true}
                        background={false}
                        ref='cropper'
                        zoom={this._setZoom.bind(this)}
                        crop={this._crop.bind(this)}
                        ready={this._read.bind(this)}
                    />

                    <div>
                        <input type="range" min={ZOOM_PERCENTAGE.min} max={ZOOM_PERCENTAGE.max} step={0.01}
                               value={this.state.zoom} onChange={(e) => {
                            this.setState({zoom: parseFloat(e.target.value), delayed: false})
                        }}/>
                    </div>
                    <div>
                        Zoom: <input className="form-control text-center" type="number" min={ZOOM_PERCENTAGE.min}
                                     max={ZOOM_PERCENTAGE.max} step={0.01} value={this.state.zoom} onChange={(e) => {
                        this.setState({zoom: parseFloat(e.target.value), delayed: true})
                    }}/> %
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}

export default PageData;
