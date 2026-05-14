const serviceNamesByPrice = {
    "5100": "Urgent Talk",
    "2500": "Premium Talk",
    "2000": "Match Making",
    "1500": "Career"
};

document.addEventListener("DOMContentLoaded", function() {
    const headerPlaceholder = document.getElementById("header-placeholder");

    if (headerPlaceholder) {
        fetch("header.html")
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                setActiveNavigation();
            })
            .catch(error => console.error("Error loading header:", error));
    }

    setupCheckoutPage();
});

function setActiveNavigation() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const pageKey = currentPage.replace(".html", "") || "index";

    document.querySelectorAll(".nav-links a[data-page]").forEach(link => {
        if (link.dataset.page === pageKey) {
            link.classList.add("active");
        }
    });
}

function goToCheckout(serviceName, basePrice) {
    const params = new URLSearchParams({
        service: serviceName,
        price: basePrice
    });

    window.location.href = `checkout.html?${params.toString()}`;
}

function setupCheckoutPage() {
    const bookingForm = document.getElementById("bookingForm");
    const serviceSelect = document.getElementById("serviceType");

    if (!bookingForm || !serviceSelect) {
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const servicePrice = urlParams.get("price");

    if (servicePrice) {
        addServiceOptionIfMissing(servicePrice, urlParams.get("service"));
        serviceSelect.value = servicePrice;
        calculateGST();
    }

    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const finalAmountInput = document.getElementById("finalAmount");
        const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
        const serviceName = selectedOption ? selectedOption.dataset.service || selectedOption.textContent : "selected service";

        if (!finalAmountInput.value) {
            alert("Please select a service before proceeding.");
            return;
        }

        alert(`Booking request ready for ${serviceName}.\nTotal payable: Rs. ${Number(finalAmountInput.value).toFixed(2)}`);
    });
}

function addServiceOptionIfMissing(price, serviceName) {
    const serviceSelect = document.getElementById("serviceType");

    if (!serviceSelect || !price || serviceSelect.querySelector(`option[value="${price}"]`)) {
        return;
    }

    const option = document.createElement("option");
    option.value = price;
    option.dataset.service = serviceName || serviceNamesByPrice[price] || "Custom Service";
    option.textContent = `${option.dataset.service} (Rs. ${price})`;
    serviceSelect.appendChild(option);
}

function calculateGST() {
    const serviceSelect = document.getElementById("serviceType");
    const amountDisplay = document.getElementById("amountDisplay");
    const finalAmountInput = document.getElementById("finalAmount");

    if (!serviceSelect || !amountDisplay || !finalAmountInput) {
        return;
    }

    const baseAmount = parseFloat(serviceSelect.value);

    if (baseAmount) {
        const gst = baseAmount * 0.18;
        const totalAmount = baseAmount + gst;

        finalAmountInput.value = totalAmount.toFixed(2);
        amountDisplay.innerHTML = `Base: Rs. ${baseAmount.toFixed(2)}<br>GST (18%): Rs. ${gst.toFixed(2)}<br><strong>Total to Pay: Rs. ${totalAmount.toFixed(2)}</strong>`;
    } else {
        finalAmountInput.value = "";
        amountDisplay.textContent = "Select a service to see total";
    }
}
