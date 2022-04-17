let enter = document.querySelector('.enter')
let tasks = document.querySelector('.tasks')
let plus = document.querySelector('.plus')
let input = document.querySelector('input')
let sort = document.querySelector('.sort')


enter.addEventListener('mouseover', (event) => {
    plus.style.backgroundColor = '#AA68FE'
})

enter.addEventListener('mouseout', (event) => {
    plus.style.backgroundColor = '#9953F1'
})

document.querySelector('.x').addEventListener('mouseover', (event) => {
    event.target.src = '/img/x-hover.png'
})

document.querySelector('.x').addEventListener('mouseout', (event) => {
    event.target.src = '/img/x.png'
})

document.querySelector('.x').addEventListener('click', (event) => {
    input.value = ''
})

enter.addEventListener('click', (event) => {
    if (input.value == '') {
        alert('Yazı əlavə edin')
    }
    else {
        tasks.style.display = 'flex'
        let task = document.createElement('div')
        task.classList.add('task')
        task.setAttribute('draggable', 'true')
        task.style.display = 'flex'
        task.style.justifyContent = 'space-between'
        task.innerHTML = `<p style="color:black;padding:0 2px;margin:10px 0">${input.value}</p><img src="/img/x.png" alt="" class="x-task">`
        tasks.append(task)
        input.value = ''
        let delet = document.querySelectorAll('.x-task')
    
        let allTasks = tasks.childNodes
        allTasks.forEach((e) => {
            e.addEventListener('dragstart', (e) => {
                e.target.classList.add('dragging');
              })
              e.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
              })
        })
    
        delet.forEach((event) => {
            event.addEventListener('click', (event) => {
                event.target.parentNode.remove()
            })
            event.addEventListener('mouseover', (event) => {
                event.target.src = '/img/x-hover.png'
            })
            event.addEventListener('mouseout', (event) => {
                event.target.src = '/img/x.png'
            })
        })    
    }
    
})

let positionObj = { offset: Number.NEGATIVE_INFINITY }

function distanceBetweenItemPositionAndDroppedPosition(item, droppedPosition) {
    const rect = item.getBoundingClientRect();
    return (droppedPosition - (rect.top + rect.height / 2));
}

tasks.addEventListener('dragover', (event) => {
    event.preventDefault()
})
tasks.addEventListener('drop', (event) => {
        event.preventDefault();
        const newDraggables = Array.from(document.querySelectorAll('.task:not(.dragging)'));
        positionObj = { offset: Number.NEGATIVE_INFINITY }
        newDraggables.forEach(item => {
            let offset = distanceBetweenItemPositionAndDroppedPosition(item, event.clientY);
            if (offset < 0 && offset > positionObj.offset) {
                positionObj.offset = offset;
                positionObj.element = item;
            }
        })
        const dragging = document.querySelector('.dragging');
        tasks.insertBefore(dragging, positionObj.element)
})

sort.addEventListener('click', (event) => {
    var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
  
    dir = "asc";
  
    while (switching) {
  
      switching = false;
      rows = tasks.childNodes;
      for (i = 1; i < (rows.length - 1) ; i++) {
        shouldSwitch = false;
        x = rows[i].querySelector('p');
        y = rows[i + 1].querySelector('p');
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            document.querySelector('.sort').src = '/img/sort2.png'
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            document.querySelector('.sort').src = '/img/sort.png'
            break;
          }
        }
      }
    
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
    
  })
