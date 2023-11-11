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
//application images fancybox
const appImages = document.querySelectorAll(".file-images")
const appImg = document.querySelectorAll(".file-images .media-cover")
if (appImages) {
  appImages.forEach(item => {
    if (appImg.length > 2) {
      item.insertAdjacentHTML("beforeend", `<button class="btn">+${appImg.length - 2}</button>`)
      item.querySelector(".btn").addEventListener("click", e => {
        e.preventDefault()
        appImg[2].click()
      })
    }
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
    item.addEventListener("submit", e => {
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
let contact = document.querySelectorAll(".item-blocks__col .contact_block")
if (contact) {
  function setContactHeight() {
    contact.forEach(item => {
      item.parentNode.querySelector(".item-block__footer").style.marginTop = item.clientHeight + 32 + "px"
    })
  }
  setContactHeight()
  window.addEventListener("resize",setContactHeight )
}
function showInfo(eventType,text=false,status,link) {
  document.querySelector(".page").classList.add("response")
  const page = document.querySelector(".page .page__inner")
  switch (true) {
    case ( eventType == "application" && status == "success" ):
      page.innerHTML = `
        <div class="response__content">
          <span>Спасибо!</span>
          ${text !== false ? `<p>${text}</p>` : ""}
          <a href=${link} class="btn main-btn">К заявкам</a>
        </div>
      `
      break;
    case ( eventType == "application" && status == "error" ):
      page.innerHTML = `
        <div class="response__content error">
          <span>Что-то пошло<br>не так</span>
          ${text !== false ? `<p>${text}</p>` : ""}
          <a href=${window.location.href} class="btn stroke-btn">Разместить заявку снова</a>
          <a href=${link} class="btn main-btn">К заявкам</a>
        </div>
      `
      break;
    case ( eventType == "subscribe" && status == "success" ):
      page.innerHTML = `
        <div class="response__content">
          <span>Вы подписались!</span>
          ${text !== false ? `<p>${text}</p>` : ""}
          <a href=${link} class="btn main-btn">К объявлениям</a>
        </div>
      `
      break;
    case ( eventType == "unsubscribe" && status == "success" ):
      page.innerHTML = `
        <div class="response__content">
          <span>Вы отписаны<br>от рассылок</span>
          ${text !== false ? `<p>${text}</p>` : ""}
          <a href=${link} class="btn main-btn">К объявлениям</a>
        </div>
      `
    break;
    case ( (eventType == "subscribe" || eventType == "unsubscribe") && (status == "error")):
      page.innerHTML = `
        <div class="response__content error">
          <span>Что-то пошло<br>не так</span>
          ${text !== false ? `<p>${text}</p>` : ""}
          <a href=${link} class="btn main-btn">К объявлениям</a>
        </div>
      `
      break; 
    default: 
      document.querySelector(".page").classList.remove("response")
  }
}
const passwordBtn = document.querySelectorAll(".password-eye")
if (passwordBtn) {
  passwordBtn.forEach(item => {
    item.addEventListener("click", () => {
      let parent = item.parentNode
      parent.classList.toggle("show")
      if (parent.classList.contains("show")) {
        parent.querySelector("input").type = "text"
      } else {
        parent.querySelector("input").type = "password"
      }
    })
  })
}
//swhitch tab
function tabSwitch(nav,block) {
  nav.forEach((item,idx) => {
    item.addEventListener("click", () => {
      let href = item.getAttribute("data-nav")
      nav.forEach(el => {
        el.classList.remove("active")
      })
      block.forEach(el => {
        el.classList.remove("active")
      })
      item.classList.add("active")
      block[idx].classList.add("active")
      item.style.opacity = "0"
      block[idx].style.opacity = "0"
      setTimeout(() => {
        item.style.opacity = "1"
        block[idx].style.opacity = "1"
      }, 0);
    })
  });
}
const profileNav = document.querySelectorAll(".profile__tabs [data-nav]")
const profileBlock = document.querySelectorAll(".profile__blocks [data-block]")
if (profileNav && profileBlock) {
  tabSwitch(profileNav, profileBlock)
}


  