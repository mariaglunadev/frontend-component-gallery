// include-footer.js
document.addEventListener('DOMContentLoaded', () => {
    const footerPath = 'https://mariaglunadev.github.io/frontend-component-gallery/00-assets/footer.html'; 

    fetch(footerPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el footer: ' + response.statusText);
            }
            return response.text();
        })
        .then(htmlContent => {
            const footerElement = document.createElement('footer');
            footerElement.innerHTML = htmlContent;

            document.body.appendChild(footerElement);
        })
        .catch(error => {
            console.error(error);
        });
});