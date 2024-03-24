document.addEventListener('DOMContentLoaded', function() {
    var calculateButton = document.querySelector('.calculate-button button');

    calculateButton.addEventListener('click', function() {
        clearPreviousData();
        var modules = gatherModulesData();
        if (modules && modules.length > 0) {
            var totalAverage = calculateTotalAverage(modules);

            if (totalAverage !== null) {
                // Store the total average and modules in localStorage
                localStorage.setItem('modulesData', JSON.stringify(modules));
                localStorage.setItem('averageGrade', totalAverage);

                // Redirects to results2.html
                window.location.href = '../pages/results2.html';
            } else {
                console.log("Error in module data calculation.");
            }
        } else {
            console.log("Invalid module data, navigation prevented.");
        }
    });
});

function clearPreviousData() {
    localStorage.removeItem('modulesData');
    localStorage.removeItem('averageGrade');
}

function gatherModulesData() {
    var modules = [];
    var isInvalidInputFound = false;

    document.querySelectorAll('.module').forEach(function(moduleElement) {
        var moduleNameInput = moduleElement.querySelector('.module-name input');
        var moduleName = moduleNameInput ? moduleNameInput.value.trim() : '';
        var sections = [];

        if (moduleName === '') {
            // Add validation error if module name is empty
            moduleNameInput.classList.add('error');
            isInvalidInputFound = true;
        } else {
            moduleNameInput.classList.remove('error');
        }

        moduleElement.querySelectorAll('.section').forEach(function(sectionElement) {
            var gradeInput = sectionElement.querySelector('.module-grade-current input');
            var weightInput = sectionElement.querySelector('.module-grade-weight input');
            var grade = gradeInput ? parseFloat(gradeInput.value.trim()) : null;
            var weight = weightInput ? parseFloat(weightInput.value.trim()) : null;

            // Validation for empty inputs or invalid numbers
            if (grade === null || weight === null || isNaN(grade) || isNaN(weight)) {
                isInvalidInputFound = true;
                if (gradeInput) gradeInput.classList.add('error');
                if (weightInput) weightInput.classList.add('error');
            } else if (grade > 100) {
                // Check if grade is above 100 and show error if so
                isInvalidInputFound = true;
                gradeInput.classList.add('error');
                alert('Grade value cannot exceed 100.');
            } else {
                if (gradeInput) gradeInput.classList.remove('error');
                if (weightInput) weightInput.classList.remove('error');
                sections.push({ grade: grade, weight: weight });
            }
        });

        if (sections.length > 0 && moduleName && !isInvalidInputFound) {
            let totalWeight = sections.reduce((acc, section) => acc + section.weight, 0);
            if (totalWeight !== 100) {
                alert("Total weight for " + moduleName + " does not add up to 100. Please adjust the weights.");
                isInvalidInputFound = true;
                return; // Stop execution here
            }
            modules.push({ name: moduleName, sections: sections });
        }
    });

    if (isInvalidInputFound) {
        alert("Please ensure all grades are numbers and do not exceed 100, and fill out all module names.");
        return null; // null to indicate an invalid state
    }

    return modules;
}
function calculateModuleWeightedAverage(sections) {
    let weightedSum = 0;
    let totalWeight = 0;

    for (const section of sections) {
        const grade = parseFloat(section.grade);
        const weight = parseFloat(section.weight);

        if (isNaN(grade) || isNaN(weight)) {
            console.error("Grade or weight is not a number.");
            return null; // Return null to indicate an error in calculation
        }

        weightedSum += grade * weight;
        totalWeight += weight;
    }

    // This ensuress the total weight of sections within a module adds up to 100
    if (totalWeight === 100) {
        return (weightedSum / totalWeight).toFixed(2); // Returns the average grade for the module, formatted to 2 decimal places
    } else {
        console.error("The weights for the module sections do not add up to 100.");
        return null; // Returns null to indicate an error in total weight
    }
}

// This function will calculate the total average of all modules, with the lowest module's average halved.
function calculateTotalAverage(modules) {
    let totalAverage = 0;
    let lowestAverage = Number.MAX_VALUE;
    let sumAverages = 0;
    let moduleAverages = []; // Will store the weighted averages for each module

    for (const module of modules) {
        const average = parseFloat(calculateModuleWeightedAverage(module.sections));
        if (average === null) return null; // If there's an error, stop calculation

        moduleAverages.push(average);
        if (average < lowestAverage) {
            lowestAverage = average; // Keep track of the lowest average
        }
        sumAverages += average; // Sum up all averages
    }

    // Subtract the lowest average then add it back halved to get the adjusted sum
    let adjustedSumAverages = sumAverages - lowestAverage + (lowestAverage / 2);

    // The total average is the adjusted sum divided by the number of modules
    totalAverage = adjustedSumAverages / modules.length;

    return totalAverage.toFixed(2); // Return the formatted total average
}