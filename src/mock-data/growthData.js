// const growthValues = [];
//
// generateGrowthValues("Model");
// generateGrowthValues("+/- Peer Group Benchmark");
//
// export const growthData = growthValues;
//
// function generateGrowthValues(type) {
//     let randomWholeNum = Math.floor(Math.random() * 65);
//     let yearValue = 2001;
//     let yearList = [];
//
//     for (let x = 0; x < 10; x++) {
//         growthValues.push({
//             amount: randomWholeNum += 1800,
//             investmentType: type,
//             year: new Date(yearValue++, 0, 0).getFullYear(),
//             color: type === "Model" ? "#80B3E1" : "#B8D87C"
//         });
//     }
//
//     return growthValues;
// }

export const growthData = [
    {
        "color": "#80B3E1",
        "investmentType": "Model",
        "investments": [
            {
                "amount": 2861,
                "year": 2000
            },
            {
                "amount": 24888,
                "year": 2000
            },
            {
                "amount": 6861,
                "year": 2000
            },
            {
                "amount": 5861,
                "year": 2000
            },
            {
                "amount": 5090,
                "year": 2001
            },
            {
                "amount": 5461,
                "year": 2002
            },
            {
                "amount": 8900,
                "year": 2003
            },
            {
                "amount": 9061,
                "year": 2004
            },
            {
                "amount": 10861,
                "year": 2005
            },
            {
                "amount": 12661,
                "year": 2006
            },
            {
                "amount": 14461,
                "year": 2007
            },
            {
                "amount": 15000,
                "year": 2008
            },
            {
                "amount": 16250,
                "year": 2009
            }
        ]
    },
    {
        "color": "#B7D87B",
        "investmentType": "+/1 Peer Group Benchmark",
        "investments": [
            {
                "amount": 2861,
                "year": 2000
            },
            {
                "amount": 22888,
                "year": 2000
            },
            {
                "amount": 6861,
                "year": 2000
            },
            {
                "amount": 5861,
                "year": 2000
            },
            {
                "amount": 5090,
                "year": 2001
            },
            {
                "amount": 5461,
                "year": 2002
            },
            {
                "amount": 8900,
                "year": 2003
            },
            {
                "amount": 9061,
                "year": 2004
            },
            {
                "amount": 10861,
                "year": 2005
            },
            {
                "amount": 12661,
                "year": 2006
            },
            {
                "amount": 14461,
                "year": 2007
            },
            {
                "amount": 15000,
                "year": 2008
            },
            {
                "amount": 17250,
                "year": 2009
            }
        ]
    }
];
