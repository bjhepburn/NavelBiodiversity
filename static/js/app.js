const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

let id = d3.select("#selDataset")

navelData = d3.json(url)
navelData.then((data => {

    let names = data.names;
    let metadata = data.metadata;
    let samples = data.samples;

    let select = document.getElementById("selDataset");
    for (let i = 0; i < names.length; i++) {
        let option = names[i];
        let element = document.createElement("option");
        element.textContent = option;
        element.value = option;
        select.appendChild(element);
    }
    
    let id = names[0];
    let currentDemo = metadata[0];
    let currentSample = samples[0];

    d3.select("#selDataset").on("change", updateData);

    function updateData() {
        // Update Demographic Info
        let dropdownMenu = d3.select("#selDataset");
        let dataset = dropdownMenu.property("value");
        for (let j = 0; j < metadata.length; j++){
            if (metadata[j].id == dataset) {
                currentDemo = metadata[j];
            }
        updateDemo(currentDemo);
        }
        // Update Sample Data
        for (let k = 0; k < samples.length; k++) {
            if (samples[k].id == dataset) {
                currentSample = samples[k];
            }
            updateBar(currentSample);
            updateBubble(currentSample);
        }
        // console.log(id,currentDemo,currentSample);
    }

    function updateDemo(demoData) {
        let displayData = document.getElementById("sample-metadata");
        let ul = document.createElement("ul");
        displayData.innerHTML = "";
        for (key in demoData) {        
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(`${key}: ${demoData[key]}`));
            ul.appendChild(li);
            };           
            displayData.appendChild(ul);
        }
    
        function updateBar(sampleData) {
            yArray = sampleData.otu_ids.slice(0,10);
            for (let i = 0; i < yArray.length; i++) {
                yArray[i] = `OTU ${yArray[i]}`;
            }
            yArray.reverse();
            xArray = sampleData.sample_values.slice(0,10);
            xArray.reverse();
            labelArray = sampleData.otu_labels.slice(0,10);
            let trace = [{
                type: 'bar',
                x: xArray,
                y: yArray,
                orientation: 'h'


            }];
            Plotly.newPlot('bar', trace);
        }
        
        function updateBubble(sampleData) {
            let trace = [{
                mode: 'markers',
                x: sampleData.otu_ids,
                y: sampleData.sample_values,
                marker: {
                    size: sampleData.sample_values,
                    color: sampleData.otu_ids
                },
                text: sampleData.otu_labels
            }]
            Plotly.newPlot('bubble',trace);
        }

        updateDemo(currentDemo);
        updateBar(currentSample);
        updateBubble(currentSample);
    
}));

function optionChanged(value) {
        // console.log(value);      
    }
