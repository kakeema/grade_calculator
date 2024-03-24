document.addEventListener('DOMContentLoaded', function() {
    const modulesData = JSON.parse(localStorage.getItem('modulesData'));
    const moduleBreakdownContainer = document.querySelector('.module-breakdown');
    const averageGrade = parseFloat(localStorage.getItem('averageGrade'));

    moduleBreakdownContainer.innerHTML = '';
    modulesData.forEach((module) => {
        const moduleDiv = document.createElement('div');
        moduleDiv.className = 'module';

        const moduleNameSpan = document.createElement('span');
        moduleNameSpan.textContent = module.name;
        const moduleAverageSpan = document.createElement('span');
        moduleAverageSpan.textContent = `${module.sections[0].grade}%`; // Assuming grade is in the first section

        moduleDiv.appendChild(moduleNameSpan);
        moduleDiv.appendChild(moduleAverageSpan);
        moduleBreakdownContainer.appendChild(moduleDiv);
    });

    updateCircleProgress(averageGrade);
});

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
