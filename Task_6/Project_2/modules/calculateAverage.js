function calculateAverage(grades) {

    let total = 0;

    grades.forEach(grade => {
        total += grade;
    });

    return total / grades.length;
}

module.exports = calculateAverage;