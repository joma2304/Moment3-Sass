"use strict";

//window.onload = getData();

const url = "https://studenter.miun.se/~mallar/dt211g/";
window.onload = init;

async function init() {
    try {
        // fetchanrop
        const response = await fetch(url);
        const data = await response.json(); 
        displayCourse(data);
        displayProgram(data);
    } catch (error) {
        // Visa felmeddelande vid fel
        console.error(error);
        document.getElementById("error").innerHTML = "<p>Kunde inte ladda data!</p>";
    }
}

function displayCourse() {
const course = data.filter(item => item.type === "kurs");
const courseSorted = course.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
const MostAppliedCourses = courseSorted.slice(0, 6);
const name = MostAppliedCourses.map (course => course.name);
const applicantsTotal = MostAppliedCourses.map(course => course.applicantsTotal);
}

function displayProgram() {

}