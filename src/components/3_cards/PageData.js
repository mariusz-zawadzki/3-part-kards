import React, {Component} from 'react';
import FileUpload from "./../FileUpload";
import _ from 'lodash';
import {CARD_SIZES, EMPTY_URL, ZOOM, ZOOM_PERCENTAGE} from './../../consts'

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import '../../css/cropper.css'


class PageData extends Component {
    constructor(props) {
        super(props);

        let stateImg = props.imgUrl || EMPTY_URL;
        // stateImg = '/child.jpg'
        let width = CARD_SIZES.width;
        let height = CARD_SIZES.height;
        this.state = {
            zoom: ZOOM_PERCENTAGE.default,
            'title': props.title || '',
            'croppieUrl': stateImg,
            'imgData': stateImg,
            width,
            height
        }
    }

    componentWillReceiveProps(nextProps) {
        // update images on change from props
        if (nextProps.imgUrl !== this.state.croppieUrl) {
            this.setState({ 'croppieUrl': nextProps.imgUrl, 'imgData': nextProps.imgUrl, title: nextProps.title}, ()=>{
                this._read();
            });
        }
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
        if (this.state.croppieUrl === EMPTY_URL && (Math.abs(data.x) > 1 || Math.abs(data.y) > 1)) {
            newState = {...newState, changed: true}
        }
        newState = this.addCurrentZoomToState(newState);
        if (newState !== {}) {
            this.setState({...newState})
        }
    }

    addCurrentZoomToState(newState) {
        const zoom = PageData.extractZoom(this.refs.cropper);
        const currentZoom = parseFloat(this.state.zoom);
        if (currentZoom.toFixed(2) !== zoom.toFixed(2)) {
            newState = {...newState, zoom: zoom.toFixed(2), delayed: false}
        }
        return newState;
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
                    <FileUpload updateUrl={({data, title}) => {
                        console.log(title);
                        this.setState({"croppieUrl": data, title:title});
                        this.props.onImageSelect({data, title})
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
                        aspectRatio={1.2380}
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
                    <div className="form-group">
                        <input className="form-control text-center" value={this.state.title} onChange={(input) => {
                            this.setState({title: input.target.value})
                        }} placeholder="Tytuł"/>
                    </div>
                    <hr/>
                </div>
            </div>
        )
            ;
    }
}

export default PageData;
