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
