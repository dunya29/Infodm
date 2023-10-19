let paddingValue
window.onload = function () {
  setTimeout(() => {
    document.body.classList.add("loaded")
    document.body.classList.remove("no-scroll")
    paddingValue = window.innerWidth > 325 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0 
  }, 1100);
}
const breadCrumbs = document.querySelector(".breadcrumbs")
const header = document.querySelector(".header")
const menuMobileBtn = document.querySelector('.menu-mobile__btn');
const menuMobile = document.querySelector('.menu-mobile'); 
const iconMenu = document.querySelector('.icon-menu');
const mobileNavItem = document.querySelectorAll('.navmenu-mobile__item');
const pagesHero = document.querySelector(".pages-hero__container")
const fixedBlocks = document.querySelectorAll(".fixed-block")
const feedbackBtn = document.querySelectorAll(".feedback-btn")
const modal = document.querySelectorAll(".modal")
const feedbackModal = document.querySelector(".feedback-modal")
const successModal = document.querySelector(".success-modal")
const errorModal = document.querySelector(".error-modal")
const customSelect = document.querySelectorAll(".select-custom")

//smoothdrop
function smoothDrop(header, body) {
  if (!header.classList.contains("active")) {
    body.style.height = 'auto';
    let height = body.clientHeight + 'px';
    body.style.height = '0px';
    setTimeout(function () {
      body.style.height = height;
    }, 0);
  } else {
    body.style.height = '0px';
  }
  header.classList.toggle("active")
}

//show modal
function openModal(modal) {
  if (!document.querySelector(".icon-menu").classList.contains("active")) {
    if (fixedBlocks) addPaddingToFixedEl(fixedBlocks) 
    document.body.style.paddingRight = paddingValue
    document.body.classList.add("no-scroll");
  }
  modal.classList.add("open")
  setTimeout(() => {
    modal.querySelector(".modal__inner").classList.add("open")
  }, 30) 
}
// unshow modal
function closeModal(modal) {
  modal.querySelector(".modal__inner").classList.remove("open")
  setTimeout(() => {
    if (!document.querySelector(".icon-menu").classList.contains("active")) {
      if (fixedBlocks) removePaddingOfFixedEl(fixedBlocks) 
      document.body.style.paddingRight = '0px' 
      document.body.classList.remove("no-scroll")
    }
    modal.classList.remove("open")  
  }, 500)
}
// unshow modal when clicked outside or close-btn
modal.forEach(item => {
  const modalContent = item.querySelector(".modal__content");
  let formCloseBtn = item.querySelector(".modal__close")
  formCloseBtn.addEventListener("click", e => {
    closeModal(item)
  })
  item.addEventListener("click", e => {
    if (!modalContent.contains(e.target)) {
      closeModal(item)
    }
  })
})
//form onsubmit
function formSuccess(form) {
  form.querySelectorAll(".item-form").forEach(item => {
    item.classList.remove("error")
    if (item.querySelector("[data-error]")) item.querySelector("[data-error]").textContent = ""
  })
  form.querySelectorAll("input").forEach(inp => {
    if (!["hidden", "checkbox", "radio"].includes(inp.type) ) {
      inp.value = ""      
    }
    if (["checkbox", "radio"].includes(inp.type) && !inp.classList.contains("required")) {
      inp.checked = false
    }
  })
  if (form.querySelector("textarea")) {
    form.querySelector("textarea").value = ""
  }
  if (form.querySelector(".file-form__item")) {
    form.querySelectorAll(".file-form__item").forEach(el => el.remove())
  }
}
// custom select open/close
if (customSelect) {
  customSelect.forEach(select => {
    select.querySelector(".select-custom__selected").addEventListener("click", () => {
      if (!select.classList.contains("open")) {
        openSelectCustom(select)
      } else {
        closeSelectCustom(select)
      }
    })
  })
  
}
//open custom select
function openSelectCustom(select) {
  select.classList.add("open");
  select.setAttribute("aria-expanded", true);
  select.querySelectorAll(".select-custom__option").forEach(item => {
    item.addEventListener("click", (e) => {
      select.querySelectorAll(".select-custom__option").forEach(el => el.classList.remove("selected"))
      item.classList.add("selected");
      select.querySelector(".select-custom__selected").textContent = item.textContent;
      closeSelectCustom(select);
    });
  });
  document.addEventListener("click", function clickOutside(e) {
    if (!select.contains(e.target)) {
      closeSelectCustom(select)
      document.removeEventListener('click', clickOutside);
    }
  });
}
//close custom select
function closeSelectCustom(select) {
  select.classList.remove("open");
  select.setAttribute("aria-expanded", false);
}

