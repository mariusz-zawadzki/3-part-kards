
function getTwoPartPage(page) {
    const imageLeft = page.imgDataLeft;
    const imageRight = page.imgDataRight;
    let imageWidht = 382-7;
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
    let imageWidht = 382-7;
    let pixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=';
    // let pixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8zyDxHwAFNQIYTWiiwQAAAABJRU5ErkJggg==';
    let pixelElement = {image:pixel, height: 71-24-9, border: [false, false, false, false], paddingTop:0, paddingBottom:0};
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
                        rowSpan:2,
                        image: imageData, 
                        width: imageWidht
                    }
                ],
                [{text: title, 'align': 'center',fontSize: 30}],
                [{text: title, 'align': 'center',fontSize: 30}, pixelElement]
            ]
        },
        pageBreak: 'after',
        layout: {
            paddingLeft: function (i, node) {
                return (i === 0 || i=== 1) ? 14 : 0
            },
            paddingRight: function (i, node) {
                return (i === 0 || i === 1) ? 14 : 0
            },
            paddingTop: function (i, node) {
                return (i===1 || i===2)?12+6:12;
            },
            paddingBottom: function (i, node) {
                if(i===1 || i===2){
                    return 12+6;
                }
                return 12;
            }
        }
    };
    return pagePdf;
}

export function savePdf(pages, callback) {
    const title= 'karty.pdf'
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
        docDefinition.content[docDefinition.content.length-1].pageBreak = undefined;
        window.pdfMake.createPdf(docDefinition).download(title, function(){callback(true);});

    }
    catch(e){
        console.log(e);
        callback(false);
    }
}


export function savePdf2(pages, callback) {
    const title= 'karty.pdf'
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


        docDefinition.content = pages.map(getTwoPartPage)
        console.log(pages)
        docDefinition.content[docDefinition.content.length-1].pageBreak = undefined;
        window.pdfMake.createPdf(docDefinition).download(title, function(){callback(true);});

    }
    catch(e){
        console.log(e);
        callback(false);
    }
}