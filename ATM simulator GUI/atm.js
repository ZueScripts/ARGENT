const setup_form = document.getElementById("setup_form");
console.log(setup_form)

if (setup_form) {
setup_form.addEventListener("submit", function(event) {
    event.preventDefault();
        const name = document.getElementById("name").value;
        const pin = document.getElementById("pin").value;

        if(name.trim() === "") {
            alert("Please enter your full name.");
            return;
        }

        if(!/^\d{4}$/.test(pin)) {
            alert("Please enter your PIN(Your PIN must contain exactly 4 digits).");
            return;
        }

        localStorage.setItem("accountName", name.trim());
        localStorage.setItem("accountPin", pin);
        localStorage.setItem("balance", "0");

        alert("Account created successfully!")

        window.location.href = "verification.html";
});
}

const display_balance = document.getElementById("display_balance");

if (display_balance) {
    const balance = localStorage.getItem("balance");

    display_balance.textContent = "₦" + Number(balance).toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

const depositing = document.getElementById("depositing");
const confirm_deposit = document.getElementById("confirm_deposit");


if (depositing && confirm_deposit) {
    depositing.addEventListener("click", function() {

        const deposit_section = document.querySelector(".deposit_btn");
        const deposit_input = document.querySelector(".deposit_btn input"); 

        deposit_section.style.display = "block";
        deposit_input.style.display = "block";
    });

    confirm_deposit.addEventListener("click", function() {

        const amount = Number(document.getElementById("deposit_amount").value);
        const balance = Number(localStorage.getItem("balance"));

        if (!Number.isFinite(amount) || amount <= 0) {
            alert("Please enter a valid deposit amount.");
            return;
        }

        const updated_balance = balance + amount;

        localStorage.setItem("balance", updated_balance);

        document.getElementById("new_balance").textContent =
            "New Balance: ₦" + updated_balance.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

        alert("Deposit successful!");

        document.getElementById("deposit_amount").value = "";
    });
}

const make_withdrawal = document.getElementById("make_withdrawal");
const confirm_withdrawal = document.getElementById("confirm_withdrawal");

if (make_withdrawal && confirm_withdrawal) {
    make_withdrawal.addEventListener("click", function() {

        const withdraw_section = document.querySelector(".withdraw_btn");
        const withdraw_input = document.querySelector(".withdraw_btn input"); 

        withdraw_section.style.display = "block";
    });

    confirm_withdrawal.addEventListener("click", function() {

        const amount = Number(document.getElementById("withdraw_amount").value);
        const balance = Number(localStorage.getItem("balance"));

        if (!Number.isFinite(amount) || amount <= 0) {
            alert("Please enter a valid withdrawal amount.");
            return;
        }

        if (amount > balance) {
            alert("Insufficient funds")
            return;
        }

        const updated_balance2 = balance - amount;

        localStorage.setItem("balance", updated_balance2);

        document.getElementById("new_balance2").textContent =
            "New Balance: ₦" + updated_balance2.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

        alert("Withdrawal successful!");

        document.getElementById("withdraw_amount").value = "";
    });
}

const change_pin_btn = document.getElementById("change_pin_btn")
if (change_pin_btn) {
    change_pin_btn.addEventListener("click", function() {
        const pin = localStorage.getItem("accountPin");
        const pin_original = document.getElementById("pin_original").value
        const pin1 = document.getElementById("pin1").value
        const pin_1a = document.getElementById("pin_1a").value

        if (pin != pin_original) {
            alert("Incorrect current PIN!")
            return;
        }

        if (!/^\d{4}$/.test(pin1)) {
            alert("New PIN must be exactly 4 digits!")
            return;
        }

        if (pin_1a != pin1) {
            alert("New PINs don't match!")
            return;
        }

        localStorage.setItem("accountPin", pin1)
        alert("PIN changed successfully!")
    });
}

const start_btn = document.getElementById("start_btn")
if (start_btn) {
    start_btn.addEventListener("click", function() {
        console.log("Welcome button clicked!");
        const saved_pin = localStorage.getItem("accountPin")

        if (saved_pin) {
            window.location.href = "verification.html"
        }
        else {
            window.location.href = "name.html"
        }
    });
}

const proceed_btn = document.getElementById("proceed_btn");
if (proceed_btn) {
    proceed_btn.addEventListener("click", function(){
        const saved_pin = localStorage.getItem("accountPin");
        const entered_pin = document.getElementById("pin_verification").value.trim()

        if (saved_pin == entered_pin) {
            window.location.href = "menu.html"
            alert("Verification successful!")
        }
        else {
            alert("Incorrect PIN!")
        }

    });
}  

const account_name = document.getElementById("account_name");
const account_number = document.getElementById("account_number");
const account_type = document.getElementById("account_type");
const account_balance = document.getElementById("account_balance");

if (account_name && account_number && account_type && account_balance) {

    const saved_name = localStorage.getItem("accountName");
    let saved_number = localStorage.getItem("accountNumber");
    const balance = Number(localStorage.getItem("balance"));

    if (!saved_number) {
        saved_number = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        localStorage.setItem("accountNumber", saved_number);
    }

    account_name.textContent = saved_name;
    account_number.textContent = saved_number;
    account_type.textContent = "Savings";
    account_balance.textContent = balance.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}





