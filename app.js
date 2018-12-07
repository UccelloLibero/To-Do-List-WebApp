const toggleList = document.getElementById('toggleList');
const listDiv = document.querySelector('.list');
const descriptionInput = document.querySelector('input.description');
const descriptionP = document.querySelector('p.description');
const descriptionButton = document.querySelector('button.description');
const listUl = listDiv.querySelector('ul');
const addItemInput = document.querySelector('input.addItemInput');
const addItemButton = document.querySelector('button.addItemButton');
const lis = listUl.children; // adding button to the existing list items
const firstListItem = listUl.firstElementChild;
const lastListItem = listUl.lastElementChild;
// const removeItemButton = document.querySelector('button.removeItemButton');
// const listItems = document.getElementsByTagName('li');


// Changing the selected element color, to prove funcionality of const firstElementChild & lastElementChild

firstListItem.style.backgroundColor = 'skyblue';
lastListItem.style.backgroundColor = 'lightyellow';

// Function that accepts a list item and attaches the needed buttons to it

function attachListItemButtons(li) {
  let up = document.createElement('button');
  up.className = 'up';
  up.textContent = 'Move Up!';
  li.appendChild(up);

  let down = document.createElement('button');
  down.className = 'down';
  down.textContent = 'Move Down!';
  li.appendChild(down);

  let remove = document.createElement('button');
  remove.className = 'remove';
  remove.textContent = 'Remove!';
  li.appendChild(remove);
}

// Loop through list item elements, calling the attachListItemButton function on each one
for (let i = 0; i < lis.length; i += 1) {
  attachListItemButtons(lis[i]);
}

// Listens to buttons -- users clicks -- in list itmes to execute the expected behaviour described in buttons names

listUl.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    if (event.target.className === 'remove') {
      let li = event.target.parentNode;
      let ul = li.parentNode;
      ul.removeChild(li);
    }
    if (event.target.className === 'up') {
      let li = event.target.parentNode;
      let prevLi = li.previousElementSibling;
      let ul = li.parentNode;
      if (prevLi) {
        ul.insertBefore(li, prevLi);
      }
    }
    if (event.target.className === 'down') {
      let li = event.target.parentNode;
      let nextLi = li.nextElementSibling;
      let ul = li.parentNode;
      if (nextLi) {
        ul.insertBefore(nextLi, li);
      }
    }
  }
});


/*
// Using ancestor of the list items (listDiv) and relying on event bubbling to handle the events
listDiv.addEventListener('mouseover', (event) => {
  if (event.target.tagName === 'LI') {
    event.target.textContent = event.target.textContent.toUpperCase();
  };
});
listDiv.addEventListener('mouseout', (event) => {
  if (event.target.tagName === 'LI') {
    event.target.textContent = event.target.textContent.toLowerCase();
  };
});
*/

/* Example of event handler where clicking anywhere on the page will be logged into the console

document.addEventListener('click', (event) => {
  console.log(event.target);
});
*/

/* Loop through all list items and attach individual handlers to each item
for (let i = 0; i < listItems.length; i += 1) {
  listItems[i].addEventListener('mouseover', () => {
    listItems[i].textContent = listItems[i].textContent.toUpperCase();
  });
  listItems[i].addEventListener('mouseout', () => {
    listItems[i].textContent = listItems[i].textContent.toLowerCase();
  });
};
*/

// Listens to hide / show the lists (clickable buttons)

toggleList.addEventListener('click', () => {
  if (listDiv.style.display === 'none') {
    toggleList.textContent = 'Hide List';
    listDiv.style.display = 'block';
  } else {
    toggleList.textContent = 'Show List';
    listDiv.style.display = 'none';
  }
});

// Changing the title of the list

descriptionButton.addEventListener('click', () => {
  descriptionP.innerHTML = descriptionInput.value + ':';
  // both work the same just different way of changing text content on page
  // paragraph.textContent = input.value + ':';
  descriptionInput.value = "";
});

// Add items to the list

addItemButton.addEventListener('click', () => {
  let ul = document.getElementsByTagName('ul')[0];
  let li = document.createElement('li');
  li.textContent = addItemInput.value;
  attachListItemButtons(li);
  ul.appendChild(li);
  addItemInput.value = "";
});

// Listens to position the items in list and remove the up / down button based on the positon of the list element

listUl.addEventListener('click', () => {
  for (let i = 0; i < lis.length; i += 1) {
    if (lis[i] == listUl.firstElementChild) {
      lis[i].querySelector('.up').style.opacity = '0';
    } else if (lis[i] == listUl.lastElementChild) {
      lis[i].querySelector('.down').style.display = 'none';
    } else if (lis[i] != listUl.firstElementChild) {
      lis[i].querySelector('.up').style.opacity = '1';
    } else if (lis[i] != listUl.lastElementChild) {
      lis[i].querySelector('.down').style.display = 'block';
    }
  }
});


/*
removeItemButton.addEventListener('click', () => {
  let ul = document.getElementsByTagName('ul')[0];
  let li = document.querySelector('li:last-child');
  ul.removeChild(li);
});
*/

descriptionP.title = 'List Description';
