//! Import gallery items
import { galleryItems } from './gallery-items.js';

//! Find the gallery container element in the HTML
const galleryContainer = document.querySelector('.gallery');

//! Generate the HTML markup for the gallery items
const imagesMarkup = createItemsMarkup(galleryItems);

//! Insert the HTML markup into the gallery container element
galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);

//* Function that generates the HTML markup for each gallery item
function createItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery_item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              alt="${description}"
            />
          </a>
        </li>`;
    })
    .join('');
}

//! Create a new SimpleLightbox instance and configure it to use the "alt" attribute for captions
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionType: 'alt',
});
