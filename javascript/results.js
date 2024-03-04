document.addEventListener('DOMContentLoaded', function() {
    var circle = document.querySelector('.progress-ring__circle');
    var radius = circle.r.baseVal.value;
    var circumference = radius * 2 * Math.PI;
    var percentageText = document.querySelector('.percentage');

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    function setProgress(percent) {
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
        percentageText.textContent = `${percent.toFixed(2)}%`;

        // track-status section:
        var trackStatus = document.querySelector('.track-status');

        // Set the track-status text based on the average grade
        if (percent >= 70) {
            trackStatus.textContent = 'on track';
            trackStatus.style.color = '#5cb85c'; // Green color if on track
        } else {
            trackStatus.textContent = 'below track';
            trackStatus.style.color = '#d9534f'; // Red color if below track
        }
    }

    var average = parseFloat(localStorage.getItem('averageGrade'));
    setProgress(average);

    var modulesData = getModulesData();
    populateModules(modulesData);
});

function populateModules(modulesData) {
    var moduleContainer = document.querySelector('.module-breakdown');
    moduleContainer.innerHTML = ''; // Clears existing modules before adding new ones

    modulesData.forEach(function(module) {
        // Creates a container for each module with percentage underneath
        var moduleDiv = document.createElement('div');
        var moduleNameDiv = document.createElement('div'); // Container for the module name
        var modulePercentageDiv = document.createElement('div'); // Container for the percentage

        moduleNameDiv.textContent = module.name;
        modulePercentageDiv.textContent = `${module.percentage}%`;

        // Appends module name and percentage to the module container
        moduleDiv.appendChild(moduleNameDiv);
        moduleDiv.appendChild(modulePercentageDiv);
        moduleDiv.classList.add('module');

        // Appends the module container to the parent
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