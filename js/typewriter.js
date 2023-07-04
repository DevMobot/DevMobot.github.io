const textArray = ['Developer', 'Problem Solver', 'Coffeeholic', 'Freelancer'];
let currentTextIndex = 0;
let currentCharacterIndex = 0;
let isDeleting = false;
let typingDelay = 200; // Delay between typing each character
let erasingDelay = 100; // Delay before erasing starts

function typeText() {
    const typedText = document.querySelector('.typewriter');
    const currentText = textArray[currentTextIndex];

    if (isDeleting) {
        typedText.textContent = currentText.substring(0, currentCharacterIndex - 1);
        currentCharacterIndex--;
    } else {
        typedText.textContent = currentText.substring(0, currentCharacterIndex + 1);
        currentCharacterIndex++;
    }

    if (isDeleting) {
        typingDelay = erasingDelay;
    } else {
        typingDelay = 200;
    }

    if (!isDeleting && currentCharacterIndex === currentText.length) {
        isDeleting = true;
        typingDelay = 1000; // Delay before starting the erasing process
    }

    if (isDeleting && currentCharacterIndex === 0) {
        isDeleting = false;
        currentTextIndex++;
        if (currentTextIndex === textArray.length) {
            currentTextIndex = 0; // Loop back to the first text
        }
    }

    setTimeout(typeText, typingDelay);
}

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(typeText, 1500); // Delay before starting typing
});
