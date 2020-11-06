(function () {
  const colorArray = [
    '#530cff', '#ffa400', 'green', 'red', '#00d669', 'blue',
  ];

  let pickedColor = '';

  function colorButtons() {
    const colorContainer = document.querySelector('.color-container');
    for (const color of colorArray) {
      const colorBox = document.createElement('div');
      colorBox.className = 'btn';
      colorBox.style.backgroundColor = color;
      colorContainer.appendChild(colorBox);
    }
  }

  colorButtons();

  function pickColor(event) {
    pickedColor = this.style.backgroundColor;
    colorBtns.forEach((btn) => btn.style.border = '');
    this.style.border = '2px solid chocolate';
  }

  const colorBtns = document.querySelectorAll('.btn');
  colorBtns.forEach((btn) => btn.addEventListener('click', pickColor));

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function markCompleted(event) {
    const parentContainer = this.closest('.task-container')
    let targetBackgroundColor;
    if (this.checked) {
      targetBackgroundColor = '#ccc';
      parentContainer.querySelector('p').style.textDecoration = 'line-through';
    } else {
      targetBackgroundColor = this['data-bg-color'];
      parentContainer.querySelector('p').style.textDecoration = 'initial';
    }
    parentContainer.querySelectorAll('div')
        .forEach((element) => element.style.backgroundColor = targetBackgroundColor);
  }

  function newTask(event) {
    const input = document.getElementById('input-field');

    const newTaskContainer = document.createElement('div');
    newTaskContainer.className = 'task-container';

    if (!pickedColor) {
      pickedColor = colorArray[getRandomInt(colorArray.length)];
    }

    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'task-checkbox';
    checkboxContainer.style.backgroundColor = pickedColor;
    newTaskContainer.appendChild(checkboxContainer);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox['data-bg-color'] = pickedColor;
    checkbox.addEventListener('change', markCompleted)
    checkboxContainer.appendChild(checkbox);

    const valueContainer = document.createElement('div');
    valueContainer.className = 'task-value';
    valueContainer.style.backgroundColor = pickedColor;
    newTaskContainer.appendChild(valueContainer);

    const task = document.createElement('p');
    task.textContent = input.value;
    valueContainer.appendChild(task);

    form.insertAdjacentElement("beforebegin", newTaskContainer);
    newTaskContainer.insertAdjacentElement("afterend", document.createElement("br"));

    input.value = '';
    pickedColor = '';
    colorBtns.forEach((btn) => btn.style.border = '');

    event.preventDefault();
  }

  const form = document.querySelector('form');
  form.addEventListener('submit', newTask);
})();