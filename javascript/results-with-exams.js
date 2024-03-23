document.addEventListener('DOMContentLoaded', function() {
    var moduleResultsContainer = document.querySelector('.module-breakdown');
    
    // Retrieve modules and their calculated averages
    var userModules = JSON.parse(localStorage.getItem('userModules')) || [];
    userModules.forEach(moduleName => {
        var average = localStorage.getItem(moduleName + "_average");
        if (average) {
            var moduleDiv = document.createElement('div');
            moduleDiv.className = 'module';
            moduleDiv.innerHTML = `
                <span>${moduleName}</span>
                <span>${average}%</span>
            `;
            moduleResultsContainer.appendChild(moduleDiv);
        }
    });

    // Calculate the overall average and set the progress bar
    var overallAverage = calculateOverallAverage(userModules);
    setProgress(overallAverage);
});

function calculateOverallAverage(userModules) {
    var totalAverage = 0;
    var count = 0;
    userModules.forEach(moduleName => {
        var average = parseFloat(localStorage.getItem(moduleName + "_average"));
        if (!isNaN(average)) {
            totalAverage += average;
            count++;
        }
    });
    return count > 0 ? (totalAverage / count).toFixed(2) : 0;
}

function populateModules(modulesData) {
    var moduleContainer = document.querySelector('.module-breakdown');
    moduleContainer.innerHTML = ''; // Clear existing content

    modulesData.forEach(function(module) {
        // Create elements for module name and average
        var moduleDiv = document.createElement('div');
        var moduleNameSpan = document.createElement('span');
        var moduleAverageSpan = document.createElement('span');

        // Retrieve the average from localStorage
        var moduleAverage = localStorage.getItem(module.name + "_average");

        moduleNameSpan.textContent = module.name;
        moduleAverageSpan.textContent = moduleAverage ? moduleAverage + '%' : 'N/A';

        // Append to the module div
        moduleDiv.appendChild(moduleNameSpan);
        moduleDiv.appendChild(moduleAverageSpan);
        moduleDiv.classList.add('module');

        // Append the module div to the container
        moduleContainer.appendChild(moduleDiv);
    });
}



// module name and grades get returned and displayed onto the results page.
function getModulesData() {
    const storedModules = localStorage.getItem('modulesData');
    if (storedModules) {
        return JSON.parse(storedModules); // Parses the JSON string back into an array of objects
    }
    return [];  // Returns an empty array if there are no stored modules
}

function updateCircleProgress(averageGrade) {
    // Calculates the percentage for the progress bar
    var percentage = (averageGrade / 100) * 100;

    // Sets the stroke-dasharray value based on the percentage
    var dasharrayValue = percentage + ' 100';

    // Gets the circle-progress element
    var circleProgress = document.getElementById('circleProgress');

    // Sets the innerHTML to create the SVG element with the circle
    circleProgress.innerHTML = `
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            <circle class="progress-circle" cx="50" cy="50" r="40" fill="none" stroke="#82c6f7" stroke-width="10" stroke-linecap="round" stroke-dasharray="${dasharrayValue}" stroke-dashoffset="0"></circle>
        </svg>
    `;
}
