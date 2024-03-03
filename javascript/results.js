document.addEventListener('DOMContentLoaded', function() {
    var circle = document.querySelector('.progress-ring__circle');
    var radius = circle.r.baseVal.value;
    var circumference = radius * 2 * Math.PI;
    var percentageText = document.querySelector('.percentage'); // Get the percentage text element

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    function setProgress(percent) {
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
        percentageText.textContent = `${percent.toFixed(2)}%`; // Update the percentage text content
    }

    // Retrieve the average grade from localStorage
    var average = parseFloat(localStorage.getItem('averageGrade'));
    setProgress(average); // Update the progress bar and percentage text
});
function updateCircleProgress(averageGrade) {
    // Calculate the percentage for the progress bar
    var percentage = (averageGrade / 100) * 100; // Assuming averageGrade ranges from 0 to 100

    // Set the stroke-dasharray value based on the percentage
    var dasharrayValue = percentage + ' 100';

    // Get the circle-progress element
    var circleProgress = document.getElementById('circleProgress');

    // Set the innerHTML to create the SVG element with the circle
    circleProgress.innerHTML = `
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            <circle class="progress-circle" cx="50" cy="50" r="40" fill="none" stroke="#82c6f7" stroke-width="10" stroke-linecap="round" stroke-dasharray="${dasharrayValue}" stroke-dashoffset="0"></circle>
        </svg>
    `;
}