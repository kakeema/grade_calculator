document.addEventListener('DOMContentLoaded', function() {

    var calculateButton = document.querySelector('.calculate-button button');

    calculateButton.addEventListener('click', function() {
        clearPreviousData();
        var modules = gatherModulesData();
        if (modules && modules.length > 0) {
            var allModulesAverage = modules.map(function(module) {
                let average = calculateModuleWeightedAverage(module);
                if (average !== null) {
                    return { name: module.name, average: average };
                } else {
                    return null; // Indicate an invalid module with a null entry
                }
            }).filter(function(module) { return module !== null; }); // Remove invalid modules
            
            // This will check if all modules are valid
            var allAveragesCalculated = allModulesAverage.length === modules.length;
            
            if (allAveragesCalculated) {
                // This calculates the overall average here if necessary
                var totalAverage = allModulesAverage.reduce(function(acc, module) {
                    return acc + parseFloat(module.average);
                }, 0) / allModulesAverage.length;

                // Store the modules and total average in localStorage
                localStorage.setItem('modulesData', JSON.stringify(allModulesAverage));
                localStorage.setItem('averageGrade', totalAverage.toFixed(2));

                window.location.href = '../pages/results2.html';
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
            var grade = gradeInput ? gradeInput.value.trim() : '';
            var weight = weightInput ? weightInput.value.trim() : '';

            if (!grade || !weight) {
                // Check for empty grade or weight and add error class if found
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

    if (isInvalidInputFound) {
        alert("Please fill out all name, grade, and weight fields.");
        return null; // Returns null to indicate an invalid state
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
