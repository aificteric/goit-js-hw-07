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
      return `<li class="gallery_item">
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

//! Function to handle click event on the gallery container element

const onContainerClick = (clickEvent) => {
  clickEvent.preventDefault();
  if (clickEvent.target.nodeName === 'IMG') return;
  const source = clickEvent.target.dataset.source;
  const instance = basicLightbox.create(
    `<img src="${source}" width="800" height="600">`
  );
  instance.show();

  //! Close the lightbox instance on Esc key press
  const closeOnEscKeyDown = (event) => {
    if (event.code === 'Escape') {
      instance.close();
      instance.element().removeEventListener('keydown', closeOnEscKeyDown);
    }
  };
  instance.element().addEventListener('keydown', closeOnEscKeyDown);
};
