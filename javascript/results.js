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
    }

    var average = parseFloat(localStorage.getItem('averageGrade'));
    setProgress(average);

    var modulesData = getModulesData();
    populateModules(modulesData);
});

function populateModules(modulesData) {
    var moduleContainer = document.querySelector('.module-breakdown');
    moduleContainer.innerHTML = ''; // Clear existing modules before adding new ones

    modulesData.forEach(function(module) {
        var moduleDiv = document.createElement('div');
        var moduleNameSpan = document.createElement('span');
        var modulePercentageSpan = document.createElement('span');
        moduleNameSpan.textContent = module.name;
        modulePercentageSpan.textContent = ` ${module.percentage}%`;

        moduleDiv.appendChild(moduleNameSpan);
        moduleDiv.appendChild(modulePercentageSpan);
        moduleDiv.classList.add('module');

        moduleContainer.appendChild(moduleDiv);
    });
}

// module name and grades get reeturned and displayed onto the results page.
function getModulesData() {
    const storedModules = localStorage.getItem('modulesData');
    if (storedModules) {
        return JSON.parse(storedModules); // Parsing the JSON string back into an array of objects
    }
    // Returns an empty array if there are no stored modules
    return [];
}

function updateCircleProgress(averageGrade) {
    // Calculate the percentage for the progress bar
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