//application images fancybox
const appImages = document.querySelectorAll(".file-images")
const appImg = document.querySelectorAll(".file-images .media-cover")
if (appImages) {
  appImages.forEach(item => {
    if (appImg.length > 2) {
      item.insertAdjacentHTML("beforeend", `<button class="btn">+${appImg.length - 2}</button>`)
    }
    item.querySelector(".btn").addEventListener("click", e => {
      e.preventDefault()
      appImg[2].click()
    })
  })
}
// input mask
const inp = document.querySelectorAll('input[type=tel]')
if (inp) {
    inp.forEach(item => {
      Inputmask({ "mask": "+7 999 999-99-99" }).mask(item);
    })
}
// disable btn on input error
//disable/enale form button
function disEnFormBtn(form) {
  if (form.querySelector(".item-form.error")) {
    form.querySelector(".main-btn").classList.add("disabled")
  } else {
    form.querySelector(".main-btn").classList.remove("disabled")
  }
}
const form = document.querySelectorAll(".form")
if (form) {
  form.forEach(item => {
    disEnFormBtn(item)
    item.querySelector(".main-btn").addEventListener("click", e => {
      setTimeout(disEnFormBtn(item), 0);
    })
    item.querySelectorAll(".item-form").forEach(el => {
      if (el.querySelector("input")) {
        el.querySelector("input").addEventListener("change",() => {
          el.classList.remove("error")
          if (el.querySelector("[data-error]")) el.querySelector("[data-error]").textContent = "" 
          disEnFormBtn(item)
        })
      }
    })
  })
}
//file-form
let fileTypes = ["image/png", "image/jpeg", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
document.querySelectorAll(".file-form").forEach(item => {
  item.querySelector("input").addEventListener("change", e => {  
    item.querySelectorAll(".file-form__item").forEach((el=>el.remove()));
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      let file = files[i]
      if (file.size >  10 * 1024 * 1024) {
        item.querySelector("input").value = "" 
        item.classList.add("error")
        item.querySelectorAll(".file-form__item").forEach((el=>el.remove()));
        item.querySelector("[data-error]").textContent = "Файл должен быть менее 10 МБ"
      } else if (!fileTypes.includes(file.type)) {
        item.querySelector("input").value = "" 
        item.classList.add("error")
        item.querySelectorAll(".file-form__item").forEach((el=>el.remove()));
        item.querySelector("[data-error]").textContent = 'Разрешённые форматы: doc,docx,pdf,xls,xlsx,jpg,png'
      } else {
        item.classList.remove("error")
        item.querySelector("[data-error]").textContent = "" 
        if (["image/jpeg", "image/png"].includes(file.type)) {
          let reader = new FileReader()
          reader.readAsDataURL(file);
          reader.onload = () => {
            item.querySelector(".file-form__images").innerHTML += `<div class="file-form__item file-form__image">
            <img src=${reader.result} alt="">
            <div class="file-form__del"></div>
           </div>
          `
          }
          reader.onerror = () => {
            console.log(reader.error);
          }
        } else {
          item.querySelector(".file-form__files").innerHTML += `<div class="file-form__item file-form__file">
          <div class="file-form__name">${file.name}</div>
          <div class="file-form__del"></div>
          </div>`
        }
      }
    }
  })
  //delete file
  item.addEventListener("click", e => {
    item.querySelectorAll(".file-form__del").forEach((del, idx) => {
        if (del.contains(e.target)) {
            const dt = new DataTransfer()
            const input = item.querySelector("input")
            const { files } = input
            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                if (i !== idx)
                    dt.items.add(file)
            }
            input.files = dt.files
            del.parentNode.remove()
        }
    })

})
})
 


  