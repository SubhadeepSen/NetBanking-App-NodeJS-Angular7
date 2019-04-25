module.exports = async function (summary) {
    var pdfBody = [];
    pdfBody.push([
        { text: 'Date', style: 'tableHeader' },
        { text: 'Transaction Details', style: 'tableHeader' },
        { text: 'Amount', style: 'tableHeader' }
    ]);
    summary.forEach(smmry => {
        pdfBody.push([
            { text: `${new Date(smmry.transferedOn).toDateString()}`, style: 'textStyle' },
            { text: `From ${'XXXXXXXX' + new String(smmry.from).substr(8)} to ${'XXXXXXXX' + new String(smmry.to).substr(8)}; Remark: ${smmry.remark}`, style: 'textStyle' },
            { text: smmry.amount, style: 'textStyle' }
        ]);
    });

    const docDefinition = {
        pageSize: 'A4',
        content: [
            { text: `${new Date().toDateString()}`, style: 'date' },
            { text: 'Statement', style: 'header' },
            {
                style: 'table',
                table: {
                    body: pdfBody
                }
            },
        ],
        styles: {
            header: {
                fontSize: 24,
                bold: true,
                margin: [0, 0, 0, 10],
                alignment: 'center'

            },
            date: {
                alignment: 'right',
                fontSize: 10,
                italics: true
            },
            tableHeader: {
                fillColor: 'lightgray',
                fontSize: 14,
                color: 'black',
                bold: true,
                margin: [5, 5, 5, 5],
                alignment: 'center',
            },
            table: {
                margin: [0, 15, 0, 15],
            },
            textStyle: {
                fontSize: 12,
                color: '#424242',
                italics: true,
                bold: true,
                margin: [3, 3, 3, 3],
                alignment: 'center',
            }
        },
        defaultStyle: {
            // alignment: 'justify'
        }

    }
    return docDefinition;
}