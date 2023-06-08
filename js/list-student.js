//экспортируем callback функции из этого файла
const getListStudentEdit = (student, index) => {
    return `
          <li class="student" data-color="${student.color}">
            <p class="student-name">
              ${student.name}
            </p>
            <button data-index="${index}" class="button delete-button">Удалить</button>
          </li>`;
}

const getListStudentNonEdit = (student, index) => {
    return `
          <li class="student" data-color="${student.color}">
            <p class="student-name">
              ${student.name}
            </p>
          </li>`;
}

export { getListStudentEdit, getListStudentNonEdit }