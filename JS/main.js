let todoInput; // miejsce gdzie uzytkownik w pisuje treść zadania
let errorInfo; //info o brakuj zadań / koniecnzość wpisania tekstu
let addBtn; //przycisk ADD - dodaj nowe elementy do listy
let ulList; //lista zadań, tagi UL
let newTodo; // nowo dodany Li, nowe zadanie

let popup;
let popupInfo; //tekst w popupie, jak się doda pusty tekst
let todoToEdit; //edytowany todo
let popupInput; //input w popupie
let popupAddBtn; // przycisk "zatwierdz"w popupie
let popupCloseBtn; // przycisk "anuluj" w popupie
const popupBtns = document.querySelector('.popup-btn');

const main = () => {
	prepareDOMEleements();
	prepareDOMEvents();
};
const prepareDOMEleements = () => {
	todoInput = document.querySelector(`.todo-input`);
	errorInfo = document.querySelector(`.error-info`);
	addBtn = document.querySelector(`.btn-add`);
	ulList = document.querySelector(`.todolist ul`);

	popup = document.querySelector(`.popup`);
	popupInfo = document.querySelector(`.popup-info`);
	popupInput = document.querySelector(`.popup-input`);
	popupAddBtn = document.querySelector(`.accept`);
	popupCloseBtn = document.querySelector(`.cancel`);
};
const prepareDOMEvents = () => {
	addBtn.addEventListener(`click`, addNewToDo);
	ulList.addEventListener(`click`, checkClick);
	popupCloseBtn.addEventListener('click', closePopup);
	popupAddBtn.addEventListener('click', changeTodoText);
	todoInput.addEventListener("keyup", enterKeyCheck)
};

const addNewToDo = () => {
	if (todoInput.value !== '') {
		newTodo = document.createElement(`li`);
		newTodo.textContent = todoInput.value;
		createToolsArea();
		ulList.append(newTodo);

		todoInput.value = '';
		errorInfo.textContent = '';
	} else {
		errorInfo.textContent = `Wpisz treść zadania!`;
	}
};

const createToolsArea = () => {
	const toolsPanel = document.createElement('div');
	toolsPanel.classList.add('tools');
	newTodo.append(toolsPanel);

	const btnComplete = document.createElement('button');
	btnComplete.classList.add('complete');
	btnComplete.innerHTML = `<i class="fas fa-check"></i>`;

	const btnEdit = document.createElement('button');
	btnEdit.classList.add('edit');
	btnEdit.textContent = 'EDIT';

	const btnDelete = document.createElement('button');
	btnDelete.classList.add('delete');
	btnDelete.innerHTML = `<i class="fas fa-times"></i>`;
	toolsPanel.append(btnComplete, btnEdit, btnDelete);
};

const checkClick = (e) => {
	if (e.target.matches(`.complete`)) {
		e.target.closest(`li`).classList.toggle(`completed`);
		e.target.classList.toggle('completed');
	} else if (e.target.matches(`.edit`)) {
		editTodo(e);
	} else if (e.target.matches(`.delete`)) {
		deleteTodo(e);
	}
};

const editTodo = (e) => {
	todoToEdit = e.target.closest(`li`);

	popupInput.value = todoToEdit.firstChild.textContent;
	popup.style.display = 'flex';
};

function closePopup() {
	popup.style.display = 'none';
	popupInfo.textContent = ``;
}

const changeTodoText = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value;
		popup.style.display = 'none';
		popupInfo.textContent = ``;
	} else {
		popupInfo.textContent = `Musisz podać jakąś treść`;
	}
};

const deleteTodo = (e) => {
	e.target.closest(`li`).remove();

	const allTodos = document.querySelectorAll(`li`);

	if (allTodos.length === 0) {
		errorInfo.textContent = 'Brak zadań!';
	}
};

const enterKeyCheck = (e) => {
	if(e.key==="Enter"){
		addNewToDo()
	}
	
}



document.addEventListener('DOMContentLoaded', main);
