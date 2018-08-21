import React, {Component} from 'react';
import {savePdfCode} from './../../pdf/save-pdf'
import _ from 'lodash';
import {Stage,FastLayer, Layer, Star, Text, Rect} from 'react-konva';

Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

const WHITE = "#ffffff";
const DEFAULT_WIDTH = 17;
const DEFAULT_HEIGHT = 23;

const squareSize = 25;
const colorArray = [
    '#000000',
    '#ffffff',
    '#ff0000',
    '#fff200',
    '#3ed019',
    '#0071f3',
    '#ff7f27',
    '#6b2e0b',
    '#ffaec9',
    '#b83dba'
];
class GridDraw extends Component {


    constructor(props) {
        super(props);
        this.drawHandler = this.drawHandler.bind(this);
        this.clear = this.clear.bind(this);
        this.changeHeight = this.changeHeight.bind(this);
        this.changeWidth = this.changeWidth.bind(this);
        this.state = {
            "pressed": false,
            drawColor: "#000000",
            legend: {},
            colorGrid: this.generateGrid(DEFAULT_HEIGHT, DEFAULT_WIDTH),
            clear: false,
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT
        };
    }


    generateGrid(height, width) {
        let row = [];
        let cols = [];
        for (let i = 1; i <= width; i++) {
            // row.push(WHITE);
            row.push(colorArray[i%colorArray.length]);
        }
        for (let i = 1; i <= height; i++) {
            cols.push(row.slice());
        }
        return cols;
    }

    changeHeight(e) {
        let x = e.target.value;
        var parsed = parseInt(x, 10);
        if (!isNaN(parsed)) {
            this.setState({height: Math.max(0, Math.min(23, parsed))}, this.clear);
        }
    }

    changeWidth(e) {
        let x = e.target.value;
        var parsed = parseInt(x, 10);
        if (!isNaN(parsed)) {
            this.setState({width: Math.max(0, Math.min(17, parsed))}, this.clear)
        }
    }

    drawHandler(colNumber, rowNumber, color, oldColor) {

        if (color === oldColor) {
            return;
        }
        const LETTERS = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];
        let legend = {...this.state.legend};
        const field = LETTERS[colNumber - 1] + " " + rowNumber;

        if (GridDraw.isNotWhite(color)) {
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
        let newRow = newGrid[rowNumber - 1].slice();
        newRow[colNumber - 1] = color;
        newGrid[rowNumber - 1] = newRow;
        this.setState({legend, colorGrid: newGrid});
    }

    static isNotWhite(color) {
        return !(color === WHITE || color === "#fff" || color === "white");
    }

    clear() {
        this.setState({"pressed": false, drawColor: WHITE, legend: {}, clear: true}, () => {
            let grid = this.generateGrid(this.state.height, this.state.width);
            this.setState({"pressed": false, drawColor: "#000000", colorGrid: grid, legend: {}, clear: false})
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
        let rows = rowCount.map((row) =>
            <Layer hitGraphEnabled={true} perfectDraw={false}
                   onMouseDown={e => {
                       console.log("event", e)
                       console.log("start draw", new Date())
                       e.target.fill(this.state.drawColor);
                       // e.target.getParent().draw()
                       e.target.draw()
                       this.state.colorGrid[0][row] = this.state.drawColor
                       console.log("end draw", new Date())
                   }}
            >{cols.map(
                    col => <Rect key={"cell_"+col+"_"+row}
                        x={col * squareSize}
                        y={row * squareSize}
                        width={squareSize}
                        height={squareSize}
                        fill={this.state.colorGrid[col][row]}
                         perfectDraw = {false}
                                 strokeWidth={1}
                                 stroke={"black"}
                    />)}</Layer>
        );

        let legend = [];
        _.forOwn(this.state.legend, (value, element) => {
            let elements = [];
            _.forOwn(value, (k, v) => {
                elements.push(<span key={v}>{v}; </span>)
            });
            legend.push(<div key={"color" + element} className="col">
                <span style={{'backgroundColor': element}}>KOLOR</span>
                {elements}
            </div>)
        });

        let colors = colorArray.map((c) => {
            return <div className='colorPick' key={'colorPick_' + c} onClick={() => this.setState({'drawColor': c})}
                        style={{'backgroundColor': c}}/>
        });
        console.log("rendered", new Date())
        return <div className="container">
            <div className="row">
                <div className="col">
                    <h3 className="text-center">Siatka kodowania</h3>
                </div>
            </div>

            <div className="row">
                <div className={"col"}>
                    <Stage width={this.state.width*squareSize} height={this.state.height*squareSize}>
                        {rows}
                    </Stage>
                </div>
                <div className="col">
                    <div>
                        Rozmiar:
                        <div className="row">
                            Szerokosć: <input type="text" value={this.state.width} onChange={this.changeWidth}
                                              size={2}/>
                        </div>
                        <div className="row">
                            Wysokosc: <input type="text" value={this.state.height} onChange={this.changeHeight}
                                             size={2}/>
                        </div>

                    </div>
                    <div className="row">
                        {colors}
                    </div>
                    <div className="row">
                        <br/>
                        Wybrany KOLOR:
                        <div className="colorPick"
                             style={{'backgroundColor': this.state.drawColor}}>&nbsp;&nbsp;&nbsp;</div>
                    </div>
                    <div className="row">
                        {legend}
                    </div>
                    <div>

                        <input type="button" onClick={this.clear} value="WYCZYSC"/>
                        <input type="button" onClick={() => savePdfCode({
                            width: this.state.width,
                            height: this.state.height,
                            legend: this.state.legend,
                            colorGrid: this.state.colorGrid
                        }, (t) => {
                        })} value="ZAPISZ"/>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default GridDraw;