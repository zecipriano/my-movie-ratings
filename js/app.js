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
                    this.ratings = results.data.filter(function (el) {
                        return el["Title type"] === "Feature Film"
                    });
                }.bind(this)
            });
        },

        populateBestPerYear: function () {
            var arrayLength = this.ratings.length;

            for (var i = 0; i < arrayLength; i++) {
                var movie = this.ratings[i];
                var year = movie["Year"];
                var rating = movie["You rated"];

                if (!this.bestPerYear[year]) {

                    Vue.set(this.bestPerYear, year, {
                        bestRating: rating,
                        movies: [movie]
                    });

                } else if (this.bestPerYear[year].bestRating < rating) {

                    this.bestPerYear[year].bestRating = rating;
                    this.bestPerYear[year].movies = [movie];

                } else if (this.bestPerYear[year].bestRating === rating) {

                    this.bestPerYear[year].movies.push(movie);

                }
            }
        }
    }
});
