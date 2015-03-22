function setRegion() {
    var select = document.getElementById('selectRegion');
    select.innerHTML = '';
    
    for (var i = 0; i < setting.regions.length; i++) {
        var region = document.createElement('option');
        region.textContent = setting.regions[i];
        select.appendChild(region);
    }
}

function pollingPlacePanel(place) {
    /// <summary>投票所パネルオブジェクト</summary>
    /// <param name="place" type="Object">パネルの生成に使いたい情報を持ったオブジェクト</param>

    //パネルの状態の列挙体もどき
    var states = {
        EXPANDED: 1,
        EXPANDING: 2,
        COLLAPSING: 3,
        COLLAPSED: 4
    }
    
    var that = this;
    
    this.place = place;
    this.element = document.getElementById('panelElement').cloneNode(true);
    this.element.removeAttribute('id');
    this.element.style.display = "block";
    this.element.style.position = 'relative';
    this.element.style.height = '100%';
    this.head = this.element.getElementsByClassName('panel-heading')[0];
    this.body = this.element.getElementsByClassName('panel-body')[0];
    this.map = function() {return this.body.getElementsByClassName('mapdiv')[0];};
    this.placeName = this.head.getElementsByClassName('pollingPlaceName')[0];
    this.matchArea = this.head.getElementsByClassName('pollingMatchArea')[0];
    this.state = states.COLLAPSED;
    this.position = {
        x: that.element.offsetLeft,
        y: that.element.offsetTop - window.scrollY
    }
    this.size = {
        width: that.element.offsetWidth,
        height: that.element.offsetHeight
    }
    this.posSizeUpdate = function() {
        that.position.x = that.element.offsetLeft;
        that.position.y = that.element.offsetTop - window.scrollY;
        that.size.width = that.element.offsetWidth;
        that.size.height = that.element.offsetHeight;
    }
    this.popup = function(_that) {
        var that = _that;
        that.posSizeUpdate();
        that.state = states.EXPANDING;
        $(that.element)
        .css('left', that.element.parentElement.offsetLeft + 'px')
        .css('top', that.position.y)
        .css('width', that.size.width)
        .css('position', 'fixed')
        .css('z-index', '10')
        .animate(
            {
                'left': '2%',
                'top': '2%',
                'width': '96%',
                'height': '96%'
            }, 1000, function(){
                that.state = states.EXPANDED;
                var map = document.createElement('div');
                map.style.width = "100%";
                map.style.height = "650px";
                map.className = 'mapdiv';
                map.setAttribute('id', 'mapdiv');
                that.body.appendChild(map);
                var osm = document.createElement('script');
                osm.className = 'OSM';
                osm.src = 'js/OSM.js';
                osm.onload = function(){createStar(that.place.num)};
                that.body.appendChild(osm);
            });
        $(that.body)
        .animate(
            {
                'height': '100%',
                'opacity': '1.00',
                'padding': '15px'
            }, 1000);
    }
    this.close = function(_that) {
        var that = _that;
        that.state = states.COLLAPSING
        that.map().removeAttribute('id');
        if (that.body.getElementsByClassName('OSM')[0]) {
            that.body.removeChild(that.body.getElementsByClassName('OSM')[0]);
        }
        if (that.body.getElementsByClassName('mapdiv')[0]) {
            that.body.removeChild(that.body.getElementsByClassName('mapdiv')[0]);
        }
        that.body.getElementsByClassName('OSM')[0];
        $(that.element)
        .animate(
            {
                'left': that.position.x,
                'top': that.position.y,
                'width': that.size.width,
                'height': that.size.height
            }, 600, function(){
                $(that.element)
                .css('position', 'static')
                .css('width', '100%')
                .css('height', '')
                .css('left', '0%')
                .css('top', '0%')
                .css('z-index', '0');
                that.state = states.COLLAPSED;
            }
        );
        $(that.body)
        .animate(
            {
                'padding': '0px',
                'opacity': '0.00'
            }, 600);
    }
    this.switch = function(_that) {
        var that = _that;
        if (that.state == states.COLLAPSED) {
            that.popup(that);
        } else if (that.state == states.EXPANDED) {
            that.close(that);
        }
    }
    this.expand = function(_that) {
        var that = _that;
        that.state = states.EXPANDING;
        $(that.body)
        .css('visibility', 'visible')
        .animate(
            {
                'padding': '15px',
                'opacity': '1.00',
                'height': '100%'
            }
            , 700, 'swing', function(){
                that.state = states.EXPANDED;
            });
    }
    this.collapse = function(_that) {
        var that = _that;
        that.state = states.COLLAPSING;
        $(that.body)
        .animate(
            {
                'padding': '0px',
                'height': '0px',
                'opacity': '0.00',
            }, 700, 'swing', function() {
                that.state = states.COLLAPSED
            });
    }
    this.collapse(that);
    this.head.onmousedown = function() {
        this.style.backgroundColor = "#67acfc";
    }
    this.head.onmouseout = function() {
        this.style.backgroundColor = "rgb(232, 250, 255)";
    }
    this.head.onmouseup = function() {
        this.style.backgroundColor = "rgb(232, 250, 255)";
        that.switch(that);
    }
    this.body.style.opacity = '0.00';
    this.placeName.innerHTML = place.name;
    this.matchArea.innerHTML = place.matchAddress;
}

function createPollingPlaceList(list,text) {
	/// <summary>投票所のリストを作成します</summary>
	/// <param name="list" type="ulかol要素">投票所を反映するリストの要素</param>
	
    //listの子要素をすべて削除
    $(list).empty();
    panels = new Array();

    //ループ用インデックス
    var i = 0;

	for (var jsonKey in pollingPlace) {
		//jsonKey: 最上層の要素のキーのうち一つ
		var json = pollingPlace[jsonKey];

		//place: 投票所の名前と住所を持つオブジェクト
		var place = {
			num: json[""+setting.Num][0]["value"],
			name: json[""+setting.Name][0]["value"],
			address: json[""+setting.Address][0]["value"],
			latitude: json["http://www.w3.org/2003/01/geo/wgs84_pos#lat"][0]["value"],
			longitude: json["http://www.w3.org/2003/01/geo/wgs84_pos#long"][0]["value"],
			matchAddress: json[""+setting.matchAdd][0]["value"]
		}
		if (place.matchAddress.indexOf(text) >= 0) {
		    var panel = new pollingPlacePanel(place);
            panels.push(panel);
		    list.appendChild(panel.element);
            panel.posSizeUpdate();
		    $(panel.element)
            .css('left', '100%')
            .css('opacity', '0.00')
            .delay(100 * i).animate({ "left": "0%", "opacity": "1.00" }, 600, 'swing');
		i++;
		}
	}
}

var panels = new Array();

function initializeUI() {
    setRegion();
    var listElement = document.getElementById("pollingPlacesList");
    createPollingPlaceList(listElement, "");
}

initializeUI();