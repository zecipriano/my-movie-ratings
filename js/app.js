var app = new Vue({
    el: '#app',

    data: {
        ratings: null,
        bestPerYear: {}
    },

    watch: {
        ratings: function () {
            this.populateBestPerYear();
        }
    },

    methods: {
        onFileChange: function (e) {
            var files = e.target.files || e.dataTransfer.files;

            Papa.parse(files[0], {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: function (results) {
                    this.ratings = results.data;
                }.bind(this)
            });
        },

        populateBestPerYear: function () {
            var arrayLength = this.ratings.length;

            for (var i = 0; i < arrayLength; i++) {
                var movie = this.ratings[i];

                if (!this.bestPerYear[movie["Year"]]) {

                    Vue.set(this.bestPerYear, movie["Year"], {
                        bestRating: movie["You rated"],
                        movies: [movie]
                    });

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
