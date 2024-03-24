document.addEventListener('DOMContentLoaded', function() {
    const userModules = JSON.parse(localStorage.getItem('userModules')); // Added line to get module names
    const modulesData = JSON.parse(localStorage.getItem('modulesData'));
    const moduleBreakdownContainer = document.querySelector('.module-breakdown');
    const averageGrade = parseFloat(localStorage.getItem('averageGrade'));

    // Clear any existing content
    moduleBreakdownContainer.innerHTML = '';

    // Iterate over each module to create and append its display
    modulesData.forEach((module) => {
        // Calculate the average for each module
        const moduleAverage = calculateModuleWeightedAverage(module);

        const moduleDiv = document.createElement('div');
        moduleDiv.className = 'module';

        // Create a span for the module name
        const moduleNameSpan = document.createElement('span');
        moduleNameSpan.textContent = module.name;

        // Create a span for the module's average and check for null
        const moduleAverageSpan = document.createElement('span');
        moduleAverageSpan.textContent = moduleAverage !== null ? `${moduleAverage}%` : 'Error';

        // Append spans to the module div
        moduleDiv.appendChild(moduleNameSpan);
        moduleDiv.appendChild(moduleAverageSpan);

        // Append the module div to the container
        moduleBreakdownContainer.appendChild(moduleDiv);
    });

    // Update the progress circle with the average grade
    updateCircleProgress(averageGrade);
});

function calculateModuleWeightedAverage(module) {
    let weightedSum = 0;
    let totalWeight = 0;

    // Sum the product of grades and weights for each section
    module.sections.forEach(function(section) {
        const grade = parseFloat(section.grade);
        const weight = parseFloat(section.weight);

        // Sum up the weighted grades and the total weights
        weightedSum += grade * weight;
        totalWeight += weight;
    });

    // Check if total weight is 100 before calculating the average
    if (totalWeight === 100) {
        return (weightedSum / totalWeight).toFixed(2); // Return the formatted average
    } else {
        console.error("The weights for the module sections do not add up to 100.");
        return null; // Return null to indicate an error
    }
}
function updateCircleProgress(averageGrade) {
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - averageGrade / 100 * circumference;
    circle.style.strokeDashoffset = offset;

    const percentageText = document.querySelector('.percentage');
    percentageText.textContent = `${averageGrade.toFixed(2)}%`;

    const trackStatus = document.querySelector('.track-status');
    trackStatus.textContent = averageGrade >= 70 ? 'on track' : 'below track';
    trackStatus.style.color = averageGrade >= 70 ? '#5cb85c' : '#d9534f';
}
