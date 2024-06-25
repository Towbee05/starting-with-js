/* Javascript Difficult, omo */

const form = document.querySelector("form");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const generateBtn = document.querySelector(".generate-btn");
const alertBox = document.querySelector(".alert");
const timer = document.querySelector(".timer");
const countdownTime = document.querySelector(".timer .time")
const resetBtn = document.querySelector(".reset-btn");
const pauseBtn = document.querySelector(".pause-btn");
const stopBtn = document.querySelector(".stop-btn");
const htmlHour = document.querySelector(".hour");
const htmlMinute = document.querySelector(".minute");
const htmlSecond = document.querySelector(".second");

function getUserInput(time){
    let inputValue = time.value
    if (time.value === ``){
        inputValue = 0;
    }
    return inputValue;
}

generateBtn.addEventListener("click", (e) => {
    e.preventDefault()
    resetFlag = false;
    let hoursValue = getUserInput(hours);
    let minutesValue = getUserInput(minutes);
    let secondsValue = getUserInput(seconds);

    if (hoursValue === 0 && minutesValue === 0 && secondsValue  === 0){
        displayAlert("No value entered", "alert-danger");
    }
    else if (minutesValue >  60 || secondsValue > 60){
        displayAlert("Cannot be more than 60", "alert-danger")
    }
    
    else if (hoursValue < 0 || minutesValue < 0 || secondsValue <0){
        displayAlert("No negative number allowed", "alert-danger")
    }
    
    else{
        displayAlert("Countdown Started", "alert-success");
        const timeInterval = setInterval(() => {
            
            secondsValue = secondsValue - 1;
            minutesValue = parseInt(minutesValue);
            hoursValue = parseInt(hoursValue);
            // hoursValue = parseInt(hoursValue);
            if (secondsValue < 0){
                minutesValue = minutesValue - 1;
                secondsValue = 59;
            };
            if (minutesValue < 0){
                hoursValue--;
                minutesValue = 59;
            }
            if ((hoursValue <= 0 && minutesValue <= 0 && secondsValue <= 0) || (resetFlag === true)){
                clearInterval(timeInterval);
                // pauseBtn.disable()
            }
            

            secondsValue = lessThan10(secondsValue);
            minutesValue = lessThan10(minutesValue);
            hoursValue = lessThan10(hoursValue);
            
            console.log(secondsValue);
            insertTime(hoursValue, minutesValue, secondsValue);
            
        }, 1000)

        globalThis.timeInterval = timeInterval;
        
        timer.classList.add("show-timer");
        form.classList.add("hide-form");
        secondsValue = lessThan10(secondsValue);
        minutesValue = lessThan10(minutesValue);
        hoursValue = lessThan10(hoursValue);
        insertTime(hoursValue, minutesValue, secondsValue);
    }
})

function lessThan10(item){
    if (item < 10){
        return `0${item}`;
    }
    return item;
}
function displayAlert(text, className){
    alertBox.innerHTML = `${text}`;
    alertBox.classList.add(`${className}`);

    setTimeout(()=> {
        alertBox.innerHTML = ``;
        alertBox.classList.remove(`${className}`);
    }, 1000);
}

function insertTime(hour, minute, seconds){
    htmlHour.innerHTML = `${hour} :`;
    htmlMinute.innerHTML = `${minute} :`;
    htmlSecond.innerHTML = seconds;
}

function pauseTimer (){
    if (!pauseBtn.classList.contains("paused")){
        pauseBtn.innerHTML = `Resume timer`;
        pauseBtn.classList.add("paused");
        console.log("paused!!!");
        clearInterval(timeInterval);
        clearInterval(myNewInterval);
    }
    else{
        pauseBtn.innerHTML = `Pause timer`;
        console.log(htmlHour.innerHTML);
        let newHourValue = parseInt(htmlHour.innerHTML);
        let newMinuteValue = parseInt(htmlMinute.innerHTML);
        let newSecondValue = parseInt(htmlSecond.innerHTML);
        // console.log(newHourValue, newMinuteValue, newSecondValue);
        pauseBtn.classList.remove("paused");
        console.log("played!!!");
        
        if ((newHourValue <= 0 && newMinuteValue <= 0 && newSecondValue <= 0)){
            clearInterval(myNewInterval);
            // pauseBtn.disable()
        }
        else{
            const myNewInterval = setInterval (() => {
                
                newSecondValue = newSecondValue - 1;
                newMinuteValue = parseInt(newMinuteValue);
                newHourValue = parseInt(newHourValue);
                
                if (newSecondValue < 0){
                    newMinuteValue = newMinuteValue - 1;
                    newSecondValue = 59;
                };
                if (newMinuteValue < 0){
                    newHourValue--;
                    newMinuteValue = 59;
                }
    
                if ((newHourValue <= 0 && newMinuteValue <= 0 && newSecondValue <= 0)){
                    displayAlert("Time up!!!", "alert-success");
                    clearInterval(myNewInterval);
                    // pauseBtn.disable()
                }
                newSecondValue = lessThan10(newSecondValue);
                newMinuteValue = lessThan10(newMinuteValue);
                newHourValue = lessThan10(newHourValue);
                
                insertTime(newHourValue, newMinuteValue, newSecondValue);
                
            }, 1000)
            
            globalThis.myNewInterval = myNewInterval;
        }

    }
}

pauseBtn.addEventListener("click", () => {
    pauseTimer()
})

stopBtn.addEventListener("click", () => {
    pauseBtn.disabled = true;
    clearInterval(timeInterval);
    clearInterval(myNewInterval);
})

resetBtn.addEventListener("click", () => {
    timer.classList.remove("show-timer");
    form.classList.remove("hide-form");
    pauseBtn.disabled = false;
    pauseBtn.classList.remove("paused")
    pauseBtn.innerHTML = `Pause timer`
    clearInterval(timeInterval);
    clearInterval(myNewInterval);
})