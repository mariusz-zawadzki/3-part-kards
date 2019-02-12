import _ from 'lodash';
import {pixel} from "../consts";

const BORDER = [true, true, true, true];
const colWidth = 45 * 2.87;
const tablePadding = 7;
const boxSize = colWidth - 10;
const imgWidth = 172;

export function getLanguagePdf() {
    const title = 'karty.pdf';
    try {
        const docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'portrait',

            styles: {
                tableExample: {
                    margin: [-20, 0, 0, 0],
                    alignment: 'center',
                    border: [false, false, false, false]
                }
            },
        };

        docDefinition.content = [
            {
                style: 'tableExample',
                table: {
                    widths: [colWidth, colWidth, colWidth],
                    heights: [boxSize, boxSize, boxSize, boxSize],
                    body: getLanguageGrid()
                },
                pageBreak: 'after',
                layout: {
                    paddingLeft: () => tablePadding,
                    paddingRight: () => tablePadding,
                    paddingTop: () => tablePadding,
                    paddingBottom: () => tablePadding,
                    // fillColor: function (i, node) {
                    //     return (i % 2 === 0) ? '#fafafe' : null;
                    // },
                    hLineColor: function (i, node) {
                        // return (i === 0 || i === node.table.body.length) ? 'black' :
                            return '#ccc';
                    },
                    vLineColor: function (i, node) {
                        // return (i === 0 || i === node.table.widths.length) ? 'black' :
                            return '#ccc';
                    },
                    hLineWidth: function (i, node) {
                        return 2;
                    },
                    vLineWidth: function (i) {
                        return 2;
                    }
                }
            }
        ];
        console.log(JSON.stringify(docDefinition.content))

        docDefinition.content[docDefinition.content.length - 1].pageBreak = undefined;
        // window.pdfMake.createPdf(docDefinition).download(title, function () {
        //     callback(true);
        // });
        //
        // docDefinition.content = pdfPages;
        // docDefinition.content[docDefinition.content.length - 1].pageBreak = undefined;
        window.pdfMake.createPdf(docDefinition).getDataUrl(function (outDoc) {
            document.getElementById('pdfV').src = outDoc;
        });
    } catch (e) {
        console.log(e);
        // callback(false);
    }
}

export function getLanguageGrid() {
    const times = _.times(4, (row) => {
        return getRow(row);
    });
    console.log(JSON.stringify(times));
    return times
}

function getRow(row, content) {
    content = {
        "type": "text",
        "data": [
            "czarownica",
            "kot",
            "miotła"
        ]
    }
    if (content.type === "image") {
        content.data = content.data.map((dataUrl) => {
            return {
                image: dataUrl,
                width: boxSize,
                height: boxSize
            }
        })
    } else if (content.type === "text") {
        content.data = content.data.map((text) => {
            const margin = parseInt(boxSize / 2 - tablePadding * 2 * Math.max(1, parseInt(text.length / 10)));
            return {text: [text], fontSize: 23, margin: [0, margin, 0, 0]}
        })
    } else {
        content.data = _.times(3, () => {
            return {
                image: pixel,
                width: boxSize,
                height: boxSize
            }
        })
    }
    return _.times(3, (col) => {
        return [{
            table: {
                border: [false, false, false, false],
                widths: [boxSize],
                heights: boxSize,
                body: [
                    [content.data[col]]
                ]
            },
            layout: {
                hLineColor: function (i, node) {
                    // return (i === 0 || i === node.table.body.length) ? 'black' :
                    return "#fff";
                },
                vLineColor: function (i, node) {
                    // return (i === 0 || i === node.table.widths.length) ? 'black' :
                    return "#fff";
                }
            }
        }

        ];
        // return {
        //     border: BORDER,
        //     text: row + ' ' + col
        // };
    });
}