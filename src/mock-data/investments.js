export const investments = createInvestmentList(6);

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