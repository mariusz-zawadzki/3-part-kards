import React, { Component } from 'react';
import { savePdfCode } from './../../pdf/save-pdf'
import _ from 'lodash';

Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

class GridCell extends Component {
    constructor(props) {
        super(props);
        let color = WHITE;
        this.changeColor = this.changeColor.bind(this);
        this.paintBackgroud = this.paintBackgroud.bind(this);

        this.click = this.click.bind(this);
        GridCell.createState = GridCell.createState.bind(this);

        this.state = GridCell.createState(color)
    }

    static createState(color) {
        return {
            style: {
                'backgroundColor': color
            },
            color
        }
    }
    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.drawColor !== this.state.color && nextProps.clear) {
            this.setState(GridCell.createState(nextProps.drawColor));
        }
    }

    changeColor(event) {
        if (this.props.pressed) {
            let color = this.props.pressed ? this.props.drawColor : WHITE;
            this.paintBackgroud(color)
        }
    }

    click(event) {
        this.paintBackgroud(this.props.drawColor)
    }

    paintBackgroud(color) {
        this.props.drawHandler(this.props.number, this.props.rownumber, color, this.state.color);
        this.setState(GridCell.createState(color));
    }
    render() {
        let number = this.props.number;
        let rownumber = this.props.rownumber;
        let style = GridCell.createState(this.state.color).style;
        return <td onClick={this.click} onMouseOver={this.changeColor} style={style} key={number + "r" + rownumber} />
    }
}


let GridRenderer = (props) => {
    let number = props.number;
    let color = props.color;
    let rowRenderer = props.rowRenderer;
    return <tr key={"row" + number}>
        <td style={{ border: "0px" }}>{number}</td>
        {rowRenderer(number, color)}
    </tr>
};

const WHITE = "#ffffff";
const DEFAULT_WIDHT = 17;
const DEFAULT_HEIGHT = 23;

class GridDraw extends Component {
    

    constructor(props) {
        super(props);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.drawHandler = this.drawHandler.bind(this);
        this.clear = this.clear.bind(this);
        this.changeHeight = this.changeHeight.bind(this);
        this.changeWidth = this.changeWidth.bind(this);
        this.state =  { "pressed": false, drawColor: "#000000", legend: {}, colorGrid:GridDraw.generateGrid(DEFAULT_HEIGHT, DEFAULT_WIDHT) , clear: false, width: DEFAULT_WIDHT, height:DEFAULT_HEIGHT};
    }


    static generateGrid(height, width)
    {
        let row = [];
        let cols = [];
        for (let i = 1; i <= width; i++) {
            row.push(WHITE);
        }
        for (let i = 1; i <= height; i++) {
            cols.push(row.slice());
        }
        return cols;
    }

    changeHeight(e){
        let x = e.target.value;
        var parsed = parseInt(x, 10);
        if(!isNaN(parsed)){
            this.setState({height:  Math.max(0, Math.min(23,parsed))},this.clear);
        }
    }

    changeWidth(e){
        let x = e.target.value;
        var parsed = parseInt(x, 10);
        if(!isNaN(parsed)){
            this.setState({width: Math.max(0, Math.min(17,parsed))},this.clear)
        }
    }

    mouseDown() {
        this.setState({ "pressed": true });
    }

    mouseUp() {
        this.setState({ "pressed": false });
    }

    drawHandler(colNumber, rowNumber, color, oldColor) {
        
        if(color===oldColor)
        {
            return;
        }
        const LETTERS = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];
        let legend = {...this.state.legend};
        const field = LETTERS[colNumber - 1] + " " + rowNumber;

        if (!(color === WHITE || color === "#fff" || color === "white")) {
            const colorLegend = legend[color] || {};
            colorLegend[field] = true;
            legend[color] = colorLegend
        }
        const oldLegend = legend[oldColor] || {};
        delete oldLegend[field];
        if (Object.size(oldLegend) === 0) {
            delete legend[oldColor];
        }
        let newGrid = this.state.colorGrid.slice();
        let newRow = newGrid[rowNumber-1].slice();
        newRow[colNumber-1] = color;
        newGrid[rowNumber-1] = newRow;
        console.log("New grid",newGrid);
        this.setState({ legend, colorGrid:newGrid });
    }

    clear() {
        this.setState({ "pressed": false, drawColor: WHITE, legend: {} , clear:true},()=>{
            let grid = GridDraw.generateGrid(this.state.height,this.state.width);
            this.setState( { "pressed": false, drawColor: "#000000", colorGrid: grid, legend: {}, clear: false})
        });
    }

    render() {
        let rowCount = [];
        let cols = [];
        for (let i = 1; i <= this.state.height; i++) {
            rowCount.push(i);
        }
        for (let i = 1; i <= this.state.width; i++) {
            cols.push(i);
        }

        let rowRenderer = (rownumber, color) => {
            return cols.map((number) =>
                <GridCell key={"gridCell_"+number+"_"+rownumber} number={number} rownumber={rownumber} pressed={this.state.pressed} 
                drawColor={this.state.drawColor}
                    clear={this.state.clear}
                    drawHandler={this.drawHandler} />
            );
        };
        let rows = rowCount.map((number) =>
            <GridRenderer key={"GridRender_"+number} number={number} color={this.state.color} rowRenderer={rowRenderer} />
        );

        let legend = [];
        _.forOwn(this.state.legend, (value, element) => {
            let elements = [];
            _.forOwn(value, (k, v) => {
                elements.push(<span key={v}>{v}; </span>)
            });
            legend.push(<div  key={"color"+element} className="col">
                <span style={{ 'backgroundColor': element }}>KOLOR</span>
                {elements}
            </div>)
        });

        let colors = [
            '#000000', //black
            WHITE,//white
            '#ff0000',//red
            '#fff200',//yellow
            '#3ed019',//green
            '#0071f3',//blue
            '#ff7f27',//orange
            '#6b2e0b',//brown
            '#ffaec9',//pink
            '#b83dba'//purple:
        ].map((c) => {
            return <div className='colorPick' key={'colorPick_' + c} onClick={() => this.setState({'drawColor': c})} style={{'backgroundColor': c}} />
        });
        return <div className="container">
            <div className="row">
                <div className="col">
                    <h3 className="text-center">Siatka kodowania</h3>
                </div>
            </div>
            <div className="row">
                <div className="col" onClick={this.mouseClick} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>
                    <table className="grid-draw-table">
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
                <div className="col">
                    <div>
                        Rozmiar:
                        <div className="row">
                        Szerokosć: <input type="number" min={1} max={17} step={1} value={this.state.width} onChange={this.changeWidth} size={2}/>
                        </div>
                        <div className="row">
                        Wysokosc: <input type="number" min={1} max={23} step={1}  value={this.state.height} onChange={this.changeHeight} size={2}/>
                        </div>
                        
                    </div>
                    <div className="row">
                        {colors}
                    </div>
                    <div className="row">
                        <br />
                        Wybrany KOLOR:
                        <div className="colorPick" style={{ 'backgroundColor': this.state.drawColor }}>&nbsp;&nbsp;&nbsp;</div>
                    </div>
                    <div className="row">
                        {legend}
                    </div>
                    <div>

                        <input type="button" onClick={this.clear} value="WYCZYSC" />
                        <input type="button" onClick={() => savePdfCode({
                            width: this.state.width,
                            height: this.state.height,
                            legend: this.state.legend,
                            colorGrid: this.state.colorGrid
                        }, (t) => { })} value="ZAPISZ" />
                    </div>
                </div>
            </div>
        </div>
    }
}

export default GridDraw;