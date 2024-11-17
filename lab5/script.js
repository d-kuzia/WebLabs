document.addEventListener('DOMContentLoaded', function() {
    // 2
    function calculateRectangleArea(width, height) {
      return width * height;
    }
  
    const width = 10;
    const height = 5;
    const area = calculateRectangleArea(width, height);
  
    const mainContent = document.querySelector('.main-content');
    const areaResult = document.createElement('p');
    areaResult.textContent = `Площа прямокутника: ${area}`;
    mainContent.appendChild(areaResult);
  
    // 3
    function createNumberForm() {
      const form = document.createElement('form');
      form.id = 'numberForm';
      for (let i = 1; i <= 10; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.name = `number${i}`;
        input.required = true;
        input.setAttribute('aria-label', `Число ${i}`);
        form.appendChild(input);
      }
      const submitButton = document.createElement('button');
      submitButton.type = 'submit';
      submitButton.textContent = 'Знайти мінімальне число';
      form.appendChild(submitButton);
      return form;
    }
  
    function findMinNumber(numbers) {
      return Math.min(...numbers);
    }
  
    function setCookie(name, value, days) {
      const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `${name}=${value}; expires=${expires}; path=/`;
    }
  
    function getCookie(name) {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
          return cookieValue;
        }
      }
      return null;
    }
  
    function deleteCookie(name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  
    const minNumberCookie = getCookie('minNumber');
  
    if (minNumberCookie) {
      if (confirm(`Збережене мінімальне число: ${minNumberCookie}. Зберегти ці дані?`)) {
        alert('Дані збережено в cookies. Будь ласка, перезавантажте сторінку.');
      } else {
        deleteCookie('minNumber');
        location.reload();
      }
    } else {
      const numberForm = createNumberForm();
      mainContent.appendChild(numberForm);
  
      numberForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const numbers = Array.from(formData.values()).map(Number);
        const minNumber = findMinNumber(numbers);
        alert(`Мінімальне число: ${minNumber}`);
        setCookie('minNumber', minNumber, 7);
        location.reload();
      });
    }
  
    // 4
    const titleBlock = document.querySelector('.title');
    const titleText = titleBlock.querySelector('h3');
  
    const italicsContainer = document.createElement('div');
    italicsContainer.style.display = 'inline-block';
    italicsContainer.style.marginLeft = '10px';
  
    const italicsCheckbox = document.createElement('input');
    italicsCheckbox.type = 'checkbox';
    italicsCheckbox.id = 'italicsToggle';
  
    const italicsLabel = document.createElement('label');
    italicsLabel.htmlFor = 'italicsToggle';
    italicsLabel.textContent = 'Курсив для заголовка';
  
    italicsContainer.appendChild(italicsCheckbox);
    italicsContainer.appendChild(italicsLabel);
  
    titleText.insertAdjacentElement('afterend', italicsContainer);
  
    function setItalics(isItalic) {
      titleText.style.fontStyle = isItalic ? 'italic' : 'normal';
      localStorage.setItem('titleItalics', isItalic);
    }
  
    const savedItalics = localStorage.getItem('titleItalics');
    if (savedItalics !== null) {
      const isItalic = savedItalics === 'true';
      italicsCheckbox.checked = isItalic;
      setItalics(isItalic);
    }
  
    italicsCheckbox.addEventListener('change', function() {
      setItalics(this.checked);
    });
  
    document.addEventListener('keypress', function() {
      if (italicsCheckbox.checked) {
        setItalics(true);
      }
    });
  });