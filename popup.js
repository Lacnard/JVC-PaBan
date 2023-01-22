function fetchData() {
    chrome.storage.local.get(['clickCount'], function (result) {
        if (result.clickCount) {
            clickCount = result.clickCount;
            console.log('Click count loaded: ' + clickCount);
        }
    });
    chrome.storage.local.get(['nickname'], function (result) {
        if (result.nickname) {
            document.getElementById("nickname-input").value = result.nickname;
            console.log('Nickname loaded: ' + result.nickname);
            var nickname = result.nickname;
            fetch('https://www.jeuxvideo.com/sso/ajax_suggest_pseudo.php?pseudo=' + nickname)
                .then(response => response.text())
                .then(data => {
                    var jsonData = JSON.parse(data);
                    var result = jsonData.alias.map(function (alias) {
                        return alias.pseudo;
                    });
                    document.getElementById("scraped-content").innerHTML = result.join("<br>");
                });
        }
    });
}
document.getElementById("submit-button").addEventListener("click", function () {
    var nickname = document.getElementById("nickname-input").value;
    console.log(nickname);
    chrome.storage.local.set({ 'nickname': nickname }, function () {
        console.log('Nickname saved: ' + nickname);
    });
    fetchData();
});
let clickCount = 0;
document.getElementById("submit-button").addEventListener("click", function () {
    clickCount++;
    if (clickCount % 15 === 0) {
        window.open("https://www.jeuxvideo.com/profil/amaretsoncamion");
    }
});

fetchData();
