let selectedCategories = {
    cat1: null,
    cat2: null,
    cat3: null,
    cat4: null,
    cat5: null,
    cat6: null,
    cat7: null,
    cat8: null,
    cat9: null,
    cat10: null,
    cat11: null,
    cat12: null
};

function selectDiv(element, category) {
    // Reset the selected class from other divs in the same category
    const categoryDivs = document.querySelectorAll(`.categoria[onclick="selectDiv(this, '${category}')"]`);
    categoryDivs.forEach(div => div.classList.remove('selected'));

    // Add the selected class to the clicked div
    element.classList.add('selected');
    selectedCategories[category] = element.textContent.trim();
}

function showSelected() {
    let unselectedCategories = [];

    // Check if all categories have at least one item selected
    for (let category in selectedCategories) {
        if (selectedCategories[category] === null) {
            unselectedCategories.push(category.replace('cat', ''));  // Add the category number to the list
        }
    }

    // If there are unselected categories, show an alert
    if (unselectedCategories.length > 0) {
        alert("Por favor, selecciona un elemento en las siguientes categorías: " + unselectedCategories.join(', '));
    } else {
        // Verificamos si ya se han enviado los votos anteriormente
        if (localStorage.getItem('votosEnviados')) {
            alert("Ya has enviado tus votos.");
            return; // Si los votos ya fueron enviados, no hacemos nada más
        }

        // If all categories are selected, send the email
        let message = `
            Cuna de oro: ${selectedCategories.cat1 || 'No seleccionado'}\n
            Correa de oro: ${selectedCategories.cat2 || 'No seleccionado'}\n
            Chunga de oro: ${selectedCategories.cat3 || 'No seleccionado'}\n
            Frase de oro: ${selectedCategories.cat4 || 'No seleccionado'}\n
            Debatidor de oro: ${selectedCategories.cat5 || 'No seleccionado'}\n
            Sticker de oro: ${selectedCategories.cat6 || 'No seleccionado'}\n
            Kokolo de oro: ${selectedCategories.cat7 || 'No seleccionado'}\n
            GIF de oro: ${selectedCategories.cat8 || 'No seleccionado'}\n
            Caída de oro: ${selectedCategories.cat9 || 'No seleccionado'}\n
            Pelo pobre de oro: ${selectedCategories.cat10 || 'No seleccionado'}\n
            Mensaje de oro: ${selectedCategories.cat11 || 'No seleccionado'}\n
            Personaje secundario de oro: ${selectedCategories.cat12 || 'No seleccionado'}
        `;

        emailjs.init('kKGnakQSDEogJI0Pa');

        // Verificamos que todas las categorías están seleccionadas
        if (selectedCategories.cat1 && selectedCategories.cat2 && selectedCategories.cat3 && selectedCategories.cat4 && selectedCategories.cat5 && 
            selectedCategories.cat6 && selectedCategories.cat7 && selectedCategories.cat8 && selectedCategories.cat9 && 
            selectedCategories.cat10 && selectedCategories.cat11 && selectedCategories.cat12) {

            // Enviar el mensaje utilizando EmailJS
            const templateParams = {
                message: message // El mensaje se pasará a la plantilla
            };

            // Reemplaza 'service_id', 'template_id', y 'user_id' con los valores correspondientes de tu cuenta de EmailJS
            emailjs.send('service_03dpdcp', 'template_gxh77j8', templateParams)
                .then(function(response) {
                    console.log('Correo enviado', response);
                    alert("¡Tus votos han sido enviados!");

                    // Guardar en localStorage que los votos ya fueron enviados
                    localStorage.setItem('votosEnviados', 'true');
                }, function(error) {
                    console.error('Error al enviar el correo:', error);
                    alert("Hubo un problema al enviar los votos.");
                });

        } else {
            alert("Por favor, asegúrate de haber seleccionado todas las categorías.");
        }
    }
}
