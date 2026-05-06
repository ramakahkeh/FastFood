// إظهار تفاصيل الوجبات
function toggleDetails(id) {
    let row = document.getElementById(id);
    row.style.display = (row.style.display === "table-row") ? "none" : "table-row";
}

// إظهار الفورم
function showForm() {
    document.getElementById("orderFormContainer").style.display = "block";
}

// إرسال الطلب
function submitOrder() { 
    let nationalID = document.getElementById("nationalID").value;
let fullName = document.getElementById("fullName").value;
    // التحقق من الاسم العربي
 
    let arabicPattern = /^[\u0621-\u064A\s]+$/;
if (fullName.trim() !== "") {
    if (!arabicPattern.test(fullName)) {
        alert("⚠️ الاسم يجب أن يكون بالعربية فقط.");
        return;
    }
}
    // التحقق من الرقم الوطني
let pattern = /^(0[1-9]|1[0-4])[0-9]{9}$/;
if (nationalID.trim() === "") {
    alert("⚠ الرقم الوطني هو الحقل  الإجباري ولا يمكن تركه فارغاً.");
    return;
}
if(!pattern.test(nationalID)){
    alert("الرقم الوطني يجب أن يكون 11 رقماً.");
    return;
}
let birthDate = document.getElementById("birthDate").value;

// التحقق من صيغة dd/mm/yyyy
let datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
if (birthDate.trim() !== "") {
    if (!datePattern.test(birthDate)) {
        alert("⚠ تاريخ الميلاد يجب أن يكون بصيغة dd-mm-yyyy.");
        return;
    }
}

// التحقق من رقم الهاتف 
let mobile = document.getElementById("mobile").value;
if (mobile.trim() !== "") {
    let phonePattern = /^(093|094|095|096|098|099)[0-9]{7}$/;
    if (!phonePattern.test(mobile)) {
        alert("⚠ رقم الهاتف غير صحيح.");
        return;
    }
}

    // الوجبات المختارة
    let meals = document.querySelectorAll(".meal-check:checked");

    if (meals.length === 0) {
        alert("اختر وجبة واحدة على الأقل");
        return;
    }
    let email = document.getElementById("email").value;
    if (email.trim() !== "") {
    let emailPattern = /^[a-z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/i;
    if (!emailPattern.test(email)) {
        alert("⚠ الإيميل غير صحيح.");
        return;
    }
}

    let selectedMeals = "";
    let total = 0;

    meals.forEach(meal => {
        let mealName = meal.value;
        let row = meal.parentElement.parentElement;
        let price = parseInt(row.children[3].innerText);

        selectedMeals +=`<p>🍽 ${mealName} - ${price} ل.س</p>`;
        total += price;
    });

    // حساب الضريبة 5%
let finalTotal = total * 1.05;

let resultBox = document.getElementById("resultBox");


resultBox.innerHTML =`<h3>🎉 تم إرسال الطلب بنجاح</h3> 
                       <div>${selectedMeals}</div><hr>
                        <p class="total">💰 المجموع: ${total} ل.س </p>
                     <p class="final">🧾 بعد الضريبة (5%): ${finalTotal} ل.س</p>`;
                      resultBox.style.display = "block";
}
