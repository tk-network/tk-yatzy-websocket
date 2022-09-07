function countNumbers(thrownNumbers) {
    let object = {};

    for (let number = 1; number <= 6; number++) {
        object[number] = thrownNumbers.filter(tNumber => tNumber == number).length;
    }

    return object;
}

module.exports = {
    "einser": (thrownNumbers) => {
        return thrownNumbers.filter(number => number == 1).length * 1;
    },
    "zweier": (thrownNumbers) => {
        return thrownNumbers.filter(number => number == 2).length * 2;
    },
    "dreier": (thrownNumbers) => {
        return thrownNumbers.filter(number => number == 3).length * 3;
    },
    "vierer": (thrownNumbers) => {
        return thrownNumbers.filter(number => number == 4).length * 4;
    },
    "fünfer": (thrownNumbers) => {
        return thrownNumbers.filter(number => number == 5).length * 5;
    },
    "sechser": (thrownNumbers) => {
        return thrownNumbers.filter(number => number == 6).length * 6;
    },
    "einPaar": (thrownNumbers) => {
        return (new Set(thrownNumbers)).size !== thrownNumbers.length ? 10 : 0;
    },
    "zweiPaar": (thrownNumbers) => {
        let count = countNumbers(thrownNumbers);
        return Object.values(count).filter(c => c >= 2).length >= 2 ? 20 : 0;
    },
    "dreierpasch": (thrownNumbers) => {
        let count = Object.values(countNumbers(thrownNumbers));
        return count.some(c => c >= 3) ? thrownNumbers.reduce((total, current) => total + current, 0) : 0;
    },
    "viererpasch": (thrownNumbers) => {
        let count = Object.values(countNumbers(thrownNumbers));
        return count.some(c => c >= 4) ? thrownNumbers.reduce((total, current) => total + current, 0) : 0;
    },
    "fullHouse": (thrownNumbers) => {
        let count = Object.values(countNumbers(thrownNumbers));
        return count.some(c => c == 3) && count.some(c => c == 2) ? 25 : 0;
    },
    "kleineStraße": (thrownNumbers) => {
        return /1234|2345|3456/.test([...new Set(thrownNumbers)].sort().join("")) ? 30 : 0;
    },
    "großeStraße": (thrownNumbers) => {
        return /12345|23456/.test([...new Set(thrownNumbers)].sort().join("")) ? 40 : 0;
    },
    "yatzy": (thrownNumbers) => {
        let count = countNumbers(thrownNumbers);
        let yatzyKey = Object.keys(count).find(key => count[key] == 5);
        return yatzyKey ? 50 + (Number(yatzyKey) * 5) : 0;
    },
    "chance": (thrownNumbers) => {
        return thrownNumbers.reduce((total, current) => total + current, 0);
    },
}