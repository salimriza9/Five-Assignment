const seats = document.querySelectorAll('.seat');
const selectedSeats = [];
let totalPrice = 0;
let phoneNumber = '';
let discountPrice = 0;

// Initially update the table for once
updateTable();
updateNextButtonState();

function handleSeatSelection() {
    const seat = this;

    if (selectedSeats.length === 4 && !seat.classList.contains('bg-selected')) {
        document.getElementById('error-message').classList.remove('hidden');

    }
    else {
        document.getElementById('error-message').classList.add('hidden');
        seat.classList.toggle('bg-selected');
        seat.classList.toggle('text-white');
        const seatName = seat.textContent;
        const seatClass = 'Business';
        const seatPrice = 550;

        let availableSeat = parseInt(document.getElementById('available-seats').textContent);
        let selectedSeat = parseInt(document.getElementById('selected-seats').textContent);

        if (seat.classList.contains('bg-selected')) {
            availableSeat--;
            selectedSeat++;
            selectedSeats.push({ name: seatName, class: seatClass, price: seatPrice });
        } else {
            availableSeat++;
            selectedSeat--;
            const index = selectedSeats.findIndex(s => s.name === seatName);
            if (index !== -1) {
                selectedSeats.splice(index, 1);
            }
        }
        document.getElementById('available-seats').textContent = availableSeat;
        document.getElementById('selected-seats').textContent = selectedSeat;
        if (selectedSeats.length) {
            document.getElementById('next-btn').removeAttribute('disabled');
        }
        else {
            document.getElementById('next-btn').setAttribute('disabled', 'disabled');
        }
        if (selectedSeats.length === 4) {
            document.getElementById('coupon-text').removeAttribute('disabled');
            document.getElementById('coupon-btn').removeAttribute('disabled');
        }
        else {
            document.getElementById('coupon-text').setAttribute('disabled', 'disabled');
            document.getElementById('coupon-btn').setAttribute('disabled', 'disabled');
            document.getElementById('coupon-text').classList.remove('hidden');
            document.getElementById('coupon-btn').classList.remove('hidden');
            document.getElementById('coupon-text').value = '';
            discountPrice = 0;
        }

        updateTable();
        updateNextButtonState();
    }
}

function updateTable() {
    const tableBody = document.querySelector('.table tbody');
    tableBody.innerHTML = '';
    selectedSeats.forEach(seat => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${seat.name}</td>
            <td>${seat.class}</td>
            <td>${seat.price}</td>
        `;
        tableBody.appendChild(row);
    });

    totalPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td>Total Price</td>
        <td></td>
        <td>BDT <span>${totalPrice}</span></td>
    `;
    tableBody.appendChild(totalRow);

    let grandTotal = totalPrice;
    if (discountPrice > 0) {
        grandTotal -= discountPrice;
        const discountRow = document.createElement('tr');
        discountRow.innerHTML = `
            <td>Discount</td>
            <td></td>
            <td>- BDT <span>${discountPrice}</span></td>
        `;
        tableBody.appendChild(discountRow);
    }
    document.getElementById('grand-total').textContent = grandTotal;

}

function grandOffer() {
    let grandTotal = totalPrice;
    const couponText = document.getElementById('coupon-text').value;
    if (couponText === 'NEW15') {
        discountPrice = totalPrice * 0.15;
        grandTotal -= discountPrice;
        document.getElementById('error-coupon').classList.add('hidden');
        document.getElementById('coupon-text').classList.add('hidden');
        document.getElementById('coupon-btn').classList.add('hidden');
    }
    else if (couponText === 'Couple 20') {
        discountPrice = totalPrice * 0.2;
        grandTotal -= discountPrice;
        document.getElementById('error-coupon').classList.add('hidden');
        document.getElementById('coupon-text').classList.add('hidden');
        document.getElementById('coupon-btn').classList.add('hidden');
    }
    else {
        document.getElementById('error-coupon').classList.remove('hidden');
        discountPrice = 0;
    }
    updateTable();

}

function updateNextButtonState() {
    const nextButton = document.getElementById('next-btn');
    const phoneNumberInput = document.getElementById('phone-number');

    if (selectedSeats.length > 0 && phoneNumberInput.value.trim() !== '') {
        nextButton.removeAttribute('disabled');
    } else {
        nextButton.setAttribute('disabled', 'disabled');
    }
}

for (const seat of seats) {
    seat.addEventListener('click', handleSeatSelection);
}

document.getElementById('phone-number').addEventListener('input', function () {
    phoneNumber = this.value.trim();
    updateNextButtonState();
});