document.addEventListener('DOMContentLoaded', function() {
    const userModules = JSON.parse(localStorage.getItem('userModules')) || [];

    const modulesContainer = document.getElementById('modules-container');
    userModules.forEach(moduleName => {
        modulesContainer.appendChild(createModuleElement(moduleName));
    });

    modulesContainer.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('module-name')) {
            const moduleSections = e.target.nextElementSibling;
            const isVisible = moduleSections.style.display === 'block';
            // Hide all module sections
            document.querySelectorAll('.module-sections').forEach(el => el.style.display = 'none');
            // Toggle the visibility of the current module sections
            moduleSections.style.display = isVisible ? 'none' : 'block';
        }
    });
});

function createModuleElement(moduleName) {
    const moduleElement = document.createElement('div');
    moduleElement.className = 'module';

    moduleElement.innerHTML = `
        <div class="module-name">${moduleName}</div>
        <div class="module-sections" style="display: none;">
            ${buttonClicked()}
        </div>
    `;

    return moduleElement;
}

function buttonClicked() {
    // This is the same HTML structure as the function in index.html
    return `
        <div class="module">
            <div class="module-row">
                <div class="module-name">
                    <input type="text" placeholder="Section Name" required>
                </div>
                <div class="module-grade-current">
                    <input type="number" placeholder="Grade %" min="0" max="100" required>
                </div>
                <div class="module-grade-weight">
                    <input type="number" placeholder="Weight %" min="0" max="100">
                </div>
            </div>
            <button class="add-section-btn" onclick="addSection(this.parentNode)">+ add Section</button>
        </div>
    `;
}

function addSection(moduleRowDiv) {
    // Inserts new section just before the "+ add Section" button inside the module sections
    const newSectionHTML = buttonClicked();
    moduleRowDiv.insertAdjacentHTML('beforeend', newSectionHTML);
}
