document.addEventListener('DOMContentLoaded', function() {
    var calculateButton = document.querySelector('.calculate-button button');

    calculateButton.addEventListener('click', function() {
        var modules = gatherModulesData();
        if (modules && modules.length > 0) {
            var allAveragesCalculated = true;
            modules.forEach(function(module) {
                let average = calculateModuleWeightedAverage(module);
                if (average !== null) {
                    console.log(module.name + " Module Weighted Average:", average);
                    localStorage.setItem(module.name + "_average", average);
                } else {
                    allAveragesCalculated = false;
                }
            });

            if (allAveragesCalculated) {
                window.location.href = '../pages/results-with-exams.html'; // Adjust the path as necessary
            }
        } else {
            // Prevent navigation if modules data is not valid
            console.log("Invalid module data, navigation prevented.");
        }
    });
});

function gatherModulesData() {
    var modules = [];
    var isInvalidInputFound = false;
    var isAtLeastOneSectionAdded = false;

    document.querySelectorAll('.module').forEach(function(moduleElement) {
        var moduleNameElement = moduleElement.querySelector('.module-name input');
        var moduleName = moduleNameElement ? moduleNameElement.value.trim() : '';
        var sections = [];

        moduleElement.querySelectorAll('.section').forEach(function(sectionElement) {
            isAtLeastOneSectionAdded = true; // Set to true as soon as we find one section

            var gradeInput = sectionElement.querySelector('.module-grade-current input');
            var weightInput = sectionElement.querySelector('.module-grade-weight input');
            var grade = gradeInput ? gradeInput.value.trim() : '';
            var weight = weightInput ? weightInput.value.trim() : '';

            if (!grade || !weight) {
                isInvalidInputFound = true;
                gradeInput.classList.add('error');
                weightInput.classList.add('error');
            } else {
                gradeInput.classList.remove('error');
                weightInput.classList.remove('error');
                sections.push({ grade: grade, weight: weight });
            }
        });

        if (sections.length > 0 && moduleName) {
            modules.push({ name: moduleName, sections: sections });
        }
    });

    // If no sections have been added or there's an invalid input, display an error
    if (!isAtLeastOneSectionAdded || isInvalidInputFound) {
        alert("Please add at least one section with valid grades and weights for each module.");
        return null;
    }

    return modules;
}



function calculateModuleWeightedAverage(module) {
    let weightedSum = 0;
    let totalWeight = 0;

    for (const section of module.sections) {
        const grade = parseFloat(section.grade);
        const weight = parseFloat(section.weight);

        if (isNaN(grade) || isNaN(weight)) {
            // If either grade or weight is not a number, return null to stop calculation.
            return null;
        }

        weightedSum += grade * weight;
        totalWeight += weight;
    }

    if (totalWeight !== 100) {
        alert("Total weight for " + module.name + " does not add up to 100. Please adjust the weights.");
        return null;
    }

    return (weightedSum / totalWeight).toFixed(2);
}
