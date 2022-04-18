const elForm = document.querySelector(".form");
const elInput = elForm.querySelector(".form_input");
const elTemplate = document.querySelector(".template").content;
const elList = document.querySelector(".list");

// ma`lumotlarni saqlaydigan massiv e`lon qilamiz
let dataArr = [],
  jsonDataArr;
if (window.localStorage.getItem("dataArr") != null) {
  // JSON formatidagi  localStorage ga saqlangan dataArr ni qaytarib JSON formatida chiqarish
  jsonDataArr = window.localStorage.getItem("dataArr");
  dataArr = JSON.parse(jsonDataArr);
  renderDataArr(dataArr, elList);
  // console.log(dataArr);
  // window.localStorage.clear(); // local storage dagi ma`lumotlarning barini o`chirish
}
// elementlarni bittalab o`chirish funksiyasi
function deleteElem(index) {
  dataArr.splice(index, 1);
  renderDataArr(dataArr, elList);
}
// ma`lumotlar saqlangan massivni document ga chiroyli qilib chiqarish
function renderDataArr(arr, list) {
  // dataArr ni JSON formatiga o`zgartirish
  jsonDataArr = JSON.stringify(dataArr);
  // JSON formatidagi dataArr ni localStorage ga saqlash
  window.localStorage.setItem("dataArr", jsonDataArr);
  // ---------------------------------------------------------------------------------------------------
  // har safar funksiyaga murojat qilinganda list ichini tozalash
  list.innerHTML = null;
  // checked bo`lganlarning sonini hisoblovchi o`zgaruvchini e`lon qilish
  let countChecked = 0;
  arr.forEach((elem, index) => {
    const clonTemplate = elTemplate.cloneNode(true);
    const listId = clonTemplate.querySelector(".idUser");
    const listContent = clonTemplate.querySelector(".list_subtitle");
    const deleteBtn = clonTemplate.querySelector(".deleteBtn");
    const checkboxChek = clonTemplate.querySelector(".checkbox");
    const listLi = clonTemplate.querySelector(".list_item");
    listId.textContent = index + 1;
    listContent.textContent = elem.content;
    // checked bo`lganlarni sanash
    if (elem.isCompleted) countChecked++;
    list.appendChild(clonTemplate);
    // deleteBtn ni kuzatib turish,agar u bosilsa quyidagilar amalga oshadi
    deleteBtn.addEventListener("click", (e) => {
      deleteElem(index);
    });
    // massivga element qo`shganda checkbox checked bo`lganlarining rangini va belgisini saqlab qolish
    if (elem.isCompleted) {
      checkboxChek.checked = true;
      listLi.style.backgroundColor = "#a8a6a6";
    }
    // massivga element qo`shganda checkbox checked bo`lmaganlarining rangini saqlab belgisini olib tashlash
    else {
      checkboxChek.checked = false;
      listLi.style.backgroundColor = "#CCCCCC";
    }
    // Agar checkbox bosilsa quyidagilar bo`ladi
    checkboxChek.addEventListener("click", (e) => {
      // Agar checkbox checked bo`lsa quyidagi amalga oshadi
      if (checkboxChek.checked) {
        elem.isCompleted = true;
        listLi.style.backgroundColor = "#a8a6a6";
      }
      // Agar checkbox checked bo`lmasa quyidagi amalga oshadi
      else {
        elem.isCompleted = false;
        listLi.style.backgroundColor = "#CCCCCC";
      }
      renderDataArr(dataArr, elList);
    });
  });
  // agar checked bo`lganlar soni 1 tadan ko`p bo`lsa barchasini tanlovchi tugmani ko`rinadigan qilish
  if (countChecked >= 1)
    document.querySelector(".selectAll").style.display = "inline-block";
  // agar checked bo`lganlar mavjud bo`lmasa barchasini tanlovchi tugmani yashirish
  else document.querySelector(".selectAll").style.display = "none";
  // agar checked bo`lganlar soni 2 tadan ko`p bo`lsa tanlanganlarni o`chiruvchi tugmani ko`rinadigan qilish
  if (countChecked >= 2)
    document.querySelector(".deleteSelect").style.display = "inline-block";
  // agar checked bo`lganlar soni 2 tadan kam bo`lsa tanlanganlarni o`chiruvchi tugmani yashirish
  else document.querySelector(".deleteSelect").style.display = "none";
}
// submit tugmasi bosilganda quyidagilar amalga oshadi
elForm.addEventListener("submit", (e) => {
  e.preventDefault(); /* submit bo`lganda sahifa yangilanishining oldini olish */
  const elInputValue =
    elInput.value.trim(); /* inputning qiymatidagi ikkala chekkadan bo`sh joylarni olib tashlash */
  if (elInputValue != "") {
    dataArr.push({
      id: dataArr.length + 1,
      content: elInputValue,
      isCompleted: false,
    });
  } else {
    alert("inputga ma`lumot kiriting !");
  }
  renderDataArr(dataArr, elList);
  // submit bosilgandan keyin inputdagi ma`lumotni o`chirib yuborish
  elInput.value = null;
});
// barchasini tanlash tugmasi bosilganda barcha elementlarni checked qiluvchi funksiya
function selectAll() {
  dataArr.forEach((elem) => {
    elem.isCompleted = true;
  });
  renderDataArr(dataArr, elList);
}
// barcha tanlangan elementlarni o`chirish
function deleteSelect(index = 0) {
  for (let i = index; i < dataArr.length; i++) {
    if (dataArr[i].isCompleted) {
      dataArr.splice(i, 1);
      deleteSelect(
        i
      ); /* splice da elementlarning indexlari bir surilganda xatoni oldini olish uchun,tekshiruv qaysi index ga kelgan bo`lsa shundan boshlash uchun funksiyani qayta chaqiramiz  */
    }
  }
  renderDataArr(dataArr, elList);
}
