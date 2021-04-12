var text = document.querySelector('div#text');
var info = document.querySelector('div#info');
let form = document.querySelector('form');
let submitBtn = form.querySelector('button[type=submit]');
let select = form.querySelector('select[name=book]');
let selectChapt = form.querySelector('select[name=chapter]')

let options = select.options;


let prev = document.querySelector('prev');
let next = document.querySelector('next');

let allBtns = document.querySelectorAll('button')

allBtns.forEach(function(btn){
    btn.onclick = () =>{
        if(btn.dataset.href){
            window.location.href = btn.dataset.href
        }
    }
})

let params = decodeURI(window.location.search.substr(1));  

if (params == "") { 
    if('params' in localStorage){
        window.location.href = window.location.href+localStorage.getItem("params")
    }else{
        window.location.href = window.location.href+"?book=gênesis&chapter=1"
    }
}else if(params == 'i=1'){
    window.location.href = window.location.href+"?book=gênesis&chapter=1"
}

 // salva ultimo texto lido
localStorage.setItem("params", `?${params}`);


let bookRegex = /(?<=book\=)(?:\d%2B[a-zA-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑáàâãéèêíïóôõöúçñ]*|[a-zA-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑáàâãéèêíïóôõöúçñ]*)/gm
let chapterRegex = /(?<=chapter\=)[0-9]*/gm

let selectedBook = params.match(bookRegex)[0].replaceAll('%2B','+');
let selectedChapter = params.match(chapterRegex)[0].replaceAll('%2B','+');

let bookTitle = selectedBook.replace('+', ' ')


function getBibleBooks(){

    
let request = new Request('src/books.json', {
    method: 'GET',
});

fetch(request).then(function(response) { return response.text() }).then(function(response){
    response = JSON.parse(response)
    let option = document.createElement('option');

        
    if(response['msg']){
        select.appendChild(option);
        option.value = "Erro";
        option.innerText = "erro";
        text.innerHTML = "Ocorreu um erro, tente novamente mais tarde";
    }else{

        // tudo certo

            
        

        response.forEach(function(item){ 
         
                
            let option = document.createElement('option'); 
            item['name'] = item['name'].trim();
            option.value = item['name'].toLowerCase().replaceAll('º','+').replaceAll('ª','+').replaceAll('+ ','+').replaceAll('lamentações de jeremias', 'lamentações');

            option.innerHTML = `${item['name']} (${item['chapters']})`;

            option.dataset.author = item['author'];
            option.dataset.group = item['group'];
            option.dataset.chapters = item['chapters'];
            option.dataset.abbrev = item['abbrev']['pt']
                
            select.appendChild(option)


        });


        for(let i = 0; i <= options.length; i++){
            let option = options[i];


            // selecionado o livro do parametro
            if(option.value == selectedBook){
                option.selected = true;
                 // mostra quantia de capitulos
                 if(option.selected == true){
                    let selectChaptEl = document.createElement('select');
                    selectChaptEl.classList.add("form-control");
                    selectChaptEl.name = "chapter"

                    let numChapters = option.dataset.chapters
                    next.appendChild(selectChaptEl);


                    for(let chapter_i = 1; chapter_i <= numChapters; chapter_i++){
                        let chaptersEl = document.createElement('option');

                        chaptersEl.value = chapter_i
                        chaptersEl.dataset.number = chapter_i
                        chaptersEl.innerHTML = `${chapter_i}`

                        if(chaptersEl.value == selectedChapter){
                            chaptersEl.selected = true;
                        }

                        // verifica se o primeiro select carregou
                        if(document.readyState == 'complete'){
                            selectChaptEl.appendChild(chaptersEl);
                            changeBook();

                        }

                    } 
                    getBibleText(selectedChapter, numChapters);
                }
            }else{
                option.selected = false;
            }
              

             // selecionado o livro do parametro

            if(option.value == selectedBook){
                option.selected = true;                    
            }else{
                option.selected = false;
            }

        }
             


    } // tudo certo
        
});

}

