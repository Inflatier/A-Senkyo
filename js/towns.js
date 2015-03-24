//コンボボックスに町名を羅列していきます。最初の一回だけの呼び出しを想定しています。
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

//町名を返します。第1引数にtrueを設定すると"◯丁目"を含めた町名、falseに設定または省略するとそれを除いた町名が文字列として返ります。
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

//丁目の値を数値で返します。丁目がない場合はnullを返します。
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

//番/番地の値を数値で返します。空の場合はnullを返します。ただし入力が数値以外の場合はNaNを返します。
function getBan() {
    var ban = document.getElementById('ban');
    if (ban.value == '') {
        return null;
    } else {
        return parseInt(ban.value);
    }
}

//号の値を数値で返します。空の場合はnullを返します。ただし入力が数値以外の場合はNaNを返します。
function getGou() {
    var gou = document.getElementById('gou');
    if (gou.value == '') {
        return null;
    } else {
        return parseInt(gou.value);
    }
}

//入力されたIDに対応する投票所のデータをオブジェクトとして返します。ただし、IDが0の場合はnullを返します。
/*
    {
        id: 投票所のID
        name: 投票所の名称
        place: 投票所の所在地
        lat: 投票所の緯度
        long: 投票所の軽度
        match: 投票所の該当地区
    }
*/
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

function checkInput() {
    var name = getTownName();
    var chou = getChou();
    var ban = getBan();
    var gou = getGou();
    var err = "";
    if (ban == null || ban == NaN || ban < 1) {
        err += "番もしくは番地を1以上の整数で入力してください。<br />";
    }
    if (gou == NaN ) {
        err += "号は1以上の整数で入力してください。";
    }
    if (err != "") {
        $(document.getElementById('info').parentNode)
            .removeClass('panel-info')
            .addClass('panel-danger');
        document.getElementById('info').innerHTML = err;
        return;
    } else {
        $(document.getElementById('info').parentNode)
            .removeClass('panel-danger')
            .addClass('panel-info');
        document.getElementById('info').innerHTML = '住所を入力してください。';
    }
    var id = judgeKwkm(getTownName(), getChou(), getBan(), getGou());
    window.alert(getPollingPlace(id).name);
    console.log(getPollingPlace(id));
}

setTowns();
document.getElementById('SearchButton').onclick = function () {
    checkInput();
};

/*
var pollingPlaceList;
var loaded = true;
$.getJSON('../data/tsuzukiku_senkyoku_rdf.json', function(data) {
    pollingPlaceList = data;
    loaded = true;
});
*/