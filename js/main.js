import { deleteTodos, getTodos, postTodos } from "./api.js";
import { renderLoginComponents } from "./components/login-components.js";
import { format } from "date-fns";

let token;
token = null;

let tasks = [];

const fetchTodosAndRender = () => {

    return getTodos(token).then((responseData) => {
            tasks = responseData.todos;
            renderApp();
        });
    // .catch((error) => {
    //     switch (error.message) {

    //         case 'неверный пароль':
    //             //alert('Сервер сломался, попробуй позже');
    //             //console.log('Сервер сломался, попробуй позже');
    //             password = prompt('Введите верный пароль');
    //             fetchTodosAndRender();

    //             break;
    //         default:
    //             break;
    //     }
    // });
};

const renderApp = () => {
    const appElement = document.getElementById('app');
    if (!token) {
        renderLoginComponents(appElement, (newToken) => {
            token = newToken;
        }, fetchTodosAndRender);
        return;
    }

    const tasksHtml = tasks
        .map((task) => {
            const createDate = format(new Date(task.created_at), 'yyyy/dd/MM hh:mm');
            return `
                    <li class="task">
                        <p class="task-text">
                            ${task.text} Создал: ${task.user?.name ?? 'Неизвестно'} 
                            <button data-id="${task.id}" class="button delete-button">Удалить</button>
                            <p><i>Задача создана: ${createDate}</i></p>
                        </p>
          </li >`;
        })
        .join("");

    const appHtml = `
        <h1>Список задач</h1>
            <ul class="tasks" id="list">
                <!-- Список рендерится из JS —-->
                ${tasksHtml}
            </ul>

            <br />
            <div class="form">
                <h3 class="form-title">Форма добавления</h3>
                <div class="form-row">
                    Что нужно сделать:
                    <input type="text" id="text-input" class="input" placeholder="Выпить кофе" />
                </div>
                <br />
                <button class="button" id="add-button">Добавить</button>
            </div>`;

    appElement.innerHTML = appHtml;

    const buttonElement = document.getElementById("add-button");
    const textInputElement = document.getElementById("text-input");

    const deleteButtons = document.querySelectorAll(".delete-button");

    for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();

            const id = deleteButton.dataset.id;

            // Подписываемся на успешное завершение запроса с помощью then
            deleteTodos(token, id).then((responseData) => {
                    // Получили данные и рендерим их в приложении
                    tasks = responseData.todos;
                    renderApp();
                });

            renderApp();
        });
    }

    buttonElement.addEventListener("click", () => {
        if (textInputElement.value === "") {
            return;
        }

        buttonElement.disabled = true;
        buttonElement.textContent = "Задача добавляется...";

        // Подписываемся на успешное завершение запроса с помощью then
        postTodos({text: textInputElement.value, token}).then(() => {
                textInputElement.value = "";
            })
            .then(() => {
                return fetchTodosAndRender();
            })
            .then(() => {
                buttonElement.disabled = false;
                buttonElement.textContent = "Добавить";
            })
            .catch((error) => {
                console.log(error);
                alert("Кажется, у вас проблемы с интернетом, попробуйте позже");
                buttonElement.disabled = false;
                buttonElement.textContent = "Добавить";
            });

        renderApp();
    });

};

renderApp();