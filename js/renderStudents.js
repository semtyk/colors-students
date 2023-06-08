import { students } from "./data.js";   //импортируем массив студентов из другого файла

const renderStudents = (element, getListStudent) => {
    const studentsHtml = students
        .map((student, index) =>
            getListStudent(student, index)
        )
        .join("");

    element.innerHTML = studentsHtml;
    const deleteButtons = document.querySelectorAll(".delete-button");

    for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (event) => {
            // метод  stopPropogation останавливает всплытие вверх по дереву
            // то есть обработчики кликов на элементах выше по дереву не будут вызваны
            // то есть обработчик клика на элементе списка, который описан ниже в коде, не будет вызван
            event.stopPropagation();

            const index = deleteButton.dataset.index;

            students.splice(index, 1);

            renderStudents(listElement, getListStudentEdit);
        });
    }

    const studentsElements = document.querySelectorAll(".student");

    for (const student of studentsElements) {
        student.addEventListener("click", (e) => {
            const color = student.dataset.color;
            console.log(e);
            alert(`Любимый цвет: ${color}`);
        });
    }
};

export default renderStudents;