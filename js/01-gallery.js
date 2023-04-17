//! Import gallery items from a separate module
import { galleryItems } from './gallery-items.js';

//! Find the gallery container element in the HTML
const galleryContainer = document.querySelector('.gallery');

//! Generate the HTML markup for the gallery items
const galleryMarkup = createGalleryMarkup(galleryItems);

//! Insert the HTML markup into the gallery container element
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

//* Function that generates the HTML markup for each gallery item

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a class="gallery__link" href="${original.value}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
    })
    .join('');
}

//* Function to handle click events on the gallery container element

const onContainerClick = (clickEvent) => {
  clickEvent.preventDefault();
  if (clickEvent.target.classList.contains('gallery')) return;
  const source = clickEvent.target.dataset.source;
  // Create a new basicLightbox instance with the original image as its content
  const instance = basicLightbox.create(
    `<img src="${source}" width="800" height="600">`
  );
  instance.show();

  //! Close the lightbox instance on Esc key press
  const onEscKeyDown = (event) => {
    if (event.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', onEscKeyDown);
    }
  };
  window.addEventListener('keydown', onEscKeyDown);
};

galleryContainer.addEventListener('click', onContainerClick);
