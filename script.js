document.addEventListener("DOMContentLoaded", function () {
    let voitures = JSON.parse(localStorage.getItem("voitures")) || [];

    const voituresContainer = document.getElementById("voitures-container");
    const modalLien = document.getElementById("modal-lien");
    const modalFicheLien = document.getElementById("modal-fiche-lien");
    const inputLien = document.getElementById("input-lien");
    const inputFicheLien = document.getElementById("input-fiche-lien");
    const validerLien = document.getElementById("valider-lien");
    const validerFicheLien = document.getElementById("valider-fiche-lien");
    const closeModals = document.querySelectorAll(".close-modal");
    let currentIndex = null;
    let currentFicheIndex = null;

    function sauvegarderVoitures() {
        localStorage.setItem("voitures", JSON.stringify(voitures));
    }

    function afficherVoitures() {
        voituresContainer.innerHTML = "";
        voitures.forEach((voiture, index) => {
            const div = document.createElement("div");
            div.classList.add("voiture");

            div.innerHTML = `
                <input type="file" accept="image/*" onchange="changerImage(event, ${index})">
                <img src="${voiture.image || 'default.jpg'}" alt="Voiture">
                <input type="text" placeholder="Modèle" value="${voiture.modele}" onchange="changerModele(event, ${index})">
                <input type="date" value="${voiture.date}" onchange="changerDate(event, ${index})">
                <input type="text" placeholder="Prix (€)" value="${voiture.prix}" onchange="changerPrix(event, ${index})">
                <input type="text" placeholder="Code" value="${voiture.code}" onchange="changerCode(event, ${index})">
                <button onclick="ouvrirLien(${index})">Ouvrir</button>
                <button onclick="ouvrirModalLien(${index})">Lnk</button>
                <button onclick="ouvrirFiche(${index})">Fiche Technique</button>
                <button onclick="ouvrirModalFicheLien(${index})">FT Lnk</button>
                <button onclick="supprimerVoiture(${index})">Supprimer</button>
            `;

            voituresContainer.appendChild(div);
        });
    }

    window.changerImage = function (event, index) {
        const reader = new FileReader();
        reader.onload = function () {
            voitures[index].image = reader.result;
            sauvegarderVoitures();
            afficherVoitures();
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    window.changerModele = function (event, index) {
        voitures[index].modele = event.target.value;
        sauvegarderVoitures();
    };

    window.changerDate = function (event, index) {
        voitures[index].date = event.target.value;
        sauvegarderVoitures();
    };

    window.changerPrix = function (event, index) {
        voitures[index].prix = event.target.value;
        sauvegarderVoitures();
    };

    window.changerCode = function (event, index) {
        voitures[index].code = event.target.value;
        sauvegarderVoitures();
    };

    window.ouvrirLien = function (index) {
        if (voitures[index].lien) {
            window.open(voitures[index].lien, "_blank");
        } else {
            alert("Aucun lien enregistré.");
        }
    };

    window.ouvrirModalLien = function (index) {
        currentIndex = index;
        modalLien.style.display = "flex";
    };

    window.ouvrirFiche = function (index) {
        if (voitures[index].ficheLien) {
            window.open(voitures[index].ficheLien, "_blank");
        } else {
            alert("Aucun lien de fiche technique enregistré.");
        }
    };

    window.ouvrirModalFicheLien = function (index) {
        currentFicheIndex = index;
        modalFicheLien.style.display = "flex";
    };

    closeModals.forEach(btn => {
        btn.onclick = function () {
            modalLien.style.display = "none";
            modalFicheLien.style.display = "none";
        };
    });

    validerLien.onclick = function () {
        if (currentIndex !== null) {
            voitures[currentIndex].lien = inputLien.value;
            sauvegarderVoitures();
            modalLien.style.display = "none";
        }
    };

    validerFicheLien.onclick = function () {
        if (currentFicheIndex !== null) {
            voitures[currentFicheIndex].ficheLien = inputFicheLien.value;
            sauvegarderVoitures();
            modalFicheLien.style.display = "none";
        }
    };

    window.supprimerVoiture = function (index) {
        if (confirm("Supprimer cette voiture ?")) {
            voitures.splice(index, 1);
            sauvegarderVoitures();
            afficherVoitures();
        }
    };

    document.getElementById("nouveau").addEventListener("click", function () {
        voitures.push({ image: "", modele: "", date: "", prix: "", code: "", lien: "", ficheLien: "" });
        sauvegarderVoitures();
        afficherVoitures();
    });

    afficherVoitures();
});
