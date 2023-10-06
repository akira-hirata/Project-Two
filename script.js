const itemList = document.getElementById("item-list");
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


function addNewItem(e)
{
  e.preventDefault();

  const textValue = document.createTextNode(itemInput.value);
  const newItem = document.createElement('li');
  newItem.className = 'unchecked';
  let storage;

  if (textValue.textContent == '')
  {
    alert('Input is empty');
  } else
  {
    if (localStorage.getItem('item') === null)
    {
      storage = [];
      storage.push(textValue.textContent);
      localStorage.setItem('item', JSON.stringify(storage));
  
      newItem.appendChild(textValue);
  
      const button = document.createElement('button');
      button.className = 'remove-item btn-link text-red';
      const icon = document.createElement('i');
      icon.className = "fa-solid fa-xmark";
      button.appendChild(icon);
      newItem.appendChild(button);
    
      itemInput.value = '';
      itemList.appendChild(newItem);
    } else
    {
      storage = JSON.parse(localStorage.getItem('item'));
      if (storage.indexOf(textValue.textContent)  === -1)
      {
        storage.push(textValue.textContent);
        localStorage.setItem('item', JSON.stringify(storage));
  
        newItem.appendChild(textValue);
  
        const button = document.createElement('button');
        button.className = 'remove-item btn-link text-red';
        const icon = document.createElement('i');
        icon.className = "fa-solid fa-xmark";
        button.appendChild(icon);
        newItem.appendChild(button);
      
        itemInput.value = '';
        itemList.appendChild(newItem);
      } else
      {
        alert('Duplicate Item')
      }
    }
  }

  checkUI();
}

function createButton()
{
  const button = document.createElement('button');
  button.className = 'remove-item btn-link text-red';
  const i = createIcon();
  button.append(i);
}

function createIcon()
{
  const icon = document.createElement('i');
  icon.className = "fa-solid fa-xmark";
}

function removeItem(e)
{
  const storage = JSON.parse(localStorage.getItem('item'));
  if (e.target.parentElement.classList.contains('remove-item'))
  {
    const item = e.target.parentElement.parentElement.textContent;
    storage.splice(storage.indexOf(item), 1);
    localStorage.setItem('item', JSON.stringify(storage));
    e.target.parentElement.parentElement.remove();
  }
  checkUI();
}

function clearItems()
{
  if (itemList.childElementCount > 0)
  {
    while (itemList.childElementCount > 0)
    {
      itemList.firstElementChild.remove();
    }
  }
  localStorage.removeItem('item');
  checkUI();
}

function filterItems(e)
{
  const x = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll('li');

  items.forEach(item => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.includes(x))
    {
      item.style.display = 'flex';
    } else
    {
      item.style.display = 'none';
    }
  });
}

function checkItem(e)
{
  if (e.target.tagName == 'LI')
  {
    if (e.target.className == 'unchecked')
    {
      e.target.className = 'checked';
    } else if (e.target.className == 'checked')
    {
      e.target.className = 'unchecked';
    }
  } 

}

function checkStorage()
{
  const storage = JSON.parse(localStorage.getItem('item'));
  if (storage !== null)
  {
    storage.forEach(item => {
      const textValue = document.createTextNode(item);
      const newItem = document.createElement('li');
      newItem.className = 'unchecked'
      newItem.appendChild(textValue);
    
      const button = document.createElement('button');
      button.className = 'remove-item btn-link text-red';
      const icon = document.createElement('i');
      icon.className = "fa-solid fa-xmark";
      button.appendChild(icon);
      newItem.appendChild(button);
    
      itemList.appendChild(newItem);
      checkUI();
    });
  }
};

function checkUI()
{
  if (itemList.childElementCount === 0)
  {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else 
  {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}




itemForm.addEventListener('submit', addNewItem);
itemList.addEventListener('click', removeItem);
itemList.addEventListener('click', checkItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

checkUI();
checkStorage()


