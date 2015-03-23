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

function getSelectedTownName() {
    var town = document.getElementById('selectTown');
    var index = town.selectedIndex;
    return town.options.item(index).value;
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
