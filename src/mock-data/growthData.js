const growthValues = [];

generateGrowthValues('Model');
generateGrowthValues('+/- Peer Group Benchmark');

export const growthData = growthValues;

function generateGrowthValues(type) {
    let randomWholeNum = Math.floor(Math.random() * 65);
    let yearValue = 2001;

    for (let x = 0; x < 10; x++) {
        growthValues.push({
            amount: randomWholeNum += 1800,
            investmentType: type,
            year: new Date(yearValue++, 0, 0).getFullYear(),
        });
    }

    return growthValues;
}
