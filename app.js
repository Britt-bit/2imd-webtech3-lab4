class App {
    constructor(){
        this.getLocation();
        this.lat;
        this.lng;
    }

    getLocation(){
        navigator.geolocation.getCurrentPosition(
            this.gotLocation.bind(this), 
            this.errorLocation.bind(this)
        );  
    }

    gotLocation(result){
        this.lat = result.coords.latitude;
        this.lng = result.coords.longitude;
        this.getWeather();
        this.getMeal();
    }


    getWeather(){
        let temperature = localStorage.getItem("temperature");
        let description = localStorage.getItem("description");
        setTimeout(() => {localStorage.removeItem("temperature");}, 1000*60*60);
        setTimeout(() => {localStorage.removeItem("description");}, 1000*60*60);
        if (temperature == null || temperature == "null"){
            console.log("nodata");
            let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/1b4646d678ca3d602e91ca76a3aee6b9/${this.lat},${this.lng}?units=si`;
            fetch(url).then(response => {
                return response.json();
            }).then(data => {
                console.log(data); 
                temperature = localStorage.setItem("temperature", (data.currently.temperature));
                description = localStorage.setItem("description", (data.currently.summary));
                document.querySelector("#weather").innerHTML =
                    data.currently.temperature + " " +data.currently.summary;
                
            }).catch(err => {
                console.log(err);
            });
        } else {
            console.log("data from storage")
            document.querySelector("#weather").innerHTML =
                    localStorage.getItem("temperature") + " " + localStorage.getItem("description");
        }
        }
        
        errorLocation(err){
            console.log(err);
        }






    getMeal(){
        let t = document.querySelector("#weather"), htmlContent = t.innerHTML;
        let random = Math.round(Math.random() * 10);
        if (htmlContent < 16){
            let url = `https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=warm&app_id=8759285f&app_key=f5a5b7640e2000c5b8e7939c82341ea9`;
            fetch(url).then(mealResponse => {
                return mealResponse.json();
            }).then(mealData => {
                document.querySelector("#meal").innerHTML = 
                    mealData.hits[random].recipe.label + " for the cold weather";
                document.querySelector("#mealImage").src = 
                    mealData.hits[random].recipe.image;
            }).catch(err => {
                console.log(err);
            })
        } else {
            let url = `https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=cold&app_id=8759285f&app_key=f5a5b7640e2000c5b8e7939c82341ea9`;
            fetch(url).then(mealResponse => {
                return mealResponse.json();
            }).then(mealData => {
                document.querySelector("#meal").innerHTML = 
                    mealData.hits[random].recipe.label + " for the warm weather";
                document.querySelector("#mealImage").src = 
                    mealData.hits[random].recipe.image;
            }).catch(err => {
                console.log(err);
            })
        }


        // if temperature = > 17° warm meal else cold meal
        // mooie interface maken met reclame voor hellofresh
        
    }

    
}

let app = new App();