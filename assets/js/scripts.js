var xhttp = new XMLHttpRequest();
var tbody = document.querySelector("tbody");

xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    const words = xhttp.responseText;
    console.clear();

    words.split(/\r?\n/).map((row) => {
      var tr = document.createElement("tr");
      var tdm = document.createElement("td");
      var tdp = document.createElement("td");

      if (row === "") return;

      row.split("€").map((p, i) => {
        if (
          p == "PRIMI" ||
          p == "SECONDI" ||
          p == "PIZZE" ||
          p == "ANTIPASTI" ||
          p == "CONTORNI"
        ) {
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
        } else if (
          !(
            p == "PRIMI" ||
            p == "SECONDI" ||
            p == "PIZZE" ||
            p == "ANtiPASTI" ||
            p == "CONTORNI"
          ) &&
          i == 0
        ) {
          // voce di menu
          const regex = /[0-9]*/g;
          console.log(p);
          const divIt = document.createElement("div");
          const divEn = document.createElement("div");
          divIt.classList.add("it");
          divEn.classList.add("en");

          const divContainer = document.createElement("div");
          divContainer.classList.add("circleContainer");
          const itVoce = p.split("|")[0];
          const enVoce = p.split("|")[1];
          divIt.innerHTML = itVoce.split("(")[0];
          enVoce &&
            (() => {
              divEn.innerHTML = enVoce.split("(")[0];
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
        } else if (
          !(
            p == "PRIMI" ||
            p == "SECONDI" ||
            p == "PIZZE" ||
            p == "ANtiPASTI" ||
            p == "CONTORNI"
          ) &&
          i == 1
        ) {
          // voce di costo
          tdp.classList.add("prezzo");
          tdp.textContent = `€ ${p}`;
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

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: "en" },
    "google_translate_element"
  );
}
