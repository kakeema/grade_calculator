document.addEventListener('DOMContentLoaded', function() {
    // hard coded for noww
    const userModules = ['Database', 'Programming', 'Computing Systems', 'PE2'];

    // Add the user modules to the page
    userModules.forEach(moduleName => addModule(moduleName));

    // Handle clicks on module names to expand/collapse sections
    document.getElementById('modules-container').addEventListener('click', function(e) {
        if (e.target && e.target.matches('.module-name')) {
            // Collapse all modules
            document.querySelectorAll('.module-sections').forEach(function(section) {
                section.style.display = 'none';
            });
            // Expand the clicked module
            e.target.nextElementSibling.style.display = 'block';
        }
    });
});

function addModule(moduleName) {
    const modulesContainer = document.getElementById('modules-container');
    const moduleElement = document.createElement('div');
    moduleElement.className = 'module';
    moduleElement.innerHTML = `
        <div class="module-name">${moduleName}</div>
        <div class="module-sections" style="display: none;">
            <!-- Sections will be added here -->
            <button class="add-section-btn" onclick="addSection(this)">+ add Section</button>
        </div>
    `;
    modulesContainer.appendChild(moduleElement);
}

function addSection(button) {
    const sectionContainer = button.previousElementSibling;
    sectionContainer.insertAdjacentHTML('beforeend', `
        <div class="section">
            <input type="text" placeholder="Section Name" required>
            <input type="number" placeholder="Grade %" min="0" max="100" required>
            <input type="number" placeholder="Weight %" min="0" max="100">
        </div>
    `);
}
