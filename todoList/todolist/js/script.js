
const listDOM = document.querySelector('#list') // id'si list olan ul bilgisini aldik.
const inputDOM = document.querySelector('#task') // id'si task olan input bilgisini aldik.
let allliDom = document.querySelectorAll('li') // tüm li bilgilerini aldik.

// Carpı iconu
const closeIcon = `<span class="close" onclick="deleteTask(parentNode)" aria-label="Close" aria-hidden="true">&times;</span>`;

// En basta html icerisinde olan li'lerin hepsine carpi iconu ekledik.
allliDom.forEach (e => {e.addEventListener('click', toggleTask); e.innerHTML += `${closeIcon}`})

// Yeni task ekleme fonksiyonu
function newElement() {
    if(inputDOM.value.length > 0 && !(inputDOM.value.trim().length === 0)){ // Eger yazdıgımız task bos degilse ve bosluk yoksa
        let liDOM = document.createElement('li') // liDOM adında yeni bir li oluşturduk
        listDOM.append(liDOM) // listDOM icerisine liDOM u gönderdik
        $('.success').toast('show') // islemin basarılı olduguna dair bildirim yapmasını sagladık
        liDOM.innerHTML = `${inputDOM.value}${closeIcon}` // liDOM un innerHTML'ine yazdıgımız task'ın text ini ekledik ve yanına carpı iconunu ekledik
        liDOM.addEventListener('click', toggleTask) // liDOM üzerine tıklandıgı zaman toggleTask foksiyonunun calismasini istedik
        addStorage() // yeni bir Localstorage olusturacak fonksiyonu gider
    }
    else{
        $('.error').toast('show') // if icerisinde belirttigimiz sartı saglamadıgı icin error bildirimi verir
        inputDOM.value = "" // yazdıgımız task inputunun icerisini sıfırlar
    }
    inputDOM.value = "" // yazdıgımız task inputunun icerisini sıfırlar
}

function allDOM() { // Elimizdeki tüm tasklara erişebilecegimiz fonksiyon
    let newTask = JSON.parse(localStorage.getItem('newTask')) // newTask icerisindekileri Array'a cevirip getirmesini istedik
    newTask.forEach((e, index) => { // newTask icerisindeki bilgileri almak icin forEach kullandık. Burada e bize text bilgisini index ise Array'in numarasını verir
        let liDOM = document.createElement('li') // liDOM adında yeni bir li olusturmasını istedik
        listDOM.append(liDOM) // listDOM icerisine liDOM u gönderdik
        liDOM.innerHTML = newTask[index] // liDOM un innerHTML ine index numarasına göre newTask'in text ini esitledik
        liDOM.innerHTML += `${closeIcon}` // yukarda text eklemistik simdide yanına carpi iconunu ekledik
        liDOM.addEventListener('click', toggleTask) // liDOM üzerine tıklandıgı zaman toggleTask foksiyonunun calismasini istedik
    })
}

function newLocal() { // Eger elimizde bir Localstorage yok ise olusturmasını saglayan fonksiyon
    let newTask = JSON.parse(localStorage.getItem('newTask')) // newTask icerisindekileri Array'a cevirip getirmesini istedik 
    if(!newTask) { // newTask yoksa if icerisine girer
        newTask = [] // yeni bir newTask Array'i olusturur
    }
    localStorage.setItem('newTask', JSON.stringify(newTask)) // newTask icerisindeki bilgileri String'e cevirip ekler
}

function addStorage() { // Yeni bir Localstorage olusturan fonksiyon
    let newTask = JSON.parse(localStorage.getItem("newTask")) // newTask icerisindekileri Array'a cevirip getirmesini istedik
    newTask.push(`${inputDOM.value}`) // newTask icerisine yazdıgımız Task'in text ini gönderdik
    localStorage.setItem('newTask', JSON.stringify(newTask)) // newTask icerisindeki bilgileri String'e cevirip ekledik 
}

function eraseLocal(erase) { // Localstorage'dan istenilen bilgiyi silen fonksiyon
    let newTask = JSON.parse(localStorage.getItem('newTask')) // newTask icerisindekileri Array'a cevirip getirmesini istedik
    if(newTask.includes(erase.firstChild.textContent) == true) { // silmemizi istenilen erase'in newTask icerisinde olup olmadıgına baktık
        let getIndex = newTask.findIndex(e => // getIndex icerisine istenilen erase'in index numarasını ekledik
                e == erase.firstChild.textContent // erase'in text bilgisini e'nin icerisine ekledik
            )
            newTask.splice(getIndex, 1) // newTask icerisinde verilen erase'in index numarısındaki bilgiyi sildik
            localStorage.setItem('newTask', JSON.stringify(newTask)) // newTask icerisindeki bilgileri String'e cevirip ekledik 
    }
}

function toggleTask() { // Taskler üzerine tıkladıgı zaman üzerinin cizilmesini ve tik olmasını saglayan fonksiyon
    this.classList.toggle("checked") // tik olup üzerinin cizilmesini saglar
}

function deleteTask(erase) { // Task silme fonksiyonu
    erase.remove() // erase olarak gelen bilgiyi siler
    eraseLocal(erase) // erase olarak verilen bilgiyi Localstorage'dan silmek icin fonksiyona gider
}

newLocal() // Eger herhangi bir Localstorage yoksa eklenmesini saglayan fonksiyona gider
allDOM() // Localstorage ile kaydettigimiz bilgilerin ve eski bilgilerin tamamını bize geri getiren fonksiyon
