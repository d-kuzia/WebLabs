// Task 1 ------------------------------------------------------------------------------------------------------------
// Function to swap content of header and footer boxes
function swapHeaderFooterContent() {
  const headerBox = document.querySelector('.header .box');
  const footerBox = document.querySelector('.footer .box');
  const temp = headerBox.innerHTML;
  headerBox.innerHTML = footerBox.innerHTML;
  footerBox.innerHTML = temp;
}

// Task 2 ------------------------------------------------------------------------------------------------------------
// Function to calculate rectangle area
function calculateRectangleArea(width, height) {
  return width * height;
}

// Function to display rectangle area in main-content
function displayRectangleArea() {
  const width = 1012; // Example width
  const height = 2; // Example height
  const area = calculateRectangleArea(width, height);
  const mainContent = document.querySelector('.main-content');
  const areaElement = document.createElement('p');
  areaElement.textContent = `Площа прямокутника: ${area}`;
  mainContent.appendChild(areaElement);
}

// Task 3 ------------------------------------------------------------------------------------------------------------
// Function to find minimum numbers
function findMinimumNumbers(numbers) {
  const min = Math.min(...numbers);
  return numbers.filter(num => num === min).length;
}

// Function to handle form submission for minimum numbers
function handleMinimumNumbersForm(event) {
  event.preventDefault();
  const numbers = Array.from({ length: 10 }, (_, i) => parseFloat(event.target[`number${i + 1}`].value));
  const minCount = findMinimumNumbers(numbers);
  alert(`Кількість мінімальних чисел: ${minCount}`);
  setCookie('minNumbersCount', minCount, 1);
  location.reload();
}

// Function to set cookie
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

// Function to get cookie
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

// Function to delete cookie
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Function to handle cookie data
function handleCookieData() {
  const minNumbersCount = getCookie('minNumbersCount');
  if (minNumbersCount) {
      const keepCookie = confirm(`Збережено результат: ${minNumbersCount}. Зберегти дані?`);
      if (keepCookie) {
          alert('Дані збережено.');
      } else {
          deleteCookie('minNumbersCount');
          location.reload();
      }
  } else {
      createMinimumNumbersForm();
  }
}

// Function to create form for minimum numbers
function createMinimumNumbersForm() {
  const mainContent = document.querySelector('.main-content');
  const form = document.createElement('form');
  form.className = 'custom-form';
  form.innerHTML = `
      ${Array.from({ length: 10 }, (_, i) => `
          <input type="number" name="number${i + 1}" required>
      `).join('')}
      <button type="submit">Знайти мінімальні числа</button>
  `;
  form.addEventListener('submit', handleMinimumNumbersForm);
  mainContent.appendChild(form);
}

// Task 4 ------------------------------------------------------------------------------------------------------------
// Function to handle italic text
function handleItalicText() {
  const titleElement = document.querySelector('.title');
  const isItalic = localStorage.getItem('isTitleItalic') === 'true';
  
  // Контейнер для заголовка
  const titleTextContainer = document.createElement('div');
  titleTextContainer.className = 'title-text';
  titleTextContainer.style.fontStyle = isItalic ? 'italic' : 'normal';
  
  // Заголовок у новий контейнер
  titleTextContainer.appendChild(titleElement.querySelector('h3'));
  
  // Кконтейнер для чекбокса
  const checkboxContainer = document.createElement('div');
  checkboxContainer.className = 'italic-checkbox';
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'italicCheckbox';
  checkbox.checked = isItalic;
  
  const label = document.createElement('label');
  label.htmlFor = 'italicCheckbox';
  label.appendChild(document.createTextNode('Курсив'));
  
  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(label);
  
  // Додаємо нові контейнери
  titleElement.innerHTML = '';
  titleElement.appendChild(titleTextContainer);
  titleElement.appendChild(checkboxContainer);
  
  titleElement.style.display = 'flex';
  titleElement.style.justifyContent = 'space-between';
  titleElement.style.alignItems = 'center';
  
  checkbox.addEventListener('change', (event) => {
      const newIsItalic = event.target.checked;
      titleTextContainer.style.fontStyle = newIsItalic ? 'italic' : 'normal';
      localStorage.setItem('isTitleItalic', newIsItalic);
  });
}

// Task 5 ------------------------------------------------------------------------------------------------------------
// Function to handle custom CSS
function handleCustomCSS() {
  const footerBox = document.querySelector('.footer .box');
  footerBox.addEventListener('dblclick', createCSSForm);

  const savedCSS = JSON.parse(localStorage.getItem('customCSS') || '{}');
  Object.entries(savedCSS).forEach(([selector, rules]) => {
      applyCSS(selector, rules);
      createRemoveButton(selector);
  });
}

// Function to create CSS form
function createCSSForm() {
  const form = document.createElement('form');
  form.className = 'css-form';
  form.innerHTML = `
      <input type="text" name="selector" placeholder="CSS селектор" required>
      <input type="text" name="property" placeholder="CSS властивість" required>
      <input type="text" name="value" placeholder="Значення" required>
      <button type="submit">Застосувати CSS</button>
  `;
  form.addEventListener('submit', handleCSSSubmit);
  document.querySelector('.main-content').appendChild(form);
}

// Function to handle CSS submission
function handleCSSSubmit(event) {
  event.preventDefault();
  const selector = event.target.selector.value;
  const property = event.target.property.value;
  const value = event.target.value.value;
  const rules = `${property}: ${value};`;
  applyCSS(selector, rules);
  saveCSS(selector, rules);
  createRemoveButton(selector);
}

// Function to apply CSS
function applyCSS(selector, rules) {
  const style = document.createElement('style');
  style.textContent = `${selector} { ${rules} }`;
  document.head.appendChild(style);
}

// Function to save CSS to localStorage
function saveCSS(selector, rules) {
  const savedCSS = JSON.parse(localStorage.getItem('customCSS') || '{}');
  savedCSS[selector] = rules;
  localStorage.setItem('customCSS', JSON.stringify(savedCSS));
}

// Function to create remove button for CSS
function createRemoveButton(selector) {
  const button = document.createElement('button');
  button.textContent = `Видалити CSS для ${selector}`;
  button.className = 'remove-css-button';
  button.addEventListener('click', () => removeCSS(selector));
  document.querySelector('.pics-right-side').appendChild(button);
}

// Function to remove CSS
function removeCSS(selector) {
  const savedCSS = JSON.parse(localStorage.getItem('customCSS') || '{}');
  delete savedCSS[selector];
  localStorage.setItem('customCSS', JSON.stringify(savedCSS));
  location.reload();
}

// Main execution
document.addEventListener('DOMContentLoaded', () => {
  swapHeaderFooterContent();
  displayRectangleArea();
  handleCookieData();
  handleItalicText();
  handleCustomCSS();

  document.addEventListener('keypress', () => {
      const checkbox = document.querySelector('input[type="checkbox"]');
      if (checkbox && checkbox.checked) {
          document.querySelector('.title').style.fontStyle = 'italic';
      }
  });
});

