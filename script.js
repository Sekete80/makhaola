
function myFunction() {
    document.body.classList.toggle("dark-mode");

    let mode = document.body.classList.contains("dark-mode") ? "dark" : "light";

    localStorage.setItem("theme", mode);
}

document.addEventListener("DOMContentLoaded", function () {

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    let search = document.getElementById("destinationSearch");

    if (search) {
        search.addEventListener("input", function () {

            let value = search.value.toLowerCase();
            let cards = document.querySelectorAll(".destination-card");
            let found = 0;

            cards.forEach(function (card) {

                let name = card.textContent.toLowerCase();

                if (name.includes(value)) {
                    card.style.display = "";
                    found++;
                } else {
                    card.style.display = "none";
                }

            });

            document.getElementById("noResults").hidden = found !== 0;

        });
    }

    let contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            document.getElementById("formAlert").innerHTML =
                '<div class="alert alert-success">Your message has been sent successfully!</div>';

            contactForm.reset();

        });

    }

    let bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        let dateInput = document.getElementById("bookDate");
        let today = new Date();
        let year = today.getFullYear();
        let month = String(today.getMonth() + 1).padStart(2, "0");
        let day = String(today.getDate()).padStart(2, "0");

        dateInput.min = year + "-" + month + "-" + day;

        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!bookingForm.checkValidity()) {
                bookingForm.reportValidity();
                return;
            }

            let booking = {
                name: document.getElementById("bookName").value,
                email: document.getElementById("bookEmail").value,
                date: document.getElementById("bookDate").value,
                service: document.getElementById("bookService").value,
                people: document.getElementById("bookPeople").value,
                phone: document.getElementById("bookPhone").value,
                information: document.getElementById("bookInfo").value
            };

            let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

            bookings.push(booking);

            localStorage.setItem("bookings", JSON.stringify(bookings));

            document.getElementById("bookingAlert").innerHTML =
                '<div class="alert alert-success">Your booking has been saved successfully!</div>';

            bookingForm.reset();

        });

    }

});

function calculateTour() {

    let tourType = Number(document.getElementById("tourType").value);
    let numPeople = Number(document.getElementById("numPeople").value);

    if (tourType === 0 || numPeople < 1 || !Number.isInteger(numPeople)) {

        alert("Please select a tour and enter a valid number of people.");

        return;
    }

    let total = tourType * numPeople;

    document.getElementById("tourTotal").textContent = total.toLocaleString();

}

function showImage(src, alt) {

    document.getElementById("modalImage").src = src;

    document.getElementById("modalImage").alt = alt;

    document.getElementById("modalImageTitle").textContent = alt;

}

function getBookings() {

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    return bookings;

}
