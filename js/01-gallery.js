//! Import gallery items from a separate module
import { galleryItems } from './gallery-items.js';

//! Find the gallery container element in the HTML
const container = document.querySelector('.gallery');

//! Generate the HTML markup for the gallery items
const markup = createGalleryMarkup(galleryItems);

//! Insert the HTML markup into the gallery container element
container.insertAdjacentHTML('beforeend', markup);

//* Function that generates the HTML markup for each gallery item

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
        <a class="gallery__link" href="${original.value}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join('');
}

const onContainerClick = (clickEvent) => {
  clickEvent.preventDefault();

  // If the clicked element is not a gallery item, do nothing
  if (clickEvent.target.classList.contains('gallery')) return;

  // Get the URL of the original image from the data-source attribute of the clicked image
  const source = clickEvent.target.dataset.source;

  // Create a new basicLightbox instance with the original image as its content
  const instance = basicLightbox.create(`
    <img src="${source}" width="800" height="600">
  `);

  // Show the lightbox instance
  instance.show();

  // Close the lightbox instance on Esc key press
  const onEscKeyDown = (event) => {
    if (event.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', onEscKeyDown);
    }
  };

  // Add a keydown event listener to the window object
  window.addEventListener('keydown', onEscKeyDown);
};

// Add a click event listener to the gallery container element
container.addEventListener('click', onContainerClick);
