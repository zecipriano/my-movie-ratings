var app = new Vue({
    el: '#app',

    data: {
        ratings: null,
        posters: {}
    },

    watch: {
        ratings: function () {
            this.populatePosters();
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

                    axios.get('http://www.omdbapi.com/?i=' + imdbID, config)
                        .then(function (response) {
                            Vue.set(this.posters, response.data['imdbID'], response.data['Poster']);
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        },
    }

})
