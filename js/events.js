// Контейнер для мероприятий
const eventsContainer = document.getElementById("events-container");

// Загружаем данные из JSON
fetch("data/events.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Не удалось загрузить events.json");
        }

        return response.json();
    })
    .then(events => {
        renderEvents(events);
    })
    .catch(error => {
        console.error(error);

        eventsContainer.innerHTML = `
            <div class="alert alert-danger">
                Не удалось загрузить мероприятия.
            </div>
        `;
    });


// Создание мероприятий
function renderEvents(events) {

    eventsContainer.innerHTML = "";

    events.forEach((event, index) => {

        const carouselId = `eventCarousel${index}`;

        // Создаём HTML фотографий
        const photos = event.photos.map((photo, photoIndex) => {

            return `
                <div class="carousel-item ${photoIndex === 0 ? "active" : ""}">
                    <img
                        src="${photo}"
                        class="d-block w-100"
                        alt="${event.title}"
                    >
                </div>
            `;

        }).join("");


        // Создаём один section
        const section = document.createElement("section");

        section.className = "event-section";

        section.innerHTML = `

            <div class="row g-0 align-items-center">

                <!-- Левая часть: фотографии -->
                <div class="col-md-6">

                    <div
                        id="${carouselId}"
                        class="carousel slide event-carousel"
                        data-bs-ride="carousel"
                    >

                        <div class="carousel-inner">
                            ${photos}
                        </div>


                        <!-- Предыдущая фотография -->
                        <button
                            class="carousel-control-prev"
                            type="button"
                            data-bs-target="#${carouselId}"
                            data-bs-slide="prev"
                        >
                            <span class="carousel-control-prev-icon"></span>
                        </button>


                        <!-- Следующая фотография -->
                        <button
                            class="carousel-control-next"
                            type="button"
                            data-bs-target="#${carouselId}"
                            data-bs-slide="next"
                        >
                            <span class="carousel-control-next-icon"></span>
                        </button>

                    </div>

                </div>


                <!-- Правая часть: информация -->
                <div class="col-md-6">

                    <div class="event-content">

                        <h2 class="event-title">
                            ${event.title}
                        </h2>


                        <div class="event-info">

                            <div>
                                <i class="bi bi-calendar3"></i>
                                ${event.date}
                            </div>

                            <div>
                                <i class="bi bi-geo-alt"></i>
                                ${event.place}
                            </div>

                        </div>


                        <p class="event-description">
                            ${event.description}
                        </p>

                    </div>

                </div>

            </div>
        `;


        // Добавляем мероприятие на страницу
        eventsContainer.appendChild(section);

    });
}