const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

let names = []
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

    let id = '';
    // d3.selectAll("#selDataSet").on("change", optionChanged);

    function optionChanged(val) {
        id = val;
        document.getElementById("sample-metadata").innerHTML = "ID: " + id;
    }


    for (let j = 0; j < metadata.length; j++){
        if (metadata[j].id == id) {
            for (key in metadata[j]) {
                console.log(`${key}: ${metadata[j][key]}`);
            };
        };
    }

}));
