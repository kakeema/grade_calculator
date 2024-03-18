document.addEventListener('DOMContentLoaded', function() {
    const userModules = JSON.parse(localStorage.getItem('userModules')) || [];
    const modulesContainer = document.getElementById('modules-container');

    userModules.forEach(moduleName => {
        modulesContainer.appendChild(createModuleElement(moduleName));
    });

    modulesContainer.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('module-name')) {
            const moduleSections = e.target.nextElementSibling;
            const addSectionButton = e.target.parentNode.querySelector('.add-section-btn');
            const isVisible = moduleSections.style.display === 'block';
            
            // Hide all module sections and remove "+ add Section" buttons
            document.querySelectorAll('.module-sections').forEach(el => {
                el.style.display = 'none';
                // Find the "+ add Section" button inside the module and hide it
                const addButton = el.parentNode.querySelector('.add-section-btn');
                if(addButton) {
                    addButton.style.display = 'none';
                }
            });

            // Show or hide the clicked module's sections and toggle the button's visibility
            moduleSections.style.display = isVisible ? 'none' : 'block';
            if (addSectionButton) {
                addSectionButton.style.display = isVisible ? 'none' : 'block';
            }
        }
    });
});

function createModuleElement(moduleName) {
    const moduleElement = document.createElement('div');
    moduleElement.className = 'module';

    const moduleSections = document.createElement('div');
    moduleSections.className = 'module-sections';
    moduleSections.style.display = 'none';

    const moduleHeader = document.createElement('div');
    moduleHeader.className = 'module-name';
    moduleHeader.textContent = moduleName;

    moduleElement.appendChild(moduleHeader);
    moduleElement.appendChild(moduleSections);

    // Create the "+ add Section" button for this module but do not display it initially
    const addSectionButton = createAddSectionButton();
    addSectionButton.style.display = 'none'; // The button is hidden by default
    addSectionButton.onclick = function() {
        addSection(moduleSections);
    };
    moduleElement.appendChild(addSectionButton);

    return moduleElement;
}

function createAddSectionButton() {
    const button = document.createElement('button');
    button.className = 'add-section-btn';
    button.textContent = '+ add Section';
    return button;
}

function addSection(moduleSectionsDiv) {
    // Your existing logic for creating a new section
    const sectionHTML = `
        <div class="section">
            <div class="module-row">
                <div class="module-name">
                    <input type="text" placeholder="Name" required>
                </div>
                <div class="module-grade-current">
                    <input type="number" placeholder="Grade" min="0" max="100" required>
                </div>
                <div class="module-grade-weight">
                    <input type="number" placeholder="Weight" min="0" max="100">
                </div>
            </div>
        </div>
    `;
    moduleSectionsDiv.insertAdjacentHTML('beforeend', sectionHTML);
}
