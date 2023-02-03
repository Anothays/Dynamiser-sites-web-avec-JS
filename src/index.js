document.addEventListener('DOMContentLoaded', () => {
    const cube = document.getElementById('cube')
    const btn = document.getElementById('btn')

    cube.addEventListener('click', (e) => {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        cube.style.animation = 'none';
        switch (randomNumber) {
            case 1: 
                cube.style.animation = 'bounce-1 2s linear';
                break;
            case 2:
                cube.style.animation = 'bounce-2 2s linear';
                break;
            case 3:
                cube.style.animation = 'bounce-3 2s linear';
                break;
            case 4:
                cube.style.animation = 'bounce-4 2s linear';
                break;
            case 5:
                cube.style.animation = 'bounce-5 2s linear';
                break;
            case 6:
                cube.style.animation = 'bounce-6 2s linear';
                break;
        }

        setTimeout(() => {
            cube.style.animation = 'spinAfterBounce 15s linear infinite';
          }, 2000);
    })

    btn.addEventListener('click', (e) => {
        console.log('BTN');
    })
})


