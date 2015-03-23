function setTowns() {
    var t = document.getElementById('selectTown');
    var towns = getTowns();
    for (var i = 0; i < towns.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = towns[i];
        t.appendChild(opt);
    }
    return;
}

function getTownName(includeChoume) {
    var town = document.getElementById('selectTown');
    var index = town.selectedIndex;
    var str = town.options.item(index).value;
    if (includeChoume == true) {
        return str;
    } else {
        var kanjiNum = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        for (var i = 0; i < 10; i++) {
            var match = kanjiNum[i] + '丁目';
            var result = str.lastIndexOf(match);
            if (result > -1) {
                str = str.replace(match, "");
                return str;
            }
        }
        return str;
    }
}

function getChou() {
    var town = getTownName(true);
    var choume = (function() {
        var kanjiNum = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        for (var i = 0; i < 10; i++) {
            var match = kanjiNum[i] + '丁目';
            var result = town.lastIndexOf(match);
            if (result > -1) {
                return i + 1;
            }
        }
        return null;
    })();
    return choume;
}

function getBan() {
    var ban = document.getElementById('ban');
    return parseInt(ban.value);
}

function getGou() {
    var gou = document.getElementById('gou');
    if (gou.value == "") {
        return "";
    } else {
        return parseInt(gou.value);
    }
}

setTowns();
document.getElementById('SearchButton').onclick = function () {
    var id = judgeKwkm(getTownName(), getChou(), getBan(), getGou());
    window.alert(id);
};