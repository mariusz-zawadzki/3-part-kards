import React, {Component} from 'react';
import Croppie from 'croppie';
import FileUpload from "./../FileUpload";
import _ from 'lodash';
import {EMPTY_URL} from './../../consts'
class PageData extends Component {
    constructor(props){
        super(props);
        
        let stateImg = EMPTY_URL;
        let width = 130*4;
        let height =  105*4
        ;
        this.state = {
            'title':'',
            'croppieUrl':stateImg,
            'imgData':stateImg,
            width,
            height,
            boundryAndViewPort : { width, height}
        }
        this.previewOnClick = this.previewOnClick.bind(this);
    }

    componentDidMount(){
        let opts = {
            url:this.state.croppieUrl,
            viewport: this.state.boundryAndViewPort,
            boundry: this.state.boundryAndViewPort,
            showZoomer: true,
            enforceBoundary: false,
            update: _.debounce(this.previewOnClick,300)
        };
        this.croppie = new Croppie(this.refs.croppieElement,opts);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.croppieUrl !== this.state.croppieUrl)
        {
            this.croppie.destroy();
            this.componentDidMount()
        }
    }

    previewOnClick(e){
        if(e.points[0]=== '0' &&
        e.points[1] === '0' &&
        e.points[2] === '516' &&
        e.points[3] === '416' && e.zoom === 1)
        {
            return;
        }
        let that = this;
        this.croppie.result({type:'rawcanvas','size':'viewport'}).then(function (blob) {
            let org = blob.toDataURL();
            let image = new Image();
            image.src = org;
            let canv = blob;
            let hdc = canv.getContext('2d')
        
            let w = that.state.boundryAndViewPort.width;
            let h = that.state.boundryAndViewPort.height;
            // Fill the path
            hdc.fillStyle = "#fff";
            hdc.fillRect(0,0,w,h);
            image.onload = ()=>
            {
                hdc.drawImage(image,0,0)
                that.setState(prevState => ({
                        imgData: canv.toDataURL()
                }));
                
            }
        });
    }
    render() {
        return (
            <div className="col">
                <div className="form-group">
                    <FileUpload updateUrl={(url)=>{
                                    this.setState({"croppieUrl":url});
                                    this.croppie.bind({'url':url})
                                }}/>
                </div>
                <div ref="croppieElement"></div>
                <div className="form-group">
                            <input className="form-control text-center"onChange={(input) => {this.setState({title:this.titleInput.value})}} placeholder="Tytuł" ref={(input) => {
                                this.titleInput = input;
                            }}/></div>
                <hr/>
            </div>
        );
    }
}

export default PageData;
