import React, {Component} from 'react';
import PageData from './PageData'
import {savePdf2} from '../../pdf/save-pdf'
import {EMPTY_URL_SQUARE} from "../../consts";
import FileUpload from "../FileUpload";
import {getIndexOrDefault} from '../../utils'

class Pages extends Component {

    constructor(props){
        super(props);
        this.state = {
            'iloscStron': 10,
            renderuje: false,
            'preLoadedFiles': []
        }
    }

    render() {
        let renderuje = this.state.renderuje;
        let numbers = [];
        let strony = this.state.iloscStron;
        for(let i = 1; i <= strony; i++)
        {
            numbers.push(i);
        }
        let pages = {};
        let that = this;
        function renderStop(success)
        {
            if(!success)
            {
                alert("coś poszło nie tak...")
            }
            that.setState({renderuje:false});
        }

        function renderuj(){
            let reqPages = []
            for(var n=0; n < numbers.length; n+=2)
            {
                let i = numbers[n]
                let imgDataLeft = null;
                let imgDataRight = null;
                let pageState = pages[i].state;
                if(pageState && pageState.imgData && (pageState.croppieUrl !== EMPTY_URL_SQUARE || pageState.changed))
                {
                    imgDataLeft = pageState.imgData
                }
                if(pages[i+1]!== undefined)
                {
                    pageState = pages[i+1].state;
                    if(pageState && pageState.imgData && (pageState.croppieUrl !== EMPTY_URL_SQUARE || pageState.changed))
                    {
                        imgDataRight = pageState.imgData
                    }
                }
                if(imgDataLeft || imgDataRight)
                {
                    reqPages.push({
                        imgDataLeft,
                        imgDataRight
                    })
                }
            }
            that.setState({renderuje:true});
            savePdf2(reqPages, renderStop);
        }

        const listItems = numbers.map((number) =>{
                const index = number - 1;
            let imageData = getIndexOrDefault(this.state.preLoadedFiles, index, {data: EMPTY_URL_SQUARE, title: ''});
            return <PageData imgUrl={imageData.data} title={imageData.title} key={number} ref={(pageData) => {
                    pages[number + ""] = pageData
                }}/>
        });

        return <div className="container twoCards">
            <div className="row">
                <div className="col">
                    <h3 className="text-center">Karty obrazkowe</h3>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label>Ilość stron: </label>
                    <input value={this.state.iloscStron}
                           onChange={(change) => this.setState({'iloscStron': change.target.value})}/>
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
                    'marginBottom': '-8px'}}/>
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