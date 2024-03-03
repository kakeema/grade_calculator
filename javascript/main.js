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

//  This function does both calculate average, and assits in adding the module name and grades onto the results page below the percetnage bar circle.
function calculateAverage() {
    var currentGrades = document.querySelectorAll('.module-grade-current input');
    var moduleNames = document.querySelectorAll('.module-name input'); // Select all module name inputs
    var grades = [];
    var modulesData = []; // Array to hold the module data

    // Collect all current grades and module names into arrays.
    for (let i = 0; i < currentGrades.length; i++) {
        var grade = parseInt(currentGrades[i].value, 10); // Parse the value as a base-10 integer.
        var name = moduleNames[i].value; // Get the module name from the corresponding input
        if (!isNaN(grade) && name.trim() !== "") {
            grades.push(grade);
            modulesData.push({ name: name, percentage: grade }); // Add the module data to the array
        }
    }

    // Check if there are at least four modules.  Not sure if this is yet a MUST TO HAVE
    if (modulesData.length < 4) {
        alert('Please enter at least four modules.');
        return;
    }

    // Sorting the grades to find the smallest result.
    grades.sort(function(a, b) {
        return a - b;
    });

    // Calculate total value considering half the smallest grade and full of the others.
    var totalValue = grades.reduce(function(acc, grade, index) {
        return acc + (index === 0 ? grade / 2 : grade);
    }, 0);

    // Calculating the average.
    var average = totalValue / (grades.length - 0.5);

    // Saving the modules data to localStorage
    localStorage.setItem('modulesData', JSON.stringify(modulesData)); // Convert the array to a JSON string
    
    // Saving the average grade to localStorage
    localStorage.setItem('averageGrade', average.toFixed(2));

    // Redirecting to results.html
    window.location.href = 'pages/results.html'; 
}
