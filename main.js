
// let moduleName;
// let currentGrade;
// let whatIfGrade;

document.addEventListener('DOMContentLoaded', function() { // Event listenr for the DOM
    var addButton = document.querySelector('.modules button');
    var container = document.querySelector('.modules');

    addButton.addEventListener('click', function() { // Event listener for the + add more button, to add modules.
        var html = buttonClicked();
        container.insertAdjacentHTML('beforebegin', html);
    })
})

function buttonClicked() // + add more button function when it is being clicked on by a user.
{
    return `<div> test </div>`;
}
