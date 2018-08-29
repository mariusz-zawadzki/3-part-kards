import React, {Component} from 'react';
import PageData from './PageData'
import {savePdf2} from './../../pdf/save-pdf'
import {EMPTY_URL_SQUARE} from "../../consts";
class Pages extends Component {
    render() {
        let renderuje = false;
        let numbers = [];
        let strony = 10;
        if(this.state)
        {
            strony = this.state.iloscStron || strony;
            renderuje =  this.state.renderuje || renderuje;
        }
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
            console.log(reqPages)
            that.setState({renderuje:true});
            savePdf2(reqPages, renderStop);
        }

        const listItems = numbers.map((number) =>
                <PageData key={number} ref={(pageData) => {pages[number+""] = pageData}}/>
        );

        return <div className="container twoCards">
            <div className="row">
                <div className="col">
                    <h3 className="text-center">Karty obrazkowe</h3>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label>Ilość stron: </label>
                    <input onChange={(change)=>this.setState({iloscStron:this.inputStron.value}) } ref={(input) => {this.inputStron = input}} value={strony} />
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