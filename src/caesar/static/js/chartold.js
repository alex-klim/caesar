        google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(drawChart);
		var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
					'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
		var dictionary = {}
			for(var alpha in alphabet){
				dictionary[alpha] = {{ (text.match(/a/g)).length }};
			}
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['letter', 'frequency'],
          ['a', {{ (text.match(/a/g)).length }}],//8.17],
          ['b', 1.49],
          ['c', 2.78],
          ['d', 4.25],
          ['e', 12.7],
          ['f', 2.23],
          ['g', 2.02],
          ['h', 6.09],
          ['i', 6.97],
          ['j', 0.15],
          ['k', 0.77],
          ['l', 4.03],
          ['m', 2.41],
          ['n', 6.75],
          ['o', 7.51],
          ['p', 1.93],
          ['q', 0.1],
          ['r', 5.99],
          ['s', 6.33],
          ['t', 9.06],
          ['u', 2.76],
          ['v', 0.98],
          ['w', 2.36],
          ['x', 0.15],
          ['y', 1.97],
          ['z', 0.07]
          ]);
          
        var options = {
            chart:{
          title: 'Letter rates, frequency',
          legend: { position: 'none' },
            }
        };

        var chart = new google.charts.Bar(document.getElementById('chart_div'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
      }