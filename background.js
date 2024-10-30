chrome.runtime.onInstalled.addListener(() => {
    setupContextMenus("ltr");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.direction) setupContextMenus(request.direction);
    sendResponse({});
});

function setupContextMenus(currentDirection) {
    const menus = [
        { id: "convertToRTL", title: "RTL", direction: "rtl" },
        { id: "convertToLTR", title: "LTR", direction: "ltr" }
    ];

    chrome.contextMenus.removeAll(() => {
        menus.forEach(({ id, title, direction }) => {
            chrome.contextMenus.create({
                id,
                title: (currentDirection === direction ? "✓ " : "") + title,
                contexts: ["page", "selection"]
            });
        });
    });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
    const direction = info.menuItemId === "convertToRTL" ? "rtl" : "ltr";

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageDirection,
        args: [direction]
    });

    setupContextMenus(direction);
});

function setPageDirection(direction) {
    document.documentElement.dir = direction;
}
