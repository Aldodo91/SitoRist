
var xhttp = new XMLHttpRequest();
var tbody = document.querySelector('tbody')

xhttp.onreadystatechange = function ()
{
    if (this.readyState == 4 && this.status == 200)
    {
        const words = xhttp.responseText


        words.split(/\r?\n/).map((row) =>
        {
            var tr = document.createElement('tr')
            var tdm = document.createElement('td')
            var tdp = document.createElement('td')

            console.log(row);

            row.split('€').map((p, i) =>
            {
                if ((p == "PRIMI" || p == "SECONDI" || p == "PIZZE" || p == "ANTIPASTI"))
                {
                    var trh = document.createElement('tr')
                    var thh1 = document.createElement('th')
                    var thh2 = document.createElement('th')

                    thh1.textContent = p
                    thh2.textContent = "Prezzo"
                    thh1.className += "lineogg"
                    thh2.className += "linepre"
                    trh.appendChild(thh1)
                    trh.appendChild(thh2)
                    tbody.appendChild(trh)
                    return
                }
                else if (!(p == "PRIMI" || p == "SECONDI" || p == "PIZZE" || p == "ANtiPASTI") && i == 0)
                {
                    // voce di menu
                    tdm.textContent = p
                }
                else if (!(p == "PRIMI" || p == "SECONDI" || p == "PIZZE" || p == "ANtiPASTI") && i == 1)
                {
                    // voce di costo 
                    tdp.textContent = `€ ${p}`
                }
                if (tdm != "")
                {
                    tr.appendChild(tdm)
                    tr.appendChild(tdp)
                    tbody.appendChild(tr)
                }

            })




        })


    }
};
xhttp.open("GET", "./Menu.txt", true);
xhttp.send();
console.log('mandato')


function googleTranslateElementInit()
{
    new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
}
