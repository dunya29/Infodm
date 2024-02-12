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
//switch tab
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
//aplications tabs
const appNav = document.querySelectorAll(".applications [data-nav]")
const appBlock = document.querySelectorAll(".applications [data-block]")
if (appNav && appBlock) {
  tabSwitch(appNav, appBlock)
}
//open custom select
function openSelectCustom(select) {
  select.classList.add("open");
  select.setAttribute("aria-expanded", true);
  select.querySelectorAll(".select-custom__options input").forEach(item => {
    item.addEventListener("change", (e) => {
      setActiveOption(select)
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
// set active select option
function setActiveOption(select) {
  let activeInpTxt = select.querySelector("input:checked").nextElementSibling.innerHTML
  select.querySelector(".select-custom__selected span").innerHTML = activeInpTxt
}
//close custom select
function closeSelectCustom(select) {
  select.classList.remove("open");
  select.setAttribute("aria-expanded", false);
}
const customSelect = document.querySelectorAll(".select-custom")
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
//share tg
const appShare = document.querySelector(".application__share")
if (appShare ) {
  let shareUrl = "https://t.me/share/url?url=" + encodeURIComponent(window.location.href) + "&text=" + encodeURIComponent(document.title)
  appShare.querySelector("a").setAttribute("href", shareUrl)
}
// datatable
$(document).ready(function() {
  $('#app-table').DataTable( {
      "language":{
        "processing": "Подождите...",
        "search": "Поиск:",
        "lengthMenu": "Показать _MENU_ записей",
        "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
        "infoEmpty": "Записи с 0 до 0 из 0 записей",
        "infoFiltered": "(отфильтровано из _MAX_ записей)",
        "loadingRecords": "Загрузка записей...",
        "zeroRecords": "Записи отсутствуют.",
        "emptyTable": "В таблице отсутствуют данные",
        "paginate": {
            "first": "Первая",
            "previous": "Предыдущая",
            "next": "Следующая",
            "last": "Последняя"
        },
        "aria": {
            "sortAscending": ": активировать для сортировки столбца по возрастанию",
            "sortDescending": ": активировать для сортировки столбца по убыванию"
        },
        "select": {
            "rows": {
                "_": "Выбрано записей: %d",
                "1": "Выбрана одна запись"
            },
            "cells": {
                "_": "Выбрано %d ячеек",
                "1": "Выбрана 1 ячейка "
            },
            "columns": {
                "1": "Выбран 1 столбец ",
                "_": "Выбрано %d столбцов "
            }
        },
        "searchBuilder": {
            "conditions": {
                "string": {
                    "startsWith": "Начинается с",
                    "contains": "Содержит",
                    "empty": "Пусто",
                    "endsWith": "Заканчивается на",
                    "equals": "Равно",
                    "not": "Не",
                    "notEmpty": "Не пусто",
                    "notContains": "Не содержит",
                    "notStartsWith": "Не начинается на",
                    "notEndsWith": "Не заканчивается на"
                },
                "date": {
                    "after": "После",
                    "before": "До",
                    "between": "Между",
                    "empty": "Пусто",
                    "equals": "Равно",
                    "not": "Не",
                    "notBetween": "Не между",
                    "notEmpty": "Не пусто"
                },
                "number": {
                    "empty": "Пусто",
                    "equals": "Равно",
                    "gt": "Больше чем",
                    "gte": "Больше, чем равно",
                    "lt": "Меньше чем",
                    "lte": "Меньше, чем равно",
                    "not": "Не",
                    "notEmpty": "Не пусто",
                    "between": "Между",
                    "notBetween": "Не между ними"
                },
                "array": {
                    "equals": "Равно",
                    "empty": "Пусто",
                    "contains": "Содержит",
                    "not": "Не равно",
                    "notEmpty": "Не пусто",
                    "without": "Без"
                }
            },
            "data": "Данные",
            "deleteTitle": "Удалить условие фильтрации",
            "logicAnd": "И",
            "logicOr": "Или",
            "title": {
                "0": "Конструктор поиска",
                "_": "Конструктор поиска (%d)"
            },
            "value": "Значение",
            "add": "Добавить условие",
            "button": {
                "0": "Конструктор поиска",
                "_": "Конструктор поиска (%d)"
            },
            "clearAll": "Очистить всё",
            "condition": "Условие",
            "leftTitle": "Превосходные критерии",
            "rightTitle": "Критерии отступа"
        },
        "searchPanes": {
            "clearMessage": "Очистить всё",
            "collapse": {
                "0": "Панели поиска",
                "_": "Панели поиска (%d)"
            },
            "count": "{total}",
            "countFiltered": "{shown} ({total})",
            "emptyPanes": "Нет панелей поиска",
            "loadMessage": "Загрузка панелей поиска",
            "title": "Фильтры активны - %d",
            "showMessage": "Показать все",
            "collapseMessage": "Скрыть все"
        },
        "buttons": {
            "pdf": "PDF",
            "print": "Печать",
            "collection": "Коллекция <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
            "colvis": "Видимость столбцов",
            "colvisRestore": "Восстановить видимость",
            "copy": "Копировать",
            "copyTitle": "Скопировать в буфер обмена",
            "csv": "CSV",
            "excel": "Excel",
            "pageLength": {
                "-1": "Показать все строки",
                "_": "Показать %d строк",
                "1": "Показать 1 строку"
            },
            "removeState": "Удалить",
            "renameState": "Переименовать",
            "copySuccess": {
                "1": "Строка скопирована в буфер обмена",
                "_": "Скопировано %d строк в буфер обмена"
            },
            "createState": "Создать состояние",
            "removeAllStates": "Удалить все состояния",
            "savedStates": "Сохраненные состояния",
            "stateRestore": "Состояние %d",
            "updateState": "Обновить",
            "copyKeys": "Нажмите ctrl  или u2318 + C, чтобы скопировать данные таблицы в буфер обмена.  Для отмены, щелкните по сообщению или нажмите escape."
        },
        "decimal": ".",
        "infoThousands": ",",
        "autoFill": {
            "cancel": "Отменить",
            "fill": "Заполнить все ячейки <i>%d<i><\/i><\/i>",
            "fillHorizontal": "Заполнить ячейки по горизонтали",
            "fillVertical": "Заполнить ячейки по вертикали",
            "info": "Информация"
        },
        "datetime": {
            "previous": "Предыдущий",
            "next": "Следующий",
            "hours": "Часы",
            "minutes": "Минуты",
            "seconds": "Секунды",
            "unknown": "Неизвестный",
            "amPm": [
                "AM",
                "PM"
            ],
            "months": {
                "0": "Январь",
                "1": "Февраль",
                "10": "Ноябрь",
                "11": "Декабрь",
                "2": "Март",
                "3": "Апрель",
                "4": "Май",
                "5": "Июнь",
                "6": "Июль",
                "7": "Август",
                "8": "Сентябрь",
                "9": "Октябрь"
            },
            "weekdays": [
                "Вс",
                "Пн",
                "Вт",
                "Ср",
                "Чт",
                "Пт",
                "Сб"
            ]
        },
        "editor": {
            "close": "Закрыть",
            "create": {
                "button": "Новый",
                "title": "Создать новую запись",
                "submit": "Создать"
            },
            "edit": {
                "button": "Изменить",
                "title": "Изменить запись",
                "submit": "Изменить"
            },
            "remove": {
                "button": "Удалить",
                "title": "Удалить",
                "submit": "Удалить",
                "confirm": {
                    "_": "Вы точно хотите удалить %d строк?",
                    "1": "Вы точно хотите удалить 1 строку?"
                }
            },
            "multi": {
                "restore": "Отменить изменения",
                "title": "Несколько значений",
                "info": "Выбранные элементы содержат разные значения для этого входа. Чтобы отредактировать и установить для всех элементов этого ввода одинаковое значение, нажмите или коснитесь здесь, в противном случае они сохранят свои индивидуальные значения.",
                "noMulti": "Это поле должно редактироваться отдельно, а не как часть группы"
            },
            "error": {
                "system": "Возникла системная ошибка (<a target=\"\\\" rel=\"nofollow\" href=\"\\\">Подробнее<\/a>)."
            }
        },
        "searchPlaceholder": "Что ищете?",
        "stateRestore": {
            "creationModal": {
                "button": "Создать",
                "search": "Поиск",
                "columns": {
                    "search": "Поиск по столбцам",
                    "visible": "Видимость столбцов"
                },
                "name": "Имя:",
                "order": "Сортировка",
                "paging": "Страницы",
                "scroller": "Позиция прокрутки",
                "searchBuilder": "Редактор поиска",
                "select": "Выделение",
                "title": "Создать новое состояние",
                "toggleLabel": "Включает:"
            },
            "removeJoiner": "и",
            "removeSubmit": "Удалить",
            "renameButton": "Переименовать",
            "duplicateError": "Состояние с таким именем уже существует.",
            "emptyError": "Имя не может быть пустым.",
            "emptyStates": "Нет сохраненных состояний",
            "removeConfirm": "Вы уверены, что хотите удалить %s?",
            "removeError": "Не удалось удалить состояние.",
            "removeTitle": "Удалить состояние",
            "renameLabel": "Новое имя для %s:",
            "renameTitle": "Переименовать состояние"
        },
        "thousands": " "
    } 
  } );
} );
/* $(document).ready(function () {
  if($('#app-table').length > 0) {
  $('#app-table').DataTable({
    responsive: true,
    processing: true,
    serverSide: true,
    serverMethod: 'post',
    searchDelay: 500,
    ajax: {
      url: '/actions/',
      type: 'POST',
      data: {
        action: 'payments',
        id: action_id,
        fund: fund_id
      }
    },
    'columns': [
      { data: 'name' },
      { data: 'content' },
      { data: 'zayavitel' },
      { data: 'kvartira' },
      { data: 'kontakt' },
      { data: 'date' },
      { data: 'status' },
      { data: 'action' },
    ],
  });
  setTimeout(() => {
    const histTable = document.querySelectorAll(".hist__table")
    if (histTable) {
      histTable.forEach(item => {
        item.querySelector("tbody").querySelectorAll("tr td:nth-child(3)").forEach((el,idx) => {
          el.textContent = String(Math.trunc(String(el.textContent).replace(/[^0-9,\.]/g,""))).replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim()
        })
      })
    }
  }, 500);
}}); */


  