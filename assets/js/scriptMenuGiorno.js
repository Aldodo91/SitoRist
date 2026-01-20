const tbodymenuCiboG = document.getElementById("menuCiboG");

fetch("./PiattiDelGiorno.txt")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Errore nel caricamento del file");
    }
    return response.text();
  })
  .then((text) => {
    const categories = ["PIATTI DEL GIORNO"];

    text.split(/\r?\n/).forEach((row) => {
      if (row === "") return;

      const tr = document.createElement("tr");
      const tdm = document.createElement("td");
      const tdp = document.createElement("td");

      row.split("€").forEach((p, i) => {
        if (categories.includes(p)) {
          // Categoria del menu
          const trh = document.createElement("tr");
          const thh1 = document.createElement("th");
          const thh2 = document.createElement("th");

          thh1.textContent = p;
          thh1.classList.add("w80", "lineogg");
          thh2.textContent = "Prezzo";
          thh2.classList.add("linepre");

          trh.appendChild(thh1);
          trh.appendChild(thh2);
          tbodymenuCiboG.appendChild(trh);
          return;
        }

        if (!categories.includes(p) && i === 0) {
          // Voce del menu
          const regex = /[0-9]*/g;

          const divIt = document.createElement("div");
          const divEn = document.createElement("div");
          divIt.classList.add("it");
          divEn.classList.add("en");

          const divContainer = document.createElement("div");
          divContainer.classList.add("circleContainer");

          const itVoce = p.split("|")[0];
          const enVoce = p.split("|")[1];

          divIt.innerHTML = itVoce.split("*")[0];
          if (enVoce) {
            divEn.innerHTML = enVoce.split("*")[0];
          }

          tdm.appendChild(divIt);
          tdm.appendChild(divEn);
          tdm.appendChild(divContainer);

          const res = p.match(regex);
          res &&
            res.forEach((n) => {
              if (!n) return;
              const span = document.createElement("span");
              span.textContent = n;
              span.classList.add("circle", `a${n}`);
              divContainer.appendChild(span);
            });
        }

        if (!categories.includes(p) && i === 1) {
          // Prezzo
          const divCost = document.createElement("div");
          divCost.classList.add("prezzo");
          divCost.innerHTML = `€ ${p}`;
          tdp.appendChild(divCost);
        }
      });

      if (tdm.textContent !== "") {
        tr.appendChild(tdm);
        tr.appendChild(tdp);
        tbodymenuCiboG.appendChild(tr);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });

setTimeout(() => {
  document.getElementById("buttonPiattiGiorno").click();
}, 500);
