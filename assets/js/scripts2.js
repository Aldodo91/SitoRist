const makeItStrong = (p) => {
  const firstSlashIndex = p.indexOf("/");
  const lastSlashIndex = p.lastIndexOf("/");
  if (firstSlashIndex <= 0) {
    return `<p>${p}</p>`;
  }
  const textBetweenSlashes = p.substring(
    firstSlashIndex + 1,
    p.indexOf("/", firstSlashIndex + 1),
  );
  const textBeforeFirstSlash = p.substring(0, firstSlashIndex);
  // console.log(textBeforeFirstSlash, textBetweenSlashes);
  const restOfString = p.substring(lastSlashIndex + 1, p.length);

  return `<strong>${textBeforeFirstSlash}</strong> <i>${textBetweenSlashes}</i> ${restOfString}`;
};
setTimeout(() => {
  var xhttp = new XMLHttpRequest();
  var tbodymenuVini = document.getElementById("menuVini");

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const categories = [
        "Vini Rossi",
        "Vini Bianchi",
        "Vini Rose",
        "Champagne & Spumanti",
        "Bar & Aperitivi",
        "Vini a Calice",
        "Vini passiti - muffati e liquorosi",
      ];
      const words = xhttp.responseText;

      words.split(/\r?\n/).map((row) => {
        var tr = document.createElement("tr");
        var tdm = document.createElement("td");
        var tdp = document.createElement("td");
        if (row === "") return;

        row.split("€").map((p, i) => {
          if (categories.includes(p)) {
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
            menuVini.appendChild(trh);
            return;
          } else if (!categories.includes(p) && i == 0) {
            // voce di menu
            tdm.innerHTML = makeItStrong(p);
          } else if (!categories.includes(p) && i == 1) {
            // voce di costo
            tdp.style.textAlign = "center";
            tdp.textContent = `€ ${p}`;
          }

          if (tdm !== "") {
            tr.appendChild(tdm);
            tr.appendChild(tdp);
            menuVini.appendChild(tr);
          }
        });
      });
    }
  };
  xhttp.open("GET", "./Vini.txt", true);
  xhttp.send();
}, 2000);
