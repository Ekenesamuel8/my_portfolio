// Create a scroll-to-top button
const backToTopButton = document.createElement('button');
backToTopButton.innerText = 'Top';
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
