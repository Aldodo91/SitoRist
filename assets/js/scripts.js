var xhttp = new XMLHttpRequest();
var tbody = document.querySelector("tbody");

xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    const categories = [
      "PRIMI",
      "SECONDI",
      "PIZZE",
      "ANTIPASTI",
      "CONTORNI",
      "Specialità del pizzaiolo",
      "DOLCI",
    ];
    const words = xhttp.responseText;

    words.split(/\r?\n/).map((row) => {
      var tr = document.createElement("tr");
      var tdm = document.createElement("td");
      var tdp = document.createElement("td");

      if (row === "") return;

      row.split("€").map((p, i) => {
        if (categories.includes(p)) {
          // Categoria del menu
          var trh = document.createElement("tr");
          var thh1 = document.createElement("th");
          var thh2 = document.createElement("th");

          thh1.textContent = p;
          thh1.classList.add("w80");
          thh2.textContent = "Prezzo";
          thh1.classList.add("lineogg");
          thh2.className += "linepre";
          trh.appendChild(thh1);
          trh.appendChild(thh2);
          tbody.appendChild(trh);
          return;
        } else if (!categories.includes(p) && i == 0) {
          // voce di menu del prodotto
          const regex = /[0-9]*/g; // prendi i numeri (gli allergeni)
          const divIt = document.createElement("div");
          const divEn = document.createElement("div");
          divIt.classList.add("it");
          divEn.classList.add("en");

          const divContainer = document.createElement("div");
          divContainer.classList.add("circleContainer");
          const itVoce = p.split("|")[0];
          const enVoce = p.split("|")[1];
          divIt.innerHTML = itVoce.split("*")[0]; // non mostrare gli allergeni nel menu
          enVoce &&
            (() => {
              divEn.innerHTML = enVoce.split("*")[0];
            })();
          tdm.appendChild(divIt);
          tdm.appendChild(divEn);
          tdm.appendChild(divContainer);

          let res = p.match(regex);
          res &&
            res.forEach((n) => {
              let span = document.createElement("span");
              span.textContent = n;
              span.classList.add("circle");
              span.classList.add(`a${n}`);
              n && divContainer.appendChild(span);
            });
        } else if (!categories.includes(p) && i == 1) {
          // voce di costo del prodotto
          const divCost = document.createElement("div");
          divCost.classList.add("prezzo");
          divCost.innerHTML = `€ ${p}`;
          tdp.appendChild(divCost);
        }
        if (tdm != "") {
          tr.appendChild(tdm);
          tr.appendChild(tdp);
          tbody.appendChild(tr);
        }
      });
    });
  }
};
xhttp.open("GET", "./Menu.txt", true);
xhttp.send();
