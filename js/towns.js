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
    if (ban.value == '') {
        return '';
    } else {
        return parseInt(ban.value);
    }
}

function getGou() {
    var gou = document.getElementById('gou');
    if (gou.value == "") {
        return "";
    } else {
        return parseInt(gou.value);
    }
}

function getPollingPlace(id) {
    if (id == 0) {
        return null;
    }
    /*
    if (loaded == false) {
        return {};
    }
    */
    var obj = pollingPlaceList['http://linkdata.org/resource/rdf1s3099i#' + id];
    var poll = {
        id: obj['http://linkdata.org/property/rdf1s3099i#%E6%8A%95%E7%A5%A8%E5%8C%BA'][0].value,
        name: obj['http://linkdata.org/property/rdf1s3099i#%E6%8A%95%E7%A5%A8%E6%89%80'][0].value,
        place: obj['http://linkdata.org/property/rdf1s3099i#%E6%8A%95%E7%A5%A8%E6%89%80%E4%BD%8F%E6%89%80'][0].value,
        lat: obj['http://www.w3.org/2003/01/geo/wgs84_pos#lat'][0].value,
        long: obj['http://www.w3.org/2003/01/geo/wgs84_pos#long'][0].value,
        match: obj['http://linkdata.org/property/rdf1s3099i#%E8%A9%B2%E5%BD%93%E4%BD%8F%E6%89%80'][0].value
    }
    return poll;
}

setTowns();
document.getElementById('SearchButton').onclick = function () {
    var id = judgeKwkm(getTownName(), getChou(), getBan(), getGou());
    window.alert(getPollingPlace(id).name);
    console.log(getPollingPlace(id));
};

/*
var pollingPlaceList;
var loaded = true;
$.getJSON('../data/tsuzukiku_senkyoku_rdf.json', function(data) {
    pollingPlaceList = data;
    loaded = true;
});
*/