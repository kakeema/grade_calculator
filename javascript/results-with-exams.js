

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
