import { galleryItems } from "./gallery-items.js";
// Change code below this line

// 1. Створення і рендер розмітки.

const gallery = document.querySelector(".gallery");

function galleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

gallery.insertAdjacentHTML("beforeend", galleryMarkup(galleryItems));

// 2. Реалізація делегування на div.gallery і отримання url великого зображення.

gallery.addEventListener("click", handleClckedPicture);

function handleClckedPicture(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  // 4. Відкриття модального вікна по кліку на елементі галереї.

  const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">
`);
  instance.show();

  //  5. Закриття з клавіатури
  gallery.addEventListener("keydown", function closeBigPicture(event) {
    if (event.key === "Escape") {
      gallery.removeEventListener("keydown", closeBigPicture);
      instance.close();
    }
  });
}
