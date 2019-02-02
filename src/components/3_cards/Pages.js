import React, {Component} from 'react';
import PageData from './PageData'
import {EMPTY_URL} from './../../consts'
import {savePdf} from './../../pdf/save-pdf'
import FileUpload from "../FileUpload";
import {getIndexOrDefault} from './../../utils'
import {resize} from "../../utils";
import _ from 'lodash'

const EMPTY_TILE = {data: EMPTY_URL, title:''};
class Pages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'iloscStron': 10,
            'renderuje': false,
            'preLoadedFiles': [_.times(10, ()=>{ return  EMPTY_TILE;})]
        }
    }


    render() {
        let renderuje = this.state.renderuje;
        let numbers = [];
        let strony = this.state.iloscStron;
        for (let i = 1; i <= strony; i++) {
            numbers.push(i);
        }
        let pages = {};
        let that = this;

        function renderStop(success) {
            if (!success) {
                alert("coś poszło nie tak...")
            }
            that.setState({renderuje: false});
        }

        function renderuj() {
            let reqPages = []
            for (var n in numbers) {
                let i = numbers[n]
                let pageState = pages[i].state;
                if (pageState && pageState.imgData && (pageState.croppieUrl !== EMPTY_URL || pageState.changed)) {
                    reqPages.push({
                        title: pageState.title,
                        imgData: pageState.imgData
                    })
                }
            }
            if (reqPages.length > 0) {
                console.log(reqPages.length)
                that.setState({renderuje: true});
                savePdf(reqPages, renderStop, 'karty2.pdf', '/string/pages');
            }
            else {
                alert("Ustaw przynajmniej jedną kartę.")
            }
        }

        const listItems = numbers.map((number) => {
            const index = number - 1;
            let imageData = getIndexOrDefault(this.state.preLoadedFiles, index, {data: EMPTY_URL, title:''});
            let key = "Page_data_pages_3"+number;
            return <PageData onImageSelect={(image)=>{
            }} imgUrl={imageData.data} title={imageData.title} key={key} ref={(pageData) => {
                pages[number + ""] = pageData
            }}/>
        });

        return <div className="container">
            <div className="row">
                <div className="col">
                    <h3 className="text-center">Karty trójdzielne</h3>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label>Ilość stron: </label>
                    <input value={this.state.iloscStron}
                           onChange={(change) =>{
                               const iloscStron = change.target.value;
                               let preloadedFiles = resize(this.state.preLoadedFiles.slice(0), iloscStron, EMPTY_TILE);
                               this.setState({iloscStron, preloadedFiles})
                           }}/>
                </div>
                <div className="col">
                    <FileUpload multiple={true}
                                formClass={"multiFile"}
                                label={"Wgraj wiele plików."}
                                updateUrl={(results) => {
                                    let newPages = Math.max(results.length,this.state.iloscStron);
                                    this.setState({'iloscStron': newPages, 'preLoadedFiles': results});
                                }}/>
                </div>
                <div className="col text-right">
                    {renderuje &&
                    <img src="/spinner.gif" alt="Działam daj mi chwilę!" style={{
                        height: '24px',
                        'marginBottom': '-8px'
                    }}/>
                    }
                    <button className="btn btn-primary" disabled={renderuje} onClick={renderuj}>RENDERUJ</button>
                </div>
            </div>
            <div className="row">
                {listItems}
            </div>
        </div>
    }
}


export default Pages;