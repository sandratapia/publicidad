"use strict";const dragElements=document.querySelectorAll(".drag"),glassElements=document.querySelectorAll(".glass"),emptyElement=document.querySelector(".empty");let draggedElement,lastPositionDrag,disableDragEnd;const events={mobile:{start:"touchstart",drag:"touchmove",end:"touchend",dragMove:e=>dragMove(e,!0)},desktop:{start:"dragstart",drag:"drag",end:"dragend",dragMove:dragMove},commons:{dragStart:dragStart,dragEnd:dragEnd}};for(let e of dragElements)e.addEventListener(events.mobile.start,events.commons.dragStart),e.addEventListener(events.mobile.drag,events.mobile.dragMove),e.addEventListener(events.mobile.end,events.commons.dragEnd),e.addEventListener(events.desktop.start,events.commons.dragStart),e.addEventListener(events.desktop.drag,events.desktop.dragMove),e.addEventListener(events.desktop.end,events.commons.dragEnd),e.addEventListener("dragleave",dragLeave);function dragLeave(e){dragElements.forEach(t=>{t===e.currentTarget&&(t.style.display="none")})}function dragStart(e){draggedElement=e.currentTarget}function dragMove(e,t){lastPositionDrag=t?document.elementFromPoint(e.touches[0].clientX,e.touches[0].clientY):document.elementFromPoint(e.clientX,e.clientY)}function dragEnd(e){disableDragEnd||(e.preventDefault(),e.stopPropagation(),lastPositionDrag===getChildEmptyElement(lastPositionDrag)?dragDrop():draggedElement.style.display="flex",draggedElement=void 0)}function getChildEmptyElement(e){let t;return emptyElement.childNodes.forEach(n=>{e===n&&(t=n)}),t}function dragOver(e){e.preventDefault()}function drop(e){e.preventDefault(),e.stopPropagation(),lastPositionDrag.parentNode===document&&(disableDragEnd=!0,dragDrop())}function dragDrop(){for(let e=0;e<dragElements.length;e++)dragElements[e]===draggedElement&&showNext(draggedElement,dragElements,e)}function showNext(e,t,n){e.style.display="none",showNextGlassState(n),t.length>n+1?(t[n+1].style.display="flex",t[n+1].style.flexDirection="column",t[n+1].style.justifyContent="flex-end"):finishMojito()}function showNextGlassState(e){glassElements.length>e+1&&(glassElements[e].style.display="none",glassElements[e+1].style.display="initial",glassElements[e+1].classList.add("fade-in"))}function finishMojito(){setTimeout(()=>{finishContainerInteractive(),finishContainerInstructions(),finishContainerDraggable()},1500)}function finishContainerInteractive(){let e=document.querySelector(".container__mojito"),t=document.querySelector(".container__gift"),n=document.querySelector(".gift");e.style.display="none",t.style.display="inherit",n.classList.add("animate__backInRight")}function finishContainerInstructions(){let e=document.querySelector(".instructions"),t=document.querySelector(".congratulations");e.style.display="none",t.style.display="block"}function finishContainerDraggable(){document.querySelector(".drag__drop").style.display="none"}emptyElement.addEventListener("dragover",dragOver),emptyElement.addEventListener("drop",drop);