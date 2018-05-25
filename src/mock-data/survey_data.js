export const survey_data = createSurveyData();

function createSurveyData() {
    let surveyDataList = [];

    for (let x = 0; x < 50; x++) {
        let precision = 100; // 2 decimals
        let randomNum = Math.floor(Math.random() * (10 * precision - precision) + precision) / (precision);
        let randomWholeNum = Math.floor(Math.random() * 65);
        surveyDataList.push({
            glazed: randomNum,
            jelly: randomNum,
            powdered: randomNum,
            sprinkles: randomNum,
            age: randomWholeNum,
            responses: randomWholeNum
        })
    }

    return surveyDataList;
}
