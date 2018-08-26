import _ from 'lodash';

const pixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=';
function getTwoPartPage(page) {
    const imageLeft = page.imgDataLeft;
    const imageRight = page.imgDataRight;
    let imageWidht = 382 - 7;
    return {
        style: 'tableExample',
        table: {
            widths: [imageWidht, imageWidht],
            body: [
                [
                    {
                        image: imageLeft,
                        width: imageWidht
                    },
                    {
                        image: imageRight,
                        width: imageWidht
                    }
                ]
                //369 x 295
            ]
        },
        pageBreak: 'after',
        layout: {
            paddingLeft: () => 14,
            paddingRight: () => 14,
            paddingTop: () => 14,
            paddingBottom: () => 14
        }
    };
}

function getTriPartPage(page) {
    const imageData = page.imgData;
    const title = page.title;
    let imageWidht = 382 - 7;
    let pixelElement = { image: pixel, height: 71 - 24 - 9, border: [false, false, false, false], paddingTop: 0, paddingBottom: 0 };
    return {
        style: 'tableExample',
        table: {
            widths: [imageWidht, imageWidht],
            body: [
                [
                    {
                        image: imageData,
                        width: imageWidht
                    },
                    {
                        rowSpan: 2,
                        image: imageData,
                        width: imageWidht
                    }
                ],
                [{text: title, 'align': 'center', fontSize: 30}],
                [{text: title, 'align': 'center', fontSize: 30}, pixelElement]
            ]
        },
        pageBreak: 'after',
        layout: {
            paddingLeft: (i) => (i === 0 || i === 1) ? 14 : 0,
            paddingRight: (i) => (i === 0 || i === 1) ? 14 : 0,
            paddingTop: (i) => (i === 1 || i === 2) ? 12 + 6 : 12,
            paddingBottom: (i) => (i === 1 || i === 2) ? 12 + 6 : 12
        }
    };
}

export function savePdf(pages, callback) {
    const title = 'karty.pdf';
    try {
        const docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'landscape',

            styles: {
                tableExample: {
                    margin: [-20, 0, 0, 0],
                    alignment: 'center'
                }
            }
        };


        docDefinition.content = pages.map(getTriPartPage);
        docDefinition.content[docDefinition.content.length - 1].pageBreak = undefined;
        window.pdfMake.createPdf(docDefinition).download(title, function () { callback(true); });

    }
    catch (e) {
        console.log(e);
        callback(false);
    }
}


const LETTERS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
export function savePdf2(pages, callback) {
    const title = 'karty.pdf';
    try {
        const docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'landscape',

            styles: {
                tableExample: {
                    margin: [-20, 0, 0, 0],
                    alignment: 'center'
                }
            },
        };


        docDefinition.content = pages.map(getTwoPartPage);
        docDefinition.content[docDefinition.content.length - 1].pageBreak = undefined;
        window.pdfMake.createPdf(docDefinition).download(title, function () { callback(true); });

    }
    catch (e) {
        console.log(e);
        callback(false);
    }
}

let pixelElement = { image: pixel, height: 16, paddingTop: 0, paddingBottom: 0 };
const border = [false,false, false, false];
let gridGenerator = (w, h, colorGrid, fill)=> {
    function* idMaker() {
        var index = 0;
        while (true)
            yield index++;
    }
    let rowGenerator = idMaker();
    return _.times(h, () => {
        let rowNum = rowGenerator.next().value;
        var gen = idMaker();

        return _.times(w, () => {
            let v = gen.next().value;
            if (v === 0) {
                if (rowNum === 0) {
                    return {border, text:""}
                }
                else {
                    return {text:rowNum,border};
                }
            }
            else if (rowNum === 0) {
                return {text: LETTERS[v - 1],style:'center',border};
            } else {
                let fillColor = undefined;
                if(fill)
                {
                    fillColor = colorGrid[rowNum-1][v-1];
                }
                return {...pixelElement, fillColor}

            }
        });
    })
};
export function savePdfCode(data, callback) {
    console.log(data);
    let legend = [];
    let gridWidth = data.width + 1;
    let gridHeight = data.height + 1;
    _.forOwn(data.legend, (value, element) => {
        let elements = [];
        _.forOwn(value, (k, v) => {
            elements.push(v)
        });
        elements.sort((a,b)=>{
            let aA = a.split(" ");
            let bA = b.split(" ");
            if(aA[1] === bA[1])
            {
                return aA[0]-bA[0]
            }
            else{
                return aA[1]-bA[1]
            }
        });
        elements = elements.map((e)=>{return e+";"});
        let elementsString = _.join(elements, ' ');

        elements = [];
        while(elementsString.length> 0)
        {
            let lastSemiolon = 75;
            while(lastSemiolon>0 && elementsString.charAt(lastSemiolon) !== ';') {
                if(elementsString.charAt(lastSemiolon) !== ';')
                {
                    lastSemiolon--;
                }
            }
            if(lastSemiolon > 0){
                elements.push(elementsString.substr(0, lastSemiolon+1)+"\n");
                elementsString = elementsString.substr(lastSemiolon+2);
            }
            if(lastSemiolon <=0)
            {
                elements.push(elementsString+"\n");
                elementsString = "";
            }
        }
        legend.push({
            element,
            elements
        })
    });

   

    try {
        const docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'landscape',

            styles: {
                tableExample: {
                    margin: [-20, 0, 0, 0],
                    alignment: 'left'
                },
                gridTable: {
                    margin: [-20, 0, 0, 0],
                    alignment: 'right'
                },
                center: {
                    alignment: 'center'
                }
            },
        };

        let imageWidth = 382 - 7;
        let legendContent = legend.map((row) => {
            return [
                {
                    canvas:
                    [
                        {
                            type: 'rect',
                            x: 0,
                            y: 0,
                            w: 20,
                            h: 20,
                            r: 0,
                            color: row.element,
                        }
                    ]
                },
                { text: row.elements }
            ]
        });
        let grid = gridGenerator(gridWidth,gridHeight,data.colorGrid, false);
        let coloredGrid = gridGenerator(gridWidth,gridHeight, data.colorGrid, true);
        let legendTable = [
            {text:'Legenda\n'},
                {
            table: {
                border: [false, false, false, false],
                widths: [20, imageWidth],
                body:
                    legendContent
                },
            layout: 'noBorders'
        }];
        docDefinition.content = [{
            style: 'tableExample',
            table: {
                border: [false, false, false, false],
                widths: [imageWidth + 40, imageWidth],
                body: [[
                    {
                        style: 'gridTable',
                        table: {
                            widths: _.times(gridWidth, () => 15),
                            body: grid
                        }
                    }
                    ,
                    legendTable
                ]]
            },
            pageBreak: 'after',
            layout: 'noBorders'
        },
            {
                style: 'tableExample',
                table: {
                    border: [false, false, false, false],
                    widths: [imageWidth + 40, imageWidth],
                    body: [[
                        {
                            style: 'gridTable',
                            table: {
                                widths: _.times(gridWidth, () => 15),
                                body: coloredGrid
                            }
                        }
                        ,
                        [""]
                    ]]
                },
                layout: 'noBorders'
            }];
        docDefinition.content[docDefinition.content.length - 1].pageBreak = undefined;
        const title = 'arkusz-kodowania.pdf';
        window.pdfMake.createPdf(docDefinition).download(title, function(){callback(true);});

    }
    catch (e) {
        console.log(e);
        callback(false);
    }
}