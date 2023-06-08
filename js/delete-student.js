'use strict'

import { getListStudentEdit } from "./list-student.js";     //импортируем callback функцию для функции renderStudents
import renderStudents from "./renderStudents.js";           //импортируем render функцию

const listElement = document.getElementById("list");




renderStudents(listElement, getListStudentEdit);
