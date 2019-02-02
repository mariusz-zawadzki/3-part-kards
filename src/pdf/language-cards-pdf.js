import _ from 'lodash';

const BORDER = [true, true, true, true];
const colWidth = 45 * 2.87;
const tablePadding = 7;
const boxSize = colWidth - 10;
const imgWidth = 172;

export function getLanguagePdf(){
    const title = 'karty.pdf';
    try {
        const docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'portrait',

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
                    widths: [colWidth, colWidth, colWidth],
                    heights: [boxSize,boxSize,boxSize,boxSize],
                    body: getLanguageGrid()
                },
                pageBreak: 'after',
                layout: {
                    paddingLeft: () => tablePadding,
                    paddingRight: () => tablePadding,
                    paddingTop: () => tablePadding,
                    paddingBottom: () => tablePadding
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
        const text = "czarownica nożyczki";
        console.log("text leng is "+ text.length + "and shorted is");
        const margin = parseInt(boxSize / 2 - tablePadding *2* (text.length / 10));
        console.log("margin is " + margin)
        return [{
                table: {
                    border: BORDER,
                    widths:  [boxSize],
                    heights: boxSize,
                    body: [
                        [
                            [
                                {text : [text], fontSize: 22, margin: [0, margin, 0, 0]}
                        ]
                    ]]
                }
        }

        ];
        // return {
        //     border: BORDER,
        //     text: row + ' ' + col
        // };
    });
}