function getBibleText(chapter, quantity) {
    let books = document.querySelectorAll('select[name=book] option')
        

    book = ''
    books.forEach(function(book){

        if(book.selected == true) {
            info.innerHTML = `<h1>${bookTitle} ${selectedChapter}</h1><h3>| Livro: ${book.dataset.group}</h3><h3>| Autor: ${book.dataset.author}</h3>`

            let url = `https://bible-api.com/${book.value}+${chapter}?translation=almeida`;

            let request = new Request(`${url}`, {
                method: 'GET',
            });

            fetch(request).then(function(response) { return response.text() }).then(function(response){
                response = JSON.parse(response)

                 
                let verses = response['verses']
                let i = 0;

                verses.forEach(function(verse){
                        
                    verse['text'] = verse['text'].replaceAll(/Deus|Deus /gi, ' Yauh (יהוה) ').replaceAll(' deus ', ' eterno ').replaceAll(' Senhor ', ' altíssimo ').replaceAll(' puro ',' limpo ').replaceAll(' misericórdia ', ' compaixão ').replaceAll(',]', ']').replaceAll('"','ˮ').replaceAll('  ','"').replaceAll(' cruz ',' madeiro ').replaceAll(' Cruz ', ' madeiro ').replaceAll(/amém/gi, ' assim seja ').replaceAll(' batismo ', ' imersão ').replaceAll(' vitória ',' conquista ').replaceAll(' misericordioso ',' benevolente ').replaceAll('.','. ').replaceAll('!','! ').replaceAll(' Amém ',' Assim seja ').replaceAll('?', '? ').replaceAll(' pausa ','  ').replaceAll(' Pausa ', '  ').replaceAll(' broquel ', ' couraça ').replaceAll("senhor", "criador").replaceAll(' todo-poderoso ',' onipotente ').replaceAll(' Todo-poderoso ',' onipotente ').replaceAll(' Todo-Poderoso ',' onipotente ').replaceAll(' laço do passarinho ', ' laço do caçador ').replaceAll(' Judá ',' Yaudah ').replaceAll(' judá ', ' yaudah ').replaceAll(' David ',' Davi ').replaceAll(/Jesus|Jesus /gi,' Yausha (יהושע) ').replaceAll(' JESUS ',' YAUSHA (יהושע) ').replaceAll(' Jesus Cristo ',' Yausha (יהושע) ').replaceAll(' Cristo ',' Yausha (יהושע) ').replaceAll(/Cristo|Cristo /gi,'Yausha (יהושע)').replaceAll(' EMANUEL ',' YAUSHA (יהושע) ').replaceAll(' mui ',' muito ').replaceAll(' muitoto ',' muito ').replaceAll(' muimuito ',' muito ').replaceAll(/(\bgraça\b|\bgraças\b)/ig, ' benevolência ').replaceAll(' batismo ',' imersão ').replaceAll(/(\bglória\b|\bglórias\b)/ig,' grandeza ').replaceAll(/vitória/ig,' conquista ').replaceAll(' justiça ',' honra ').replaceAll(/libertação/ig,' salvação ').replaceAll(/luz/ig,' claridade ').replaceAll(/dia/gi, ' tempo ').replaceAll(/noite/gi,' fim de tarde ').replaceAll(/pai eterno/gi,'YAUH (יהוה)').replaceAll(' ç rei ', 'YAUH (יהוה)').replaceAll(/israel/gi,'Yaushalaim (Israel)').replaceAll(' muitotas ',' muitas ').replaceAll(' áspide ',' víbora ').replaceAll(' da fim de tarde ',' do fim de tarde ').replaceAll(' a seta que voe de tempo ',' a seta que voe de dia ').replace(', e da peste perniciosa','  que se ocupa em destruir ').replaceAll('Yausha (יהושע) Yausha (יהושע)', 'Yausha (יהושע)')

                    i++;
                    text.innerHTML += `<sub>${i}</sub> ${verse['text']}<br>`
                        
                })

                let sub = document.querySelectorAll("sub")
                info.innerHTML += `<h3>| ${sub.length} versículos</h3>`
                    
                copyEscrituras();
                nextPage();

            })
                
        }
    });

}

function changeBook(){
    try{
        let nextSelect = document.querySelector("#center > form > next > select")
            
        select.onchange = function(){
            let optionsNext = nextSelect.childNodes

                optionsNext.forEach(function(optionNext){
                    if(optionNext.value == "1"){
                        optionNext.selected = true;
                    }else{
                        optionNext.selected = false;
                    }
                })

                submitBtn.click();  
        }

        nextSelect.onchange = function(){
            submitBtn.click();            
        }
    }catch(e){
        submitBtn.style.display = 'block';
    }
}

function copyEscrituras() {
    let textareaEl = document.querySelector('textarea[name=escrituras]');
    textareaEl.style.display = 'block';
    textareaEl.value = `${info.innerText}\n`
    textareaEl.value += text.innerText
        
    let copyBtn = document.querySelector('a[name=copy]')
    copyBtn.onclick = function() {
        textareaEl.select();
        document.execCommand('copy');
        textareaEl.style.display = 'none';
        Swal.fire({
            icon: 'success',
            title:'Copiado!',

            showConfirmButton: false,
            showDenyButton: false,
            showCancelButton: false,
        })

    }
}

function nextPage(){
    let nextBtn = document.querySelector('a[name=proximo]');
    let prevBtn = document.querySelector('a[name=anterior]');

    let nextSelect = document.querySelector("#center > form > next > select").childNodes

    // botao anterior
    prevBtn.onclick = function(){
        nextSelect.forEach(function(option){     
            option.value = parseInt(option.value);
            if(option.selected == true) {
                if(option.value > 1){
                    option.value = parseInt(option.value) - 1;
                    submitBtn.click();  
                }else{
                    // muda livro
                    select.childNodes.forEach(function(item){
                        if(item.selected == true){
                            item.value = item.previousElementSibling.value;
                            option.value = item.previousElementSibling.dataset.chapters
                            submitBtn.click();
                        }
                    });
                }
            }
        })
    }

    // botao proximo
    nextBtn.onclick = function(){
        nextSelect.forEach(function(option){     
            option.value = parseInt(option.value);
            if(option.selected == true) {
                if(option.value < nextSelect.length){
                    option.value = parseInt(option.value) + 1;
                    submitBtn.click();  
                }else{
                    // muda livro
                    select.childNodes.forEach(function(item){
                        if(item.selected == true){
                            option.value = 1;
                            item.value = item.nextElementSibling.value;
                            submitBtn.click();
                        }
                    });
                }
            }
        })
    }
}
    
window.onload = function(){
    getBibleBooks();
    changeBook();
}