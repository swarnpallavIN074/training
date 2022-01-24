let flag = 0;
btn.addEventListener('click', function () {
    
    if (flag == 0) {
        
        flag = 1;

        window.history.pushState(history.state, document.title, window.location.href);

        newElement = document.createElement('button');
        newElement.innerText = 'Click Me to make me vanish';
        newbtn.appendChild(newElement)

        window.onpopstate = function () {
            if(flag == 1)
            newbtn.removeChild(newElement);
            flag = 0;
        };

        newElement.addEventListener('click', function () {
            history.go(-1);
        })
    }
})


