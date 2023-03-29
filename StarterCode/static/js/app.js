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
    
     
    d3.select("#selDataset").on("change", updateData);
    function updateData() {
        // Update Demographic Info
        let dropdownMenu = d3.select("#selDataset");
        let dataset = dropdownMenu.property("value");

        metadataPos = 0
        for (let j = 0; j < metadata.length; j++){
            if (metadata[j].id == dataset) {
                metadataPos = j;
            }



        let displayData = document.getElementById("sample-metadata");
        let ul = document.createElement("ul");
              
        for (let j = 0; j < metadata.length; j++){
        if (metadata[j].id == dataset) {
            for (key in metadata[j]) {
                displayData.innerHTML = "";
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(`${key}: ${metadata[j][key]}`));
                ul.appendChild(li);
                };
            }
        }
        displayData.appendChild(ul);

        //Update Bar Chart
        for (let k = 0; k < samples.length; k++) {
            if (samples[k].id == dataset) {
                let y = samples[k].otu_ids.slice(0,10);
                let x = samples[k].sample_values.slice(0,10);
                // console.log(samples[k].otu_ids.slice(1,10));
                let trace = {
                    x: x,
                    y: y,
                    text: samples[k].otu_labels,
                    type: "bar",
                    orientation: 'h'
                }
            
            }
        }    
    Plotly.newPlot("bar", trace);
    }

    
}));

function optionChanged(value) {
        // console.log(value);      
    }
