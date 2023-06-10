const myButton = document.querySelector(".btn-generate");
myButton.addEventListener('click', () => {
  createDivs();
  console.log("hello world")
})  

function createDivs() {
  var numDivs = parseInt(document.getElementById("Lift-Input").value);

  var container = document.getElementById("lifts");
  console.log(container)
  for (var i = 0; i < numDivs; i++) {
    var div = document.createElement("div");
    div.className = "lift";
    container.appendChild(div);
  }
}
