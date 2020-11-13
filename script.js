(function () {
  const colorArray = ["#530cff", "#ffa400", "green", "red", "#00d669", "blue"];

  let pickedColor = "";

  (function renderColorContainer() {
    const colorContainer = document.querySelector(".color-container");
    for (const color of colorArray) {
      const colorBox = document.createElement("div");
      colorBox.className = "btn";
      colorBox.style.backgroundColor = color;
      colorContainer.appendChild(colorBox);
    }
  })();

  function pickColor(event) {
    pickedColor = this.style.backgroundColor;
    colorBtns.forEach((btn) => btn.classList.remove("picked"));
    this.classList.add("picked");
  }

  const colorBtns = document.querySelectorAll(".btn");
  colorBtns.forEach((btn) => btn.addEventListener("click", pickColor));

  function markCompleted(event) {
    const parentContainer = this.closest(".task-container");
    if (this.checked) {
      parentContainer.classList.add("completed");
    } else {
      parentContainer.classList.remove("completed");
    }
  }

  function newTask(event) {
    const input = document.getElementById("input-field");

    if (!pickedColor) {
      pickedColor =
        colorArray[
          (() => Math.floor(Math.random() * Math.floor(colorArray.length)))()
        ];
    }

    const newTaskContainer = document.createElement("div");
    newTaskContainer.className = "task-container";
    newTaskContainer.style.backgroundColor = pickedColor;

    const checkboxContainer = document.createElement("div");
    checkboxContainer.className = "task-checkbox";
    newTaskContainer.appendChild(checkboxContainer);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox"
    checkbox.addEventListener("change", markCompleted);
    checkboxContainer.appendChild(checkbox);

    const valueContainer = document.createElement("div");
    valueContainer.className = "task-value";
    newTaskContainer.appendChild(valueContainer);

    const task = document.createElement("p");
    task.textContent = input.value;
    valueContainer.appendChild(task);

    form.insertAdjacentElement("beforebegin", newTaskContainer);

    input.value = "";
    pickedColor = "";
    colorBtns.forEach((btn) => btn.classList.remove("picked"));

    event.preventDefault();
  }

  const form = document.querySelector("form");
  form.addEventListener("submit", newTask);
})();
