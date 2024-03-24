document.addEventListener('DOMContentLoaded', function() {
    // Retrieve module data from localStorage
    const modulesData = JSON.parse(localStorage.getItem('modulesData')); // Make sure 'modulesData' is the key you used

    // Assuming 'modulesData' is an array of { name: moduleName, average: moduleAverage }
    const moduleBreakdownContainer = document.querySelector('.module-breakdown');
    moduleBreakdownContainer.innerHTML = ''; // Clear previous data

    let totalAverage = 0;

    modulesData.forEach((module, index) => {
        // Create and append module name and average elements
        const moduleDiv = document.createElement('div');
        moduleDiv.className = 'module';
        moduleDiv.style.width = `${20 + (index % 3) * 10}%`; // Example dynamic width, adjust as necessary

        const moduleNameSpan = document.createElement('span');
        moduleNameSpan.textContent = module.name;
        const moduleAverageSpan = document.createElement('span');
        moduleAverageSpan.textContent = `${module.average}%`;

        moduleDiv.appendChild(moduleNameSpan);
        moduleDiv.appendChild(moduleAverageSpan);

        moduleBreakdownContainer.appendChild(moduleDiv);

        // Calculate total average for demonstration purposes
        totalAverage += parseFloat(module.average);
    });

    // Update the progress circle and average grade display
    const averageGrade = totalAverage / modulesData.length;
    updateCircleProgress(averageGrade); // Function to update progress circle based on averageGrade
});

function updateCircleProgress(averageGrade) {
    // Implementation similar to your original 'setProgress' logic
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference - (averageGrade / 100) * circumference;

    document.querySelector('.percentage').textContent = `${averageGrade.toFixed(2)}%`;

    // Update track-status based on averageGrade
    const trackStatus = document.querySelector('.track-status');
    trackStatus.textContent = averageGrade >= 70 ? 'on track' : 'below track';
    trackStatus.style.color = averageGrade >= 70 ? '#5cb85c' : '#d9534f';
}
