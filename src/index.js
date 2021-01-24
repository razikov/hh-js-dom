function init() {
    const source = document.getElementById("source");
    const gridBox = document.getElementById("gridBox");
    const freeBox = document.getElementById("freeBox");

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const intersect = (point, element) => {
        if (
            point.y >= element.offsetTop 
            && point.y <= element.offsetTop + element.clientHeight
            && point.x >= element.offsetLeft
            && point.x <= element.offsetLeft + element.clientWidth
        ) {
            return true;
        }
        return false;
    }

    let count = 0;

    source.onpointerdown = (event) => {
        count++;
        const clonedSource = source.cloneNode();
        const color = getRandomColor();
        clonedSource.style.backgroundColor = color;
        clonedSource.classList.remove("source");
        clonedSource.classList.add("cloned-source");
        clonedSource.id = `cloned-${count}`;
        document.body.append(clonedSource);
        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            clonedSource.style.left = pageX - clonedSource.offsetWidth / 2 + 'px';
            clonedSource.style.top = pageY - clonedSource.offsetHeight / 2 + 'px';
        }

        function onCustomPointerMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('pointermove', onCustomPointerMove);

        clonedSource.onpointerup = (event) => {
            document.removeEventListener('pointermove', onCustomPointerMove);
            let cursorPoint = {x: event.pageX, y: event.pageY};

            if (intersect(cursorPoint, gridBox)) {
                clonedSource.onpointerup = null;
                clonedSource.remove();
                clonedSource.style.position = 'static';
                gridBox.append(clonedSource);
            } else if (intersect(cursorPoint, freeBox)) {
                clonedSource.onpointerup = null;
                clonedSource.remove();
                freeBox.append(clonedSource);
                moveAt(cursorPoint.x - freeBox.offsetLeft, cursorPoint.y - freeBox.offsetTop);
            } else {
                clonedSource.onpointerup = null;
                clonedSource.remove();
            }
        };
    };
}

document.addEventListener("DOMContentLoaded", function(event) { 
    init();
});
