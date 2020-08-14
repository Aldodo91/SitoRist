
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


            row.split('€').map((p, i) =>
            {
                if ((p == "PRIMI" || p == "SECONDI" || p == "CONTORNI") && i == 0)
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
                else if (!(p == "PRIMI" || p == "SECONDI" || p == "CONTORNI") && i == 0)
                {
                    tdm.textContent = p
                }
                else if (!(p == "PRIMI" || p == "SECONDI" || p == "CONTORNI") && i == 1)
                {
                    tdp.textContent = `€ ${p}`
                }
                console.log(p);
                if (tdm != "")
                {
                    tr.appendChild(tdm)
                    tr.appendChild(tdp)
                    tbody.appendChild(tr)
                }
                else
                {
                    console.log('tdm e vuoto')
                }

            })




        })


    }
};
xhttp.open("GET", "./test.txt", true);
xhttp.send();
console.log('mandato')