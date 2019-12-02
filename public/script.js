const colors = ['#027368', '#A7C8F2', '#F25116', '#0D0D0D'];
const canvas = document.getElementById('graphs');
const ctx = canvas.getContext('2d');

// Divs and Paragraphs that are used to edit values
const g1_1 = document.getElementById('g11');
const g1_2 = document.getElementById('g12');
const g1_3 = document.getElementById('g13');
const g1_4 = document.getElementById('g14');
const g1_info1 = document.getElementById('g1Info1');
const g1_info2 = document.getElementById('g1Info2');
const g1_info3 = document.getElementById('g1Info3');
const g1_info4 = document.getElementById('g1Info4');
const g2_1 = document.getElementById('g21');
const g2_2 = document.getElementById('g22');
const g2_3 = document.getElementById('g23');
const g2_4 = document.getElementById('g24');
const g2_info1 = document.getElementById('g2Info1');
const g2_info2 = document.getElementById('g2Info2');
const g2_info3 = document.getElementById('g2Info3');
const g2_info4 = document.getElementById('g2Info4');
const g3_1 = document.getElementById('g31');
const g3_2 = document.getElementById('g32');
const g3_3 = document.getElementById('g33');
const g3_4 = document.getElementById('g34');
const g3_info1 = document.getElementById('g3Info1');
const g3_info2 = document.getElementById('g3Info2');
const g3_info3 = document.getElementById('g3Info3');
const g3_info4 = document.getElementById('g3Info4');

const length = 150;

const api_key = 'http://localhost:3000/api';

var api_information;

var countQuestion1 = [];
var countQuestion2 = [];
var countQuestion3 = [];

var radian1 = [];
var radian2 = [];
var radian3 = [];

var countQuestion1Amount = 0;
var countQuestion2Amount = 0;
var countQuestion3Amount = 0;

fetch(api_key)
.then(response => response.json())
.then(promise_data => {
    api_information = promise_data;
    countInformation(api_information)
})
.catch(err => console.log(err));

const countInformation = (info) => {
    countQuestion1[0] = info.question1.Chris;
    countQuestion1[1] = info.question1.Dery;
    countQuestion1[2] = info.question1.Jeff;
    countQuestion1[3] = info.question1.Other;
    radian1 = getTotalInEachCategory(countQuestion1, countQuestion1Amount, info.question1);
    drawChart(radian1, 150);
    
    countQuestion2[0] = info.question2["To seek the Holy Grail"];
    countQuestion2[1] = info.question2["Eat all the pizza"];
    countQuestion2[2] = info.question2["Sleep n' stuff"];
    countQuestion2[3] = info.question2.Other;
    radian2 = getTotalInEachCategory(countQuestion2, countQuestion2Amount, info.question2);
    drawChart(radian2, 750);

    countQuestion3[0] = info.question3["Red"];
    countQuestion3[1] = info.question3["Green"];
    countQuestion3[2] = info.question3["Blue... No! Yel-AHHHHHHHHHHHHHHHHHHHHHHHHH"];
    countQuestion3[3] = info.question3.Other;
    radian3 = getTotalInEachCategory(countQuestion3, countQuestion3Amount, info.question3);
    drawChart(radian3, 1350);
};

// Draws the pie chart for question 1
const drawChart = (radians, x) => {
    let previousAnswer = 0;
    for (let i=0; i < 4; i++) {
        radian = (radians[i]*Math.PI)/180;
        
        // Makes sure that their is a value to graph
        if (radian != 0) {
            drawSlice(ctx, x, 150, 150, previousAnswer, previousAnswer + radian, colors[i]);
            previousAnswer = previousAnswer + radian;
        }
    }
};

// Figures out the spefic vaue needed to construct the pie chart and returns that values as an list
const getRadians = (data, counter) => {
    var list = [];
    list[0] = (data[0]/counter)*360;
    list[1] = (data[1]/counter)*360;
    list[2] = (data[2]/counter)*360;
    list[3] = (data[3]/counter)*360;
    return list;
};

const fillDivInfo = (list, total, questions) => {
    if (questions['Chris']) {
        g1_1.style.background = colors[0];
        g1_1.style.color = "#ffffff";
        g1_info1.innerHTML = `${Math.round((list[0]/total)*100)}&#37 Chris`;

        g1_2.style.background = colors[1];
        g1_2.style.color = "#000000";
        g1_info2.innerHTML = `${Math.round((list[1]/total)*100)}&#37 Dery`;

        g1_3.style.background = colors[2];
        g1_3.style.color = "#ffffff";
        g1_info3.innerHTML = `${Math.round((list[2]/total)*100)}&#37 Jeff`;
        
        g1_4.style.background = colors[3];
        g1_4.style.color = "#ffffff";
        g1_info4.innerHTML = `${Math.round((list[3]/total)*100)}&#37 Other`;
    } else if (questions["To seek the Holy Grail"]) {
        g2_1.style.background = colors[0];
        g2_1.style.color = "#ffffff";
        g2_info1.innerHTML = `${Math.round((list[0]/total)*100)}&#37 To seek the Holy Grail`;

        g2_2.style.background = colors[1];
        g2_2.style.color = "#000000";
        g2_info2.innerHTML = `${Math.round((list[1]/total)*100)}&#37 Eat all the pizza`;

        g2_3.style.background = colors[2];
        g2_3.style.color = "#ffffff";
        g2_info3.innerHTML = `${Math.round((list[2]/total)*100)}&#37 Sleep n' stuff`;
        
        g2_4.style.background = colors[3];
        g2_4.style.color = "#ffffff";
        g2_info4.innerHTML = `${Math.round((list[3]/total)*100)}&#37 Other`;
    } else {
        g3_1.style.background = colors[0];
        g3_1.style.color = "#ffffff";        
        g3_info1.innerHTML = `${Math.round((list[0]/total)*100)}&#37 Red`

        g3_2.style.background = colors[1];
        g3_2.style.color = "#000000";
        g3_info2.innerHTML = `${Math.round((list[1]/total)*100)}&#37 Green`

        g3_3.style.background = colors[2];
        g3_3.style.color = "#ffffff";
        g3_info3.innerHTML = `${Math.round((list[2]/total)*100)}&#37 Blue... No! Yel-AHHHHHHHHHHHHHHHHHHHHHHHHH`
        
        g3_4.style.background = colors[3];
        g3_4.style.color = "#ffffff";
        g3_info4.innerHTML = `${Math.round((list[3]/total)*100)}&#37 Other`
    }
};

// Counts the total in each category
const getTotalInEachCategory = (data, counter, questions) => {
    data.forEach(d => counter += d);
    fillDivInfo(data, counter, questions);
    return getRadians(data, counter);
};

const drawSlice = (ctx, cX, cY, r, sA, eA, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cX, cY);
    ctx.arc(cX, cY, r, sA, eA);
    ctx.closePath();
    ctx.fill();
};