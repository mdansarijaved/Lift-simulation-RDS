let Floor = document.getElementById("Floor-input");
let Lift = document.getElementById("Lift-Input");
let submit = document.getElementById("btn-generate");
let floorsContainer = document.querySelector("#adding-floors");

submit.addEventListener("click", () => {
  const inputFloor = Floor.value;
  const inputLift = Lift.value;
  if (inputFloor < inputLift) {
    alert("floor cannot be less than lift");
    return;
  }
  const screenWidth = window.innerWidth;
  if (screenWidth < 600 && inputLift > 3) {
    alert("On mobile, input lift cannot be more than 3");
    return;
  }

  while (floorsContainer.firstChild) {
    floorsContainer.firstChild.remove();
  }
  for (let i = 0; i < inputFloor; i++) {
    let mainDiv = document.createElement("div");
    let buttonDiv = document.createElement("div");
    let buttonUp = document.createElement("button");
    let buttonDown = document.createElement("button");
    let liftDiv = document.createElement("div");
    liftDiv.classList.add("lifts");
   
    mainDiv.classList.add("floor");
    buttonDiv.classList.add("btn-div");
    buttonUp.classList.add("buttons");
    buttonUp.textContent = "UP";
    buttonDown.textContent = "DN";
    buttonDown.classList.add("buttons");
    if (i === 0) {
      buttonDiv.appendChild(buttonDown);
    } else if (i === inputFloor - 1) {
      for (let j = 0; j < inputLift; j++) {
        let lift = document.createElement("div");
        lift.classList.add("lift");
        liftDiv.appendChild(lift);
      }
      buttonDiv.appendChild(buttonUp);
    } else {
      buttonDiv.appendChild(buttonUp);
      buttonDiv.appendChild(buttonDown);
    }
    mainDiv.appendChild(buttonDiv);
    mainDiv.appendChild(liftDiv);
    floorsContainer.appendChild(mainDiv);
  }
});
