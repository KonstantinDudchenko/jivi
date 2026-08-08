function openImage(src) {

      const modalEl = document.getElementById("imageModal");

      const img = document.getElementById("modalImage");


      img.src = src;


      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

      modal.show();

  }