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
    // Event listener for the calculate button
    const calculateButton = document.querySelector('.calculate-button button');
    calculateButton.addEventListener('click', function(event) {
        const isValid = validateModules();

        if (!isValid) {
            event.preventDefault(); // Stop the form from submitting
            // You can also display the error message in the DOM instead of using alert
        }
        // If isValid is true, the form will submit normally
    });
});

function createModuleElement(moduleName) {
    const moduleElement = document.createElement('div');
    moduleElement.className = 'module';

    // Create a container for the titles, but don't add content yet
    const headerRow = document.createElement('div');
    headerRow.className = 'module-row header-row';

    const moduleSections = document.createElement('div');
    moduleSections.className = 'module-sections';
    moduleSections.style.display = 'none';

    // Append headerRow to moduleSections, but it's empty initially
    moduleSections.appendChild(headerRow);

    const moduleHeader = document.createElement('div');
    moduleHeader.className = 'module-name';
    moduleHeader.textContent = moduleName;

    moduleElement.appendChild(moduleHeader);
    moduleElement.appendChild(moduleSections);

    // Create the "+ add Section" button for this module but do not display it initially
    const addSectionButton = createAddSectionButton();
    addSectionButton.style.display = 'none'; // The button is hidden by default
    addSectionButton.onclick = function() {
        // If it's the first section, add the titles
        if (moduleSections.getElementsByClassName('section').length === 0) {
            addSectionTitles(headerRow); // Now we pass the headerRow to add titles
        }
        addSection(moduleSections);
    };
    moduleElement.appendChild(addSectionButton);

    return moduleElement;
}

function addSectionTitles(headerRow) {
    headerRow.innerHTML = `
        <div class="title">Name</div>
        <div class="title">Grade</div>
        <div class="title">Weight</div>
    `;
}

function createAddSectionButton() {
    const button = document.createElement('button');
    button.className = 'add-section-btn';
    button.textContent = '+ add Section';
    return button;
}

function addSectionTitles(headerRow) {
    headerRow.innerHTML = `
        <div class="titleSpace"></div>
        <div class="title">Grade</div>
        <div class="title">Weight</div>
    `;
  }

  
function addSection(moduleSectionsDiv) {
    
    if (moduleSectionsDiv.children.length === 0) {
        addSectionTitles(moduleSectionsDiv);
    }
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
function validateModules() {
    const modules = document.querySelectorAll('.module');
    let allModulesValid = true;

    modules.forEach(module => {
        const moduleName = module.querySelector('.module-name').textContent;
        const sections = module.querySelectorAll('.section');

        // Check if the module has at least one section
        if (sections.length === 0) {
            allModulesValid = false;
            alert('Please add at least one section for the module: ' + moduleName);
        }
    });

    return allModulesValid;
}