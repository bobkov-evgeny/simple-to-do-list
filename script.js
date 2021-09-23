let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
let valueInput = '';
let input = null;


window.onload = function init () {
    input = document.getElementById('add-task');
    input.addEventListener('change', updateValue);
    render();

}

onClickButton = () => {
    if(!valueInput) return;
    allTasks.push({
        text: valueInput,
        isCheck: false
    });
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    valueInput = '';
    input.value = '';
    render();
}

updateValue = (event) => {
    valueInput = event.target.value;
}

onChangeCheckBox = (index) => {

    allTasks[index].isCheck = !allTasks[index].isCheck;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    render();
};

handleEdit = (index, value) => {

    allTasks[index].text = value;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
      render();
};

handleDelete = index => {
    allTasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    render();
}

handleReset = () => {
    allTasks = [];
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    render();
}

render = () => {
    const content = document.querySelector('#content-page');
    if(content) content.innerHTML = '';

    allTasks.map((item, index) => {
       const container = document.createElement('div');
       container.className = 'task-container'

       const checkBox = document.createElement('input');
       checkBox.type = 'checkbox';
       checkBox.checked = item.isCheck;
       checkBox.onchange = () => onChangeCheckBox(index);

       const text = document.createElement('p');
       text.innerText = item.text;
       text.className = item.isCheck ? 'text-task done-text' : 'text-task';

       const imageEdit = document.createElement('img');
       imageEdit.src = 'https://www.svgrepo.com/show/42233/pencil-edit-button.svg';
       imageEdit.onclick = () => {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = item.text;
            input.className='input-edit';
            container.replaceChild(input, text)
            input.onchange = () => handleEdit(index, input.value);
       };

       const imageDelete = document.createElement('img');
       imageDelete.src = 'https://www.svgrepo.com/show/21045/delete-button.svg';
       imageDelete.onclick = () => handleDelete(index);


       container.append(checkBox,text, imageEdit, imageDelete);
       content.append(container);
    });

    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'delete all data';
    resetBtn.onclick = () => handleReset();

    if(content.innerHTML) content.append(resetBtn);
};

