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
        let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/1b4646d678ca3d602e91ca76a3aee6b9/${this.lat},${this.lng}?units=si`;
        fetch(url).then(response => {
            return response.json();
            
        }).then(data => {
            console.log(data); 
            document.querySelector("#weather").innerHTML =
                data.currently.temperature;
        }).catch(err => {
            console.log(err);
        });
    }

    errorLocation(err){
        console.log(err);
    }




    getMeal(){
        let url = `https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=soup&app_id=8759285f&app_key=f5a5b7640e2000c5b8e7939c82341ea9`;
        fetch(url).then(mealResponse => {
            return mealResponse.json();
        }).then(mealData => {
            console.log(mealData);
            console.log(Math.round(Math.random() * 10))
            document.querySelector("#meal").innerHTML = 
                mealData.hits[Math.round(Math.random() * 10)].recipe.label;
        }).catch(err => {
            console.log(err);
        })
    }

    
}

let app = new App();