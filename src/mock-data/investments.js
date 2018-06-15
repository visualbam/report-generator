export const investments = createInvestmentList(2);
// export const investments = [
//     {
//         "Id": 0,
//         "InvestmentName": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eros felis, accumsan eget orci at.",
//         "Color": "#F37777",
//         "Quarter": 1000.98,
//         "YearToDate": 12.00,
//         "OneYearReturn": 2.00,
//         "ThreeYearReturn": 1.00,
//         "FiveYearReturn": null,
//         "TenYearReturn": null,
//         "StandardDeviatrionThreeYear": 5.00,
//         "StandardDeviationFiveYear": 50
//     },
//     {
//         "Id": 1,
//         "InvestmentName": "Balanced 60 40",
//         "Color": "#F4B578",
//         "Quarter": 1.23,
//         "YearToDate": 12.23,
//         "OneYearReturn": 2.44,
//         "ThreeYearReturn": 0.00,
//         "FiveYearReturn": 5.23,
//         "TenYearReturn": 10.23,
//         "StandardDeviatrionThreeYear": 0.00,
//         "StandardDeviationFiveYear": 50.00
//     },
//     {
//         "Id": 2,
//         "InvestmentName": "Conservative 20 80",
//         "Color": "#ECED7E",
//         "Quarter": 1.43,
//         "YearToDate": 22.11,
//         "OneYearReturn": 4.99,
//         "ThreeYearReturn": 3.00,
//         "FiveYearReturn": 3.23,
//         "TenYearReturn": null,
//         "StandardDeviatrionThreeYear": 3.00,
//         "StandardDeviationFiveYear": 7.00
//     },
//     {
//         "Id": 3,
//         "InvestmentName": "Ultra Conservative 100",
//         "Color": "#B7D87B",
//         "Quarter": 7.43,
//         "YearToDate": 1.11,
//         "OneYearReturn": 2.55,
//         "ThreeYearReturn": 2.00,
//         "FiveYearReturn": 13.23,
//         "TenYearReturn": 22.22,
//         "StandardDeviatrionThreeYear": 4.00,
//         "StandardDeviationFiveYear": 66.11
//     },
//     {
//         "Id": 4,
//         "InvestmentName": "Ultra Conservative 200",
//         "Color": "#8CCA76",
//         "Quarter": 7.43,
//         "YearToDate": 1.11,
//         "OneYearReturn": 2.55,
//         "ThreeYearReturn": 1.00,
//         "FiveYearReturn": 13.23,
//         "TenYearReturn": 22.22,
//         "StandardDeviatrionThreeYear": 1.50,
//         "StandardDeviationFiveYear": 66.11
//     },
//     {
//         "Id": 5,
//         "InvestmentName": "Ultra Conservative 600",
//         "Color": "#8DCFAB",
//         "Quarter": 7.43,
//         "YearToDate": 1.11,
//         "OneYearReturn": 2.55,
//         "ThreeYearReturn": 5.00,
//         "FiveYearReturn": 13.23,
//         "TenYearReturn": 22.22,
//         "StandardDeviatrionThreeYear": 5.00,
//         "StandardDeviationFiveYear": 66.11
//     }
// ];



function createInvestmentList(numberOfInvestments) {
    let investments = [];
    let investmentNames = [
        'Balanced 60 40',
        'Conservative 20 80',
        'Ultra Conservative 100',
        'Ultra Conservative 200',
        'Ultra Conservative 600',
        'Ultra Conservative 800'
    ];
    let colors = [
        '#F37777',
        '#F4B578',
        '#ECED7E',
        '#B7D87B',
        '#8CCA76',
        '#8DCFAB'
    ];

    for (let x = 0; x < numberOfInvestments; x++) {
        let randomColorIndex = Math.floor(Math.random() * colors.length);
        let randomInvestmentNameIndex = Math.floor(Math.random() * colors.length);

        investments.push({
            Id: randomWholeNum(),
            InvestmentName: investmentNames[randomInvestmentNameIndex],
            Color: colors[randomColorIndex],
            Quarter: randomNum(),
            YearToDate: randomNum(),
            OneYearReturn: randomNum(),
            ThreeYearReturn: randomNum(),
            FiveYearReturn: randomNum(),
            TenYearReturn: randomNum(),
            StandardDeviatrionThreeYear: randomNum(),
            StandardDeviationFiveYear: randomNum()
        });
    }

    return investments;
}

function randomNum() {
    let precision = 100; // 2 decimals
    return Math.floor(Math.random() * (100 * precision - precision) + precision) / (precision);
}

function randomWholeNum() {
    return Math.floor(Math.random() * 65);
}