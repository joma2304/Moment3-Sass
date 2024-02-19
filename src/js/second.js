"use strict";

import Chart from 'chart.js/auto';

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

function displayCourse(data) {
    const course = data.filter(item => item.type === "Kurs");
    const courseSorted = course.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    const MostAppliedCourses = courseSorted.slice(0, 6);
    const courseName = MostAppliedCourses.map(course => course.name);
    const applicantsTotal = MostAppliedCourses.map(course => course.applicantsTotal);
    createChart(courseName, applicantsTotal);
}

function displayProgram(data) {
    const program = data.filter(item => item.type === "Program");
    const sortedProgram = program.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    const mostAppliedProgram = sortedProgram.slice(0, 5);
    const programName = mostAppliedProgram.map(program => program.name);
    const applicantsTotal = mostAppliedProgram.map(program => program.applicantsTotal);
    createPieChart(programName, applicantsTotal);
}


function createChart(labels, data) {
    const ctx = document.getElementById('chart').getContext('2d');

    new Chart(ctx, {
        type: 'line',
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