import _ from 'lodash';
import {pixel} from '../consts'

const BORDER = [true, true, true, true];
// const imgWidth = 60 * 2.87;
const imgWidth = 172;

export function getLanguagePdf(){
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

        docDefinition.content = [
            {
                style: 'tableExample',
                table: {
                    widths: [60*2.841, 60*2.841, 60*2.841],
                    body: getLanguageGrid()
                },
                pageBreak: 'after',
                layout: {
                    paddingLeft: () => 14,
                    paddingRight: () => 14,
                    paddingTop: () => 14,
                    paddingBottom: () => 14
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

    }
    catch (e) {
        console.log(e);
        // callback(false);
    }
}

export function getLanguageGrid() {
    const times = _.times(4, (row)=>{
        return getRow(row);
    });
    console.log(JSON.stringify(times));
    return times
}

function getRow(row){
    return _.times(3, (col) => {
        return [{
                table: {
                    border: BORDER,
                    // heights: function (row) {
                    //     return [168];//(row + 1) * 25;
                    // },
                    body: [
                        [{
                        image: pixel,
                        width: 172,
                        height: 172
                    }]]
                }
        }];
        // return {
        //     border: BORDER,
        //     text: row + ' ' + col
        // };
    });
}