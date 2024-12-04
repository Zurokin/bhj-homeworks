function setFontSize(size) {
  const book = document.getElementById("book");
  const fontSizeLinks = document.querySelectorAll(
    ".book__control_font-size .font-size"
  );

  fontSizeLinks.forEach((link) => {
    link.classList.remove("font-size_active");
  });

  const activeLink = document.querySelector(
    `.book__control_font-size .font-size[data-size="${size}"]`
  );
  if (activeLink) {
    activeLink.classList.add("font-size_active");
  }

  book.classList.remove("book_fs-small", "book_fs-big", "book_fs-normal");
  if (size === "small") {
    book.classList.add("book_fs-small");
  } else if (size === "big") {
    book.classList.add("book_fs-big");
  } else {
    book.classList.add("book_fs-normal");
  }
}

function setTextColor(color) {
  const book = document.getElementById("book");
  const colorLinks = document.querySelectorAll(".book__control_color .color");

  colorLinks.forEach((link) => {
    link.classList.remove("color_active");
  });

  const activeLink = document.querySelector(
    `.book__control_color .color[data-text-color="${color}"]`
  );
  if (activeLink) {
    activeLink.classList.add("color_active");
  }

  book.classList.remove(
    "book_color-black",
    "book_color-gray",
    "book_color-whitesmoke"
  );
  book.classList.add(`book_color-${color}`);
}

function setBackgroundColor(color) {
  const book = document.getElementById("book");
  const bgColorLinks = document.querySelectorAll(
    ".book__control_background .color"
  );

  bgColorLinks.forEach((link) => {
    link.classList.remove("color_active");
  });

  const activeLink = document.querySelector(
    `.book__control_background .color[data-bg-color="${color}"]`
  );
  if (activeLink) {
    activeLink.classList.add("color_active");
  }

  book.classList.remove("book_bg-black", "book_bg-gray", "book_bg-white");
  book.classList.add(`book_bg-${color}`);
}

document.querySelectorAll(".font-size").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    setFontSize(this.getAttribute("data-size"));
  });
});

document.querySelectorAll(".color").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    if (this.getAttribute("data-text-color")) {
      setTextColor(this.getAttribute("data-text-color"));
    } else if (this.getAttribute("data-bg-color")) {
      setBackgroundColor(this.getAttribute("data-bg-color"));
    }
  });
});
