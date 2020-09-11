const data = require('./data');

const places = data.places.reverse();

//243623786238592739
//123

function getAllDigits(num, place, numArray) {
    if (num <= 0) return "";
    let number = num % 10;
    if (places[place] == "ten") {
        let curNum = (num % 10) * 10;
        if (curNum == 10) {
            curNum = curNum + numArray[numArray.length - 1];
            number = data.directories[curNum] + " RN";
        } else
            number = data.directories[curNum];

    } else if (data.places[place] !== "unit") {

        number = data.directories[[num % 10]] + " " + places[place];

    } else {
        number = data.directories[[num % 10]];
    }
    numArray.push(num % 10)
    return getAllDigits(Math.floor(num / 10), ++place, numArray) + " " + number;
}

function sayItLoud(num) {
    const wholeText = getAllDigits(num, 0, []);
    console.log("before filter")
    console.log(wholeText)
    console.log("after filter")
    const wholeTextArray = wholeText.split(" ");
    const filterData = filterText(wholeTextArray)

    return filterData.join(" ");
}


function filterText(textArray) {
    return textArray.reduce((result, cur) => {
        if (result[result.length - 1] === "RN")
            result.pop();
        else
            result.push(cur);
        return result;
    }, [])
}
//   6,           2         3        8,         5        9         2,       7           3      9
// ["billion", "hundred", "ten", "million", "hundred", "ten", "thousand", "hundred", "ten", "unit"]
console.log(sayItLoud(6238592739))