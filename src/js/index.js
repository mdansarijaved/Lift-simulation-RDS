const myButton = document.querySelector(".btn-generate");
myButton.addEventListener("click", () => {
  
  var numDivs = parseInt(document.getElementById("Lift-Input").value);
  console.log(numDivs);
  for (var i = 0; i < numDivs; i++) {
    const mainDiv = document.querySelector(".lifts");
    const div = document.createElement("div");
    div.classList.add('lift')
    mainDiv.appendChild(div)
    
    console.log(mainDiv);
  }
});
