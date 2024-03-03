
// let moduleName;
// let currentGrade;
// let whatIfGrade;

document.addEventListener('DOMContentLoaded', function() { // Event listenr for the DOM
    var addButton = document.querySelector('.modules button');
    var addModulesContainer = document.querySelector(".add-modules");
    var calculateButton = document.querySelector('.calculate-button button');

    // Adding the module
    addButton.addEventListener('click', function() { // Event listener for the + add more button, to add modules.
        var html = buttonClicked();
        addModulesContainer.insertAdjacentHTML('beforebegin', html);
    })

    // Calculate button
    calculateButton.addEventListener('click', function() {
        calculateAverage();
    });
})

function buttonClicked() // + add more button function when it is being clicked on by a user.
{
    return`
    <div class="module">
        <div class="module-row">
            <div class="module-name">
                <input type="text" placeholder="New Module">
            </div>
            <div class="module-grade-current">
                <input type="number" placeholder="current" min="0" max="100">
            </div>  
            <div class="module-grade-whatif">
                <input type="number" placeholder="what if" min="0" max="100">
            </div>
        </div>
    </div>
    `;
}

function calculateAverage() {
    var currentGrades = document.querySelectorAll('.module-grade-current input');
    var whatIfGrades = document.querySelectorAll('.module-grade-whatif');
    var grades = [];

    // Collect all current grades into an array.
    currentGrades.forEach(function(input) {
        var grade = parseInt(input.value, 10); // Parse the value as a base-10 integer.
        if (!isNaN(grade)) { // Check if the parsed value is a number.
            grades.push(grade);
        }
    });

    // Sorting the grades to find the smallest result.
    grades.sort(function(a, b) {
        return a - b;
    });

    // Check if there are at least four modules. NOTE: I do not know if 4 is the minimum or not, if we are allowed to have 1 single module I will have to change things around for this calculation. 
    if (grades.length < 4) {
        alert('Please enter at least four modules.');
        return;
    }

    // Calculate total value considering half the smallest grade and full of the others.
    var totalValue = (grades[0] / 2) + grades.slice(1).reduce(function(acc, grade) {
        return acc + grade;
    }, 0);

    // Calculate the average.
    var average = totalValue / 3.5;

    localStorage.setItem('averageGrade', average.toFixed(2));
    window.location.href = 'results.html'; // Make sure this is the correct path to your new results page.

    // Display the result.
}
