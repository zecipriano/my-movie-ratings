var app = new Vue({
    el: '#app',

    data: {
        ratings: null,
        posters: {},
        bestPerYear: {}
    },

    watch: {
        ratings: function () {
            this.populatePosters();
            this.populateBestPerYear();
        }
    },

    methods: {
        onFileChange: function(e) {
            var files = e.target.files || e.dataTransfer.files;

            Papa.parse(files[0], {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: function(results) {
                    this.ratings = results.data;
                }.bind(this)
            });
        },

        populatePosters: function() {
            var arrayLength = this.ratings.length;

            for (var i = 0; i < arrayLength; i++) {

                if(this.ratings[i]["Poster"] == null) {
                    var imdbID = this.ratings[i]["const"];

                    var config = {
                        paramsSerializer: { arrayIndex : i }
                    }

                    axios.get('https://www.omdbapi.com/?i=' + imdbID, config)
                        .then(function (response) {
                            console.log(response);
                            Vue.set(this.posters, response.data['imdbID'], response.data['Poster']);
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        },

        populateBestPerYear: function() {
            var arrayLength = this.ratings.length;

            for (var i = 0; i < arrayLength; i++) {
                var movie = this.ratings[i];

                if(!this.bestPerYear[movie["Year"]]) {

                    Vue.set(this.bestPerYear, movie["Year"], { bestRating: movie["You rated"], movies: [movie]});

                } else if (this.bestPerYear[movie["Year"]].bestRating < movie["You rated"]) {

                    Vue.set(this.bestPerYear[movie["Year"]], "bestRating", movie["You rated"]);
                    Vue.set(this.bestPerYear[movie["Year"]], "movies", [movie]);

                } else if (this.bestPerYear[movie["Year"]].bestRating === movie["You rated"]) {

                    this.bestPerYear[movie["Year"]].movies.push(movie);

                }
            }
        }
    }

})
