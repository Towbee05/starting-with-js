import data from "./data.js";

const getElement = (element) => {
    return document.querySelector(element)
}; 

const form = getElement("form");
const container = getElement(".question");
const btn = getElement('.btn');
const quiz = getElement(".quiz");

form.addEventListener("submit", (e) =>{
    e.preventDefault()
})

const allData = data.map((datum) => {
    const {
        id, 
        question, 
        answer:answers, 
        true_answer:correct} = datum

    return `
    <article class ="quiz">
        <div class="question-text">
            <label for="${question}" > ${id}. ${question} </label>
        </div>
        <div class="answer-text">
        ${answers.map((answer) => {
            return `
            <input type="radio" name="${question}" id="${id}-${question}-${answer}" class="answer">
            <label for="${id}-${question}-${answer}"> ${answer} </label>
            <br>
            `
        }).join("")
        }
                    
        </div>
    </article>
    `
});

container.innerHTML = allData.join("");

container.addEventListener("click", (e) => {
    console.log(e.target);
})
console.log(quiz);