function checkPageDirection() {
    const currentDirection = document.documentElement.dir || document.body.dir || 'ltr';
    sendDirectionToBackground(currentDirection);
}

function sendDirectionToBackground(direction) {
    chrome.runtime.sendMessage({ direction });
}

checkPageDirection();