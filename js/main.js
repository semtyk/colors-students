'use strict'
import { students } from "./data.js";   //импортируем массив студентов из другого файла
import { getListStudentEdit } from "./list-student.js";     //импортируем callback функцию для функции renderStudents
import renderStudents from "./renderStudents.js";           //импортируем render функцию
const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const colorInputElement = document.getElementById("color-input");

// const students = [
//     {
//         name: "Глеб",
//         color: "#ff2600"
//     },
//     {
//         name: "Иван",
//         color: "#00f900"
//     },
//     {
//         name: "Люси",
//         color: "#0432ff"
//     }
// ];

renderStudents(listElement, getListStudentEdit);

buttonElement.addEventListener("click", () => {
    nameInputElement.classList.remove("input-error");

    if (nameInputElement.value === "") {
        nameInputElement.classList.add("input-error");
        return;
    }

    students.push({
        name: nameInputElement.value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;"),
        color: colorInputElement.value
    });

    renderStudents(listElement, getListStudentEdit);

    nameInputElement.value = "";
});