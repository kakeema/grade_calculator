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
                <input type="text" placeholder="New Module" required>
            </div>
            <div class="module-grade-current">
                <input type="number" placeholder="current" min="0" max="100" required>
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
    var isValid = true; // Validation flag
    var modules = document.querySelectorAll('.module'); // Select all module elements

    if (modules.length === 0) {
        alert('Please add at least one module.');
        return; // Exit the function
    }

    // Check if there are at least four modules.  Not sure if this is yet a MUST TO HAVE
    // if (modulesData.length < 4) {
    //     alert('Please enter at least four modules.');
    //     return;
    // }

     // Loop through all modules and grades to validate
    for (let i = 0; i < currentGrades.length; i++) {
        var gradeInput = currentGrades[i];
        var moduleNameInput = moduleNames[i];
        var grade = parseFloat(gradeInput.value);
        var moduleName = moduleNameInput.value.trim();

        // Check if the module name is empty
        if (moduleName === '') {
            isValid = false;
            moduleNameInput.classList.add('error');
        } else {
            moduleNameInput.classList.remove('error');
        }

        // Check if the grade input is a number
        if (isNaN(grade) || gradeInput.value === '') {
            isValid = false;
            gradeInput.classList.add('error');
        } else {
            gradeInput.classList.remove('error');
            grades.push(grade);
            modulesData.push({ name: moduleName, percentage: grade });     // Collect  current grades and module name into arrays.
        }
    }

    // If any field is invalid, show an alert and stop the function
    if (!isValid) {
        alert("Please enter a valid number for all grade fields and fill out all module names.");
        return;
    }

    // Sorting the grades to find the smallest result.
    grades.sort(function(a, b) {
        return a - b;
    });

    // Calculate total value, half the smallest grade and full for the other grades.
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
