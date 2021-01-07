window.onload = function () {
    let buttons = document.getElementsByTagName("button");
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick(buttonClicked(buttons, i));
}

function buttonClicked(buttonsArray, idInArray) {
    console.log("Click!");
    buttonsArray[idInArray].disabled = true;
}