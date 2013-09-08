// Activate graph tabs
$('#graph_tabs a').click(function (e) { e.preventDefault(); $(this).tab('show'); });
$('#graph_tabs a[href="#energy"]').tab('show');

// Initialize graph datasets
var dataSet_focus = new TimeSeries();
var dataSet_happiness = new TimeSeries();
var dataSet_energy = new TimeSeries();
var dataSet_calmness = new TimeSeries();

// Build the Energy timeline
var timeline_energy = new SmoothieChart({ millisPerPixel: 20, maxValue:1, minValue:0, labels:{disabled:true}, grid: { strokeStyle: '#76767e', fillStyle:'rgb(37, 37, 40)', lineWidth: 0.3, millisPerLine: 1000, verticalSections: 4 }});
timeline_energy.addTimeSeries( dataSet_energy, { strokeStyle: 'rgba(74, 191, 61, 1)', fillStyle: 'rgba(74, 191, 61, 0.05)', lineWidth: 2 });
timeline_energy.streamTo(document.getElementById('livegraph_energy'), 5000);

// Build the Happiness timeline
var timeline_happiness = new SmoothieChart({ millisPerPixel: 20, maxValue:1, minValue:0, labels:{disabled:true}, grid: { strokeStyle: '#76767e', fillStyle:'rgb(37, 37, 40)', lineWidth: 0.3, millisPerLine: 1000, verticalSections: 4 }});
timeline_happiness.addTimeSeries(dataSet_happiness, { strokeStyle: 'rgba(61, 177, 191, 1)', fillStyle: 'rgba(74, 191, 61, 0.05)', lineWidth: 2 });
timeline_happiness.streamTo(document.getElementById('livegraph_happiness'), 5000);

// Build the Focus timeline
var timeline_focus = new SmoothieChart({ millisPerPixel: 20, maxValue:1, minValue:0, labels:{disabled:true}, grid: { strokeStyle: '#76767e', fillStyle:'rgb(37, 37, 40)', lineWidth: 0.3, millisPerLine: 1000, verticalSections: 4 }});
timeline_focus.addTimeSeries(dataSet_focus, { strokeStyle: 'rgba(211, 227, 35, 1)', fillStyle: 'rgba(74, 191, 61, 0.05)', lineWidth: 2 });
timeline_focus.streamTo(document.getElementById('livegraph_focus'), 5000);

// Build the Happiness timeline
var timeline_calmness = new SmoothieChart({ millisPerPixel: 20, maxValue:1, minValue:0, labels:{disabled:true}, grid: { strokeStyle: '#76767e', fillStyle:'rgb(37, 37, 40)', lineWidth: 0.3, millisPerLine: 1000, verticalSections: 4 }});
timeline_calmness.addTimeSeries(dataSet_calmness, { strokeStyle: 'rgba(181, 33, 176, 1)', fillStyle: 'rgba(74, 191, 61, 0.05)', lineWidth: 2 });
timeline_calmness.streamTo(document.getElementById('livegraph_calmness'), 5000);