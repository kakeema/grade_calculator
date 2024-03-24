document.addEventListener('DOMContentLoaded', function() {
    const userModules = JSON.parse(localStorage.getItem('userModules')); // Get the module names
    const modulesData = JSON.parse(localStorage.getItem('modulesData')); // Get the detailed module data
    const moduleBreakdownContainer = document.querySelector('.module-breakdown');
    let totalAverage = 0;

    moduleBreakdownContainer.innerHTML = '';

    if (userModules.length > 0) {
        // Calculate and display each module's average
        const moduleAverages = modulesData.map(module => calculateModuleWeightedAverage(module.sections));
        const lowestAverage = Math.min(...moduleAverages);
        totalAverage = moduleAverages.reduce((acc, average, index) => {
            // Halve the lowest average for the overall calculation
            return acc + (average === lowestAverage && index === moduleAverages.indexOf(lowestAverage) ? average / 2 : average);
        }, 0) / userModules.length;

        // Display module names and their averages
        userModules.forEach((moduleName, index) => {
            const moduleDiv = document.createElement('div');
            moduleDiv.className = 'module';

            const moduleNameSpan = document.createElement('span');
            moduleNameSpan.textContent = moduleName;

            const moduleAverageSpan = document.createElement('span');
            moduleAverageSpan.textContent = `${moduleAverages[index].toFixed(2)}%`;

            moduleDiv.appendChild(moduleNameSpan);
            moduleDiv.appendChild(moduleAverageSpan);

            moduleBreakdownContainer.appendChild(moduleDiv);
        });
    }

    updateCircleProgress(totalAverage.toFixed(2));
});

function calculateModuleWeightedAverage(sections) {
    let weightedSum = 0;
    let totalWeight = sections.reduce((acc, section) => acc + parseFloat(section.weight), 0);
    if (totalWeight !== 100) {
        console.error("The weights for the module sections do not add up to 100.");
        return null;
    }
    sections.forEach(section => {
        weightedSum += parseFloat(section.grade) * parseFloat(section.weight);
    });
    return weightedSum / totalWeight;
}

function updateCircleProgress(averageGrade) {
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - averageGrade / 100 * circumference;
    circle.style.strokeDashoffset = offset;

    const percentageText = document.querySelector('.percentage');
    percentageText.textContent = `${averageGrade}%`;

    const trackStatus = document.querySelector('.track-status');
    trackStatus.textContent = averageGrade >= 70 ? 'on track' : 'below track';
    trackStatus.style.color = averageGrade >= 70 ? '#5cb85c' : '#d9534f';
}
