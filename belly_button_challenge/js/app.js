// define url to constant
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);
// d3.selectAll("#selDataset").on("change", function() {
//   console.log(this.value)
// });

// Function to build charts on initial load and again when a new test subject is selected

function chartBuilder(sampleId) {
// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  // console.log(data);


  const selectedSample = data.samples.find(O => O.id==sampleId);
    console.log(selectedSample);
  const selectedMeta = data.metadata.find(W => W.id==sampleId);
    console.log(selectedMeta);

  
  // Update panel with test subject metadata
  let infoBox = d3.select("#sample-metadata").text("");
    Object.entries(selectedMeta).forEach(([key, value]) => {
      infoBox.append("p").append("b").text(`${key}: ${value}`)
    });
  
  // Construction of bar graph
  let sample = selectedSample.sample_values;
  let labels = selectedSample.otu_ids;
  let hovertext = selectedSample.otu_labels;

  let barTitle = `<b>Top 10 OTU's Found in ID ${sampleId}`;

  let barTrace = {
    x: sample.slice(0, 10).reverse(),
    y: labels.slice(0, 10).map(labels => `OTU ${labels}`),
    text: hovertext.slice(0, 10).reverse(),
    type: 'bar',
    orientation: 'h',
    width: .9
    
  };

  let top10 = [barTrace];

  let barLayout = {
    title: barTitle, font: {size: 16}
  };

  Plotly.newPlot("bar", top10, barLayout);

  // construction of bubble chart

  let bubbleTitle = `<b>Top 20 OTUs for ID ${sampleId}`;
  let bubbleTrace = {
    x: labels.slice(0, 20),
    y: sample.slice(0, 20),
    text: hovertext.slice(0, 20),
    type: 'scatter',
    mode: 'markers',
    marker: {size: sample,
             color: labels,
             colorscale: 'Rainbow'},
  };

  let bubbleLayout = {
    title: bubbleTitle, font: {size: 20}
  };

  sampleBubble = [bubbleTrace];

  Plotly.newPlot("bubble", sampleBubble, bubbleLayout);


  // construction of washing gauge

  let washing = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: selectedMeta.wfreq,
      title: { text: "<b>Belly Button Washing Frequency</b> <br>Scrubs per Week", font: {size: 30}
    },
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 5 },
      gauge: {
        axis: { range: [null, 9], dtick: 1 },
        bar: {color: 'red', thickness: .3},
        bgcolor: 'red',
        steps: [
          { range: [0, 1], color: "#edeba7" },
          { range: [1, 2], color: "#ace5ee" },
          { range: [2, 3], color: "#abcdef" },
          { range: [3, 4], color: "#87cefa" },
          { range: [4, 5], color: "#1e90ff" },
          { range: [5, 6], color: "#4169e1" },
          { range: [6, 7], color: "#0000ff" },
          { range: [7, 8], color: "#3f00ff" },
          { range: [8, 9], color: "#00008b" }
        ],
      }
    }
  ];
  
  var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', washing, layout);

});
}

function initBB() {
  let choice = d3.select("#selDataset")
  d3.json(url).then(function(data) {
      let ids = data.names;
      let meta = data.metadata;
      ids.forEach(sampleId => {choice.append("option").text(sampleId).property("value", sampleId)
      });
      // console.log(meta);
  });
  chartBuilder(940);
};

// Function to update charts when a new ID is selected.
function optionChanged(sampleId) {
  chartBuilder(sampleId);
  console.log(sampleId);
}

initBB();

  // Contstruction of washing chart

  // Demographic Data update


  // Create a new element
  // let demoTable = data.metadata[4];
  // let infoBox = d3.select("#sample-metadata");
  // Object.entries(demoTable).forEach(([key, value]) => {
  //   infoBox.append("p").text(`${key}: ${value}`);
  // let personalData = d3.select("#sample-metadata").append("p");
  // personalData.text(demo);

// Use chaining to create a new element and set its text
  // let li2 = d3.select("panel-body").append("li").text("Another new item!");

  // d3.select("panel_body").append("li").text("Another new item!");
  // d3.select("panel_body").append("li").text("Another new item!");
    // person.text("MyText")


    // Call updatePlotly() when a change takes place to the DOM
//   d3.select("#selDataset").on("change", updatePlotly);

// // This function is called when a dropdown menu item is selected
// function updatePlotly() {
//   // Use D3 to select the dropdown menu
//   let dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   let chosenID = dropdownMenu.property("value");


// });

// d3.selectAll("#selDataset").on("change", function() {
//   console.log(this.value)
// });



// function initBB() {
//   let choice = d3.select("#selDataset")
//   d3.json(url).then(function(data) {
//       let ids = data.names;
//       ids.forEach(sampleId => {choice.append("option").text(sampleId).property("value", sampleId)
//       });
//       // buildCharts(ids[0]);
//       // populateDemoInfo(ids[0]);
//   });
// };

// function newChoice() {
  
// }
// initBB();


// Plotly.newPlot("plot", topOTUs, layout);
// console.log(data.metadata);
// let meta = data.map(function(datum) {
//   return datum.metadata;
//   });
//   console.log("Metadata:", meta);
// Create an array of category labels
// names = data.map(function (row){
//   return row.samples
// });

// let samples = data.map(row.samples);
// let labels = Object.keys(data);
// console.log(samples);
// console.log(labels);

// // Use sample_values as the values for the bar chart.

// // Use otu_ids as the labels for the bar chart.

// // Use otu_labels as the hovertext for the chart.

// // Initializes the page with a default plot
// function init() {
//   data = [{
//     x: samples,
//     labels: labels }];

//   Plotly.newPlot("plot", data);
// }

// // Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", updatePlotly);

        // buildCharts(ids[0]);
        // populateDemoInfo(ids[0]);