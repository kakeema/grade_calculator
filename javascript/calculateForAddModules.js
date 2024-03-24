document.addEventListener('DOMContentLoaded', function() {
    var calculateButton = document.querySelector('.calculate-button button');

    calculateButton.addEventListener('click', function() {
        clearPreviousData();
        var modules = gatherModulesData();
        if (modules && modules.length > 0) {
            var grades = modules.map(m => parseFloat(m.sections[0].grade)).sort((a, b) => a - b);
            var totalValue = grades.reduce((acc, grade, index) => {
                // Halve the smallest grade (first in the sorted array)
                return acc + (index === 0 ? grade / 2 : grade);
            }, 0);
            var average = totalValue / (grades.length - 0.5); // Adjust for the halved grade

            modules.forEach(function(module) {
                // Store the individual module's average, if needed
                let average = calculateModuleWeightedAverage(module);
                if (average !== null) {
                    localStorage.setItem(module.name + "_average", average);
                }
            });

            // Store the total average and modules in localStorage
            localStorage.setItem('modulesData', JSON.stringify(modules));
            localStorage.setItem('averageGrade', average.toFixed(2));

            window.location.href = '../pages/results2.html';
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
            modules.push({ name: moduleName, sections: sections });
        }
    });

    if (isInvalidInputFound) {
        alert("Please ensure all grades are numbers and do not exceed 100, and fill out all module names.");
        return null; // null to indicate an invalid state
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
