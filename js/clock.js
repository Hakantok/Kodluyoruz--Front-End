
let username = prompt("Adiniz nedir?");

let myName = document.querySelector("#myName");

myName.innerHTML = `${username}`;


function showTime() {

    let tarih = new Date();

    let hours = tarih.getHours();
    let minutes = tarih.getMinutes();
    let seconds = tarih.getSeconds();
    
    let days = ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
    let dayName = days[tarih.getDay()];
    


    let myClock = document.querySelector("#myClock");

    myClock.innerHTML = `${hours}:${minutes}:${seconds} ${dayName}`;
}

setInterval(showTime,500);







