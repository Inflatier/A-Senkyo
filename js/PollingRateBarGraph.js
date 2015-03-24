
var pollingRatesOfEachPlace = (function () {
    var pollingPlace = getPollingPlace();
	var dataSet = new Array(Object.keys(pollingPlace).length);
	var i = 0;
	for (var jsonKey in pollingPlace) {
		var item = pollingPlace[jsonKey];
		var rateHash = [
			//投票率
			Math.round(item["http://linkdata.org/property/rdf1s2540i#%E6%8A%95%E7%A5%A8%E7%8E%87%EF%BC%88%E5%B9%B3%E6%88%9025%E5%B9%B4%E5%B8%82%E9%95%B7%E9%81%B8%EF%BC%89"][0]["value"]),
			//選挙区の名前
			item["http://linkdata.org/property/rdf1s2540i#%E6%8A%95%E7%A5%A8%E6%89%80"][0]["value"],
		];
		dataSet[i] = rateHash;
		i++;
	}
	return [dataSet];
})();

function drawPollngRateBarGraph(divId, data) {
	/// <summary>既存の棒グラフを消してから、棒グラフを描画します</summary>

	document.getElementById(divId).innerHTML = "";

	jQuery.jqplot(
        divId,
        data,
		{
        	axes:{ 
        		yaxis: {
        			renderer: jQuery.jqplot.CategoryAxisRenderer,
        		},
        		xaxis: {
					formatString: "%d",
					ticks: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        		}
        	},
        	seriesDefaults: {
        		renderer: jQuery.jqplot.BarRenderer,
        		rendererOptions: {
        			barDirection: 'horizontal',
        			highlightColors: '#4682b4'
        		}
        	},
			animate: true
        }
    );
}

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	var activated_tab = e.target // activated tab
	var previous_tab = e.relatedTarget // previous tab

	if (activated_tab.hash == '#Rank') {
		drawPollngRateBarGraph('pollingRateBarGraph', pollingRatesOfEachPlace);
	}

});