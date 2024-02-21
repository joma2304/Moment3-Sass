"use strict";

import Chart from 'chart.js/auto';

const url = "https://studenter.miun.se/~mallar/dt211g/";
window.onload = init; //Anropa funktion när fönstert laddas

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

function displayCourse(data) {
    const course = data.filter(item => item.type === "Kurs"); //Filtrera efter kurs
    const courseSorted = course.sort((a, b) => b.applicantsTotal - a.applicantsTotal); //Sortera i fallande ordning 
    const MostAppliedCourses = courseSorted.slice(0, 6); //Välj 6 mest sökta
    const courseName = MostAppliedCourses.map(course => course.name); //Kursnamn
    const applicantsTotal = MostAppliedCourses.map(course => course.applicantsTotal); //Antal sökande
    createChart(courseName, applicantsTotal); // anropa funktion skapa diagram skicka med kursnamn och antal som argument
}

function displayProgram(data) {
    const program = data.filter(item => item.type === "Program"); //Filtrera efter program
    const sortedProgram = program.sort((a, b) => b.applicantsTotal - a.applicantsTotal); //Sortera i fallande ordning
    const mostAppliedProgram = sortedProgram.slice(0, 5);   //Välj 5 mest sökta
    const programName = mostAppliedProgram.map(program => program.name);    //Program namn
    const applicantsTotal = mostAppliedProgram.map(program => program.applicantsTotal); //Antal sökande
    createPieChart(programName, applicantsTotal); //Anropa funktion skapa piediagram skicka med porgramnamn och antal som argument
}

//Linjediagram
function createChart(labels, data) {
    const ctx = document.getElementById('chart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels, // Lägg till labels för x-axeln
            datasets: [{
                label: 'Totalt antal sökande',
                data: data,
                borderColor: 'lightgreen',
                backgroundColor: 'lightgreen',
                pointBackgroundColor: 'lightgreen',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                x: {
                    display: window.innerWidth >= 700, // Visa x-axeln om skärmbredden är större än eller lika med 700 px
                    maintainAspectRatio: false,
                    responsive: true,
                    ticks: {
                        color: 'lightgreen',
                        maxTicksLimit: 10,
                        autoSkipPadding: 10,
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    maintainAspectRatio: false,
                    responsive: true,
                    beginAtZero: true,
                    ticks: {
                        color: 'lightgreen'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'lightgreen'
                    }
                }
            }
        }
    });
}
//Doughnut diagram
function createPieChart(labels, data) {
    const ctx = document.getElementById('pieChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Totalt antal sökande',
                data: data,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
        
    });
}