const toggleList = document.querySelector('#toggleList');
const listDiv = document.querySelector('.list');
const descriptionInput = document.querySelector('input.description');
const descriptionP = document.querySelector('p.description');
const descriptionButton = document.querySelector('button.description');
const listUL = listDiv.querySelector('ul');
const addItemInput = document.querySelector('input.addItemInput');
const addItemButton = document.querySelector('button.addItemButton');
const removeItemButton = document.querySelector('button.removeItemButton');
const lis = listUL.children;
const firstListItem = listUL.firstElementChild;
const lastListItem = listUL.lastElementChild;

// Attach All Buttons to List Item
function attachListItemButtons(li){
  let up = document.createElement('button');
  let down = document.createElement('button');
  let remove = document.createElement('button');

  up.classList.add('up');
  up.textContent = 'Up';

  down.classList.add('down');
  down.textContent = 'Down';

  remove.classList.add('remove');
  remove.textContent = 'Remove';

  li.appendChild(up);
  li.appendChild(down);
  li.appendChild(remove);
}


// Initializes the list on START (Ensures first and last items do not have useless buttons)
for(let i = 0; i < lis.length; i++){
  attachListItemButtons(lis[i]);
  if(i == 0){
    let up = lis[i].querySelector('.up');
    lis[i].removeChild(up);
  }
    if(i == --lis.length){
    let down = lis[i].querySelector('.down');
    lis[i].removeChild(down);
  }
}

//*----------- Down Button funcionality -----------*//

// Add down button to a li (Also rearranges to place downButton before the remove button)
function addDownButton(li){
  let downButton = document.createElement('button');
      downButton.classList.add('down');
      downButton.textContent = 'Down';
      li.appendChild(downButton);
      let removeButton = li.querySelector('.remove');
      li.insertBefore(downButton, removeButton);
}

// Remove Down Button from a li
function removeDownButton(li){
  let buttonDown = li.querySelector('.down');
      li.removeChild(buttonDown);
}

//*----------- Up Button funcionality -----------*//
// Add up button to a li (Also rearranges to place upButton first)
function addUpButton(li){
  let upButton = document.createElement('button');
      upButton.classList.add('up');
      upButton.textContent = 'Up';
      li.appendChild(upButton);
      let first = li.firstElementChild;
      li.insertBefore(upButton, first);
}

// Remove Up Button from a li
function removeUpButton(li){
  let buttonUp = li.querySelector('.up');
      li.removeChild(buttonUp);
}


//*----------- Main Event Listener for all 3 list item buttons -----------*//

listUL.addEventListener('click', (event) => {


//*----- Remove button event -----*//
  if(event.target.tagName == 'BUTTON' && event.target.className == 'remove') {
    let li = event.target.parentNode;
    let ul = li.parentNode;
    let previousLi = li.previousElementSibling;
    let nextLi = li.nextElementSibling;

    //This if statement is to ensure that IF the remove button is pressed on the first or last items it will remove the correct corresponding buttons
    if(previousLi != null || nextLi != null){
      if(previousLi == null){
        removeUpButton(nextLi);
      }

      if(nextLi == null){
        removeDownButton(previousLi);
      }
    }

    // Finally removes li after previous housekeeping
    ul.removeChild(li);
  }

//*----- Up button event -----*//
  if(event.target.tagName == 'BUTTON' && event.target.className == 'up') {
    let moveUpTarget = event.target.parentNode;
    let moveDownTarget = moveUpTarget.previousElementSibling;
    let ul = moveUpTarget.parentNode;
    if (moveDownTarget){
      ul.insertBefore(moveUpTarget, moveDownTarget);
    }

    // If the List item moving up is going to be the first
    if(moveUpTarget.previousElementSibling == null){
      removeUpButton(moveUpTarget); //remove up button from the now new first list item
      addUpButton(moveDownTarget); //add up button to the list item that was just moved down from first
    }

    // If list item moving up isfrom bottom of the list
    if(moveDownTarget.nextElementSibling == null){
      removeDownButton(moveDownTarget); //remove down button ffrom the li moving down
      addDownButton(moveUpTarget); //Add down button to the li moving up
    }
  }

//*----- Down button event -----*//
// Works the same as Up button event. Except reversed.
   if(event.target.tagName == 'BUTTON' && event.target.className == 'down') {
    let moveDownTarget = event.target.parentNode;
    let moveUpTarget = moveDownTarget.nextElementSibling;
    let ul = moveDownTarget.parentNode;
    if (moveUpTarget){
      ul.insertBefore(moveUpTarget, moveDownTarget);
    }

    if(moveDownTarget.nextElementSibling == null){
      removeDownButton(moveDownTarget);
      addDownButton(moveUpTarget);
    }

    if(moveUpTarget.previousElementSibling == null){
      removeUpButton(moveUpTarget);
      addUpButton(moveDownTarget);
    }

  }

}); // End of List Item Event Listener

//*----------- Toggle list to Show or Hide -----------*//

toggleList.addEventListener('click', () => {
                            if(listDiv.style.display == 'none'){
                              toggleList.textContent = 'Hide List';
                              listDiv.style.display = 'block';
                              } else {
                                toggleList.textContent = 'Show List';
                                listDiv.style.display = 'none';
                              }
});


//*----------- Change List Description -----------*//

descriptionButton.addEventListener('click', () => {
  descriptionP.innerHTML = descriptionInput.value + ':';
  descriptionInput.value = "";
});

descriptionP.title= "list description";


//*----------- Add Item Button -----------*//

// Must add down button to previous li and add it without a down button
addItemButton.addEventListener('click', () => {
  let ul = document.querySelector('ul');
  let li = document.createElement('li');
  li.textContent = addItemInput.value;
  attachListItemButtons(li);
  removeDownButton(li); // placed on bottom so it does not need a down button

  if(ul.lastElementChild != null){// checks to make sure this is run with at least 1 item in the list
    addDownButton(ul.lastElementChild); // adds a down button to the last item before i push a new item onto the list
  } else {
    removeUpButton(li); // removes Up button is this is run while no items are on the list (Only the remove button will be left)
  }
  ul.appendChild(li);
  addItemInput.value = "";
});

//*----------- Remove Item Button -----------*//

removeItemButton.addEventListener('click', () => {
  let ul = document.querySelector('ul');
  let li = document.querySelector('li:last-child');
  if(li != null){
    if(li.previousElementSibling != null){
      removeDownButton(li.previousElementSibling);
    }
    ul.removeChild(li);
  }
});
