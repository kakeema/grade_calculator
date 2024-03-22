document.addEventListener('DOMContentLoaded', function() {
    var userModules = JSON.parse(localStorage.getItem('userModules')) || [];
    var resultsContainer = document.getElementById('results-container');

    userModules.forEach(function(moduleName) {
        var moduleAverage = localStorage.getItem(moduleName + "_average");
        if (moduleAverage) {
            var resultElement = document.createElement('div');
            resultElement.className = 'module-result';
            resultElement.textContent = moduleName + ": " + moduleAverage + "%";
            resultsContainer.appendChild(resultElement);
        }
    });
});