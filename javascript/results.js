document.addEventListener('DOMContentLoaded', function() {
    var averageGrade = localStorage.getItem('averageGrade');
    if(averageGrade) {
        document.getElementById('averageDisplay').textContent = averageGrade + '%';
        updateCircleProgress(averageGrade);
        localStorage.removeItem('averageGrade'); // Clear the average if you don't need it anymore
    }
});

function updateCircleProgress(percentage) {
    var circle = document.querySelector('.circle-progress');
    // Update the circle progress bar to reflect the percentage
    // This may require additional JavaScript or a library like Chart.js or just pure CSS
}

document.getElementById('viewCalculatedGrades').addEventListener('click', function() {
    // Add action for the button, possibly redirect to another page or display more information
});