document.addEventListener('DOMContentLoaded', function() {
    var calculateButton = document.querySelector('.calculate-button button');

    calculateButton.addEventListener('click', function() {
        var modules = gatherModulesData();
        if (modules) {
            var allAveragesCalculated = true;
            modules.forEach(function(module) {
                let average = calculateModuleWeightedAverage(module);
                if (average !== null) {
                    console.log(module.name + " Module Weighted Average:", average);
                    localStorage.setItem(module.name + "_average", average);
                }
                else {
                    allAveragesCalculated = false;
                }
            });
            if (allAveragesCalculated) {
                window.location.href = '../pages/results.html'; 
            }
        };
    });
});

function gatherModulesData() {
    var modules = [];
    var isValid = true; // Starts with the assumption that the data is valid

    document.querySelectorAll('.module').forEach(function(moduleElement) {
        var moduleName = moduleElement.querySelector('.module-name').textContent;
        var sections = Array.from(moduleElement.querySelectorAll('.section')).map(function(sectionElement) {
            var gradeInput = sectionElement.querySelector('.module-grade-current input');
            var weightInput = sectionElement.querySelector('.module-grade-weight input');
            var grade = gradeInput.value;
            var weight = weightInput.value;

            // Checks if any input is empty
            if (grade.trim() === '' || weight.trim() === '') {
                isValid = false; // Mark as invalid
                gradeInput.classList.add('error'); // Add error class for visual feedback
                weightInput.classList.add('error'); // Add error class for visual feedback
            } else {
                gradeInput.classList.remove('error'); // Remove error class if input is valid
                weightInput.classList.remove('error'); // Remove error class if input is valid
            }

            return {
                grade: grade,
                weight: weight
            };
        });
        if (sections.length > 0) {
            modules.push({ name: moduleName, sections: sections });
        }
    });
    // If any of the inputs were invalid, we will alert the user
    if (!isValid) {
        alert("Please fill out all name, grade and weight fields.");
        return null; // Returns null to indicate an invalid state
    }

    return modules;
}

function calculateModuleWeightedAverage(module) {
    let weightedSum = 0;
    let totalWeight = 0;
    module.sections.forEach(section => {
        const grade = parseFloat(section.grade);
        const weight = parseFloat(section.weight);
        weightedSum += grade * weight;
        totalWeight += weight;
    });

    if (totalWeight !== 100) {
        alert("Total weight for " + module.name + " does not add up to 100. It adds up to " + totalWeight);
        return null;
    }

    return (weightedSum / totalWeight).toFixed(2);
}
