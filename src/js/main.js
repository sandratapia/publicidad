'use strict';
const dragElements = document.querySelectorAll('.drag');
const glassElements = document.querySelectorAll('.glass');
const emptyElement = document.querySelector('.empty');
let draggedElement;
let lastPositionDrag;
let disableDragEnd;

const events = {
  mobile: {
    start: 'touchstart',
    drag: 'touchmove',
    end: 'touchend',
    dragMove: (event) => dragMove(event, true)
  },
  desktop: {
    start: 'dragstart',
    drag: 'drag',
    end: 'dragend', dragMove: dragMove
  },
  commons: {
    dragStart: dragStart,
    dragEnd: dragEnd
  }
};

for(let element of dragElements) {
  element.addEventListener(events.mobile.start, events.commons.dragStart);
  element.addEventListener(events.mobile.drag, events.mobile.dragMove);
  element.addEventListener(events.mobile.end, events.commons.dragEnd);

  element.addEventListener(events.desktop.start, events.commons.dragStart);
  element.addEventListener(events.desktop.drag, events.desktop.dragMove);
  element.addEventListener(events.desktop.end, events.commons.dragEnd);

  element.addEventListener('dragleave', dragLeave);
}

function dragLeave (event) {
  dragElements.forEach((element) => {
    if(element === event.currentTarget) {
      element.style.display = 'none';
    }
  });
}

function dragStart(event){
  draggedElement = event.currentTarget;
}

function dragMove (event, mobile) {
  if(mobile) {
    lastPositionDrag = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);
  } else {
    lastPositionDrag = document.elementFromPoint(event.clientX, event.clientY);
  }
}

function dragEnd(event){
  if(!disableDragEnd) {
    event.preventDefault();
    event.stopPropagation();
    if(lastPositionDrag === getChildEmptyElement(lastPositionDrag) ) {
      dragDrop();
    } else {
      draggedElement.style.display = 'flex';
    }
    draggedElement = undefined;
  }

}

function getChildEmptyElement(lastPositionSelected) {
  let result;
  emptyElement.childNodes.forEach(child => {
    if(lastPositionSelected === child) {
      result = child;
    }
  });
  return result;
}

emptyElement.addEventListener('dragover', dragOver);
emptyElement.addEventListener('drop', drop);

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  event.stopPropagation();
  if(lastPositionDrag.parentNode === document){
    disableDragEnd = true;
    dragDrop();
  }
}

function dragDrop() {
  for(let i=0; i < dragElements.length ; i++) {
    if(dragElements[i] === draggedElement) {
      showNext(draggedElement, dragElements, i);
    }
  }
}

function showNext(draggedElement, draggedElements, index) {
  draggedElement.style.display = 'none';
  showNextGlassState(index);
  if(draggedElements.length > index + 1) {
    draggedElements[index+1].style.display = 'flex';
    draggedElements[index+1].style.flexDirection = 'column';
    draggedElements[index+1].style.justifyContent = 'flex-end';
  } else {
    finishMojito();
  }
}

function showNextGlassState(index) {
  if(glassElements.length > index +1) {
    glassElements[index].style.display = 'none';
    glassElements[index+1].style.display = 'initial';
    glassElements[index+1].classList.add('fade-in');
  }
}

function finishMojito(){
  setTimeout(() => {
    finishContainerInteractive();
    finishContainerInstructions();
    finishContainerDraggable();
  }, 1500);
}

function finishContainerInteractive() {
  let preparationContainer = document.querySelector('.container__mojito');
  let giftContainer = document.querySelector('.container__gift');
  let gift = document.querySelector('.gift');
  preparationContainer.style.display = 'none';
  giftContainer.style.display = 'inherit';
  gift.classList.add('animate__backInRight');
}

function finishContainerInstructions() {
  let instructions = document.querySelector('.instructions');
  let congratulations = document.querySelector('.congratulations');
  instructions.style.display = 'none';
  congratulations.style.display = 'block';
}

function finishContainerDraggable() {
  let dragDropImageContainer = document.querySelector('.drag__drop');
  dragDropImageContainer.style.display = 'none';
}