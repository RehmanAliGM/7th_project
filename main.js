let t_body = document.getElementById("tbody");
// let load_btn = document.getElementById("load-btn");
// let next_btn = document.getElementById("next-btn");
// let prev_btn = document.getElementById("prev-btn");
var to_be_skipped = 0; 

let convert_properties_to_table = (property) => {
    return `
            <table class="table table-bordered">
                <thead>
                    <th>Property</th>
                    <th>Code</th>
                    <th>Label</th>
                </thead>
                <tbody>
                <tr>
                <td>Medium</td><td>${property.medium.code}</td>  <td>${property.medium.label}</td>
                </tr>                
                <tr>
                <td>Fraction</td><td>${property.fraction.code}</td>  <td>${property.fraction.label}</td>
                </tr>
                </tbody>
            </table>
    `;
}

let load_data = (url) => {
    if (url) {
        t_body.innerHTML = `<tr><td colspan='5' class='text-center'><img class='m-auto' img src='./loader.svg' alt='Loading.....'></td></tr>`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                let observations = data.value;
                t_body.innerHTML = ``;
                observations.forEach(observation => {
                   
                    t_body.innerHTML += `
                    <tr>
                    <td>${observation.name}</td>
                    <td>${observation.description}</td>
                    <td>${convert_properties_to_table(observation.properties)}</td>
                    <td>${observation.observationType}</td>
                    <td>${observation.phenomenonTime}</td>
                    </tr>
                    `;
                });
            });
    } else {
        console.error("Error, URL not found..");
    }
}

let get_data = (option)=>{
    if(option=="first"){
        to_be_skipped = 0;
        load_data("https://sensorthings-wq.brgm-rec.fr/FROST-Server/v1.0/Datastreams");
    }else if(option=="prev"){
        if(to_be_skipped<1){
            alert("You are already on First Page");
        }else{
            to_be_skipped -=1;
            load_data("https://sensorthings-wq.brgm-rec.fr/FROST-Server/v1.0/Datastreams?$skip="+ (to_be_skipped*100))
        }
        
    }else if(option=="next"){
        
        to_be_skipped += 1;
        load_data("https://sensorthings-wq.brgm-rec.fr/FROST-Server/v1.0/Datastreams?$skip="+ (to_be_skipped*100))
    }
}








