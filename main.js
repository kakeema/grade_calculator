
// let moduleName;
// let currentGrade;
// let whatIfGrade;

document.addEventListener('DOMContentLoaded', function() { // Event listenr for the DOM
    var addButton = document.querySelector('.modules button');
    var addModulesContainer = document.querySelector(".add-modules")
    // Adding the module
    addButton.addEventListener('click', function() { // Event listener for the + add more button, to add modules.
        var html = buttonClicked();
        addModulesContainer.insertAdjacentHTML('beforebegin', html);
    })
})

function buttonClicked() // + add more button function when it is being clicked on by a user.
{
    return`
    <div class="module">
        <div class="module-row">
            <div class="module-name">
                <input type="text" placeholder="New Module">
            </div>
            <div class="module-grade-current">
                <input type="number" placeholder="current" min="0" max="100">
            </div>  
            <div class="module-grade-whatif">
                <input type="number" placeholder="what if" min="0" max="100">
            </div>
        </div>
    </div>
    `;
}
