import _ from 'lodash';

const pixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=';
function getTwoPartPage(page) {
    const imageLeft = page.imgDataLeft;
    const imageRight = page.imgDataRight;
    let imageWidht = 382 - 7;
    const pagePdf = {
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
            paddingLeft: function (i, node) {
                return 14
            },
            paddingRight: function (i, node) {
                return 14
            },
            paddingTop: function (i, node) {
                return 12;
            },
            paddingBottom: function (i, node) {
                return 12;
            }
        }
    };
    return pagePdf;
}

function getTriPartPage(page) {
    const imageData = page.imgData;
    const title = page.title;
    let imageWidht = 382 - 7;
    let pixelElement = { image: pixel, height: 71 - 24 - 9, border: [false, false, false, false], paddingTop: 0, paddingBottom: 0 };
    const pagePdf = {
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
                [{ text: title, 'align': 'center', fontSize: 30 }],
                [{ text: title, 'align': 'center', fontSize: 30 }, pixelElement]
            ]
        },
        pageBreak: 'after',
        layout: {
            paddingLeft: function (i, node) {
                return (i === 0 || i === 1) ? 14 : 0
            },
            paddingRight: function (i, node) {
                return (i === 0 || i === 1) ? 14 : 0
            },
            paddingTop: function (i, node) {
                return (i === 1 || i === 2) ? 12 + 6 : 12;
            },
            paddingBottom: function (i, node) {
                if (i === 1 || i === 2) {
                    return 12 + 6;
                }
                return 12;
            }
        }
    };
    return pagePdf;
}

export function savePdf(pages, callback) {
    const title = 'karty.pdf'
    try {
        const docDefinition = {
            pageSize: 'A4',

            // by default we use portrait, you can change it to landscape if you wish
            pageOrientation: 'landscape',

            styles: {
                tableExample: {
                    margin: [-20, 0, 0, 0],
                    alignment: 'center'
                }
            },
        };


        docDefinition.content = pages.map(getTriPartPage)
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
]
export function savePdf2(pages, callback) {
    const title = 'karty.pdf'
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


        docDefinition.content = pages.map(getTwoPartPage)
        console.log(pages)
        docDefinition.content[docDefinition.content.length - 1].pageBreak = undefined;
        window.pdfMake.createPdf(docDefinition).download(title, function () { callback(true); });

    }
    catch (e) {
        console.log(e);
        callback(false);
    }
}

export function savePdfCode(data, callback) {
    let legend = [];
    let gridWidth = data.width + 1;
    let gridHeight = data.height + 1;
    _.forOwn(data.legend, (value, element) => {
        let elements = []
        _.forOwn(value, (k, v) => {
            elements.push(v)
        });
        elements.sort((a,b)=>{
            let aA = a.split(" ");
            let bA = b.split(" ");
            if(aA[1] == bA[1])
            {
                return aA[0]-bA[0]
            }
            else{
                return aA[1]-bA[1]
            }
        })
        elements = elements.map((e)=>{return e+"; "})
        legend.push({
            element,
            elements
        })
    })
    function* idMaker() {
        var index = 0;
        while (true)
            yield index++;
    }

    let pixelElement = { image: pixel, height: 16, paddingTop: 0, paddingBottom: 0 };
    let rowGenerator = idMaker();
    const border = [false,false, false, false];
    let grid = _.times(gridHeight, () => {
        let rowNum = rowGenerator.next().value;
        var gen = idMaker();

        return _.times(gridWidth, () => {
            let v = gen.next().value;
            if (v == 0) {
                if (rowNum == 0) {
                    return {border, ...pixelElement}
                }
                else {
                    return {text:rowNum,border};
                }
            }
            else if (rowNum == 0) {
                return {text: LETTERS[v - 1],style:'center',border};
            } else {
                return pixelElement

            }
        });
    })

    const title = 'arkusz-kodowania.pdf'
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

        let imageWidht = 382 - 7;
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
        let legendTable = [
            {text:'Legenda\n'},
                {
            table: {
                border: [false, false, false, false],
                widths: [20, imageWidht],
                body:
                    legendContent
                },
            layout: 'noBorders'
        }]
        const pagePdf = {
            style: 'tableExample',
            table: {
                border: [false, false, false, false],
                widths: [imageWidht + 30, imageWidht],
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
            layout: 'noBorders'
        };


        docDefinition.content = [pagePdf];
        docDefinition.content[docDefinition.content.length - 1].pageBreak = undefined;
        window.pdfMake.createPdf(docDefinition).getDataUrl(function (outDoc) {
            document.getElementById('pdfV').src = outDoc;

        });
        // window.pdfMake.createPdf(docDefinition).download(title, function(){callback(true);});

    }
    catch (e) {
        console.log(e);
        callback(false);
    }
}