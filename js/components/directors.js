const directors = {
    data: function () {
        return {
            sharedState: store.state
        }
    },

    template: `
        <div class="directors-list">
            <div class="director" v-for="director in directors">
                <h3 class="director__name">{{ director.name }}</h3>
                <p>Average rating of {{ director.avgRating }} in {{ director.movies.length }} movies.</p>
                
                <ul class="director__movies">
                    <li v-for="movie in director.movies">
                        <a :href='movie["URL"]' target="_blank">{{ movie["Title"] }}</a> <small>({{ movie["You rated"] }})</small>
                     </li>
                </ul>
            </div>
        </div>
    `,

    computed: {
        directors: function() {
            let arrayLength = this.sharedState.ratings.length;
            let directors = {};

            for (let i = 0; i < arrayLength; i++) {
                let currentMovie = this.sharedState.ratings[i];
                let currentDirectors = currentMovie["Directors"];
                let currentMovieRating = currentMovie["You rated"];

                if(currentDirectors && !directors[currentDirectors]) {
                    directors[currentDirectors] = {
                        avgRating: currentMovieRating,
                        movies: [currentMovie]
                    }
                } else if (currentDirectors) {
                    directors[currentDirectors].movies.push(currentMovie);
                    directors[currentDirectors].avgRating = this.calcAvgRating(directors[currentDirectors].movies);
                }
            }

            return Object.keys(directors).map(function (key) {
                directors[key].name = key;
                directors[key].movies.sort(function (a, b) {
                    return (a["You rated"] > b["You rated"] ? 1 : (b["You rated"] > a["You rated"] ? -1 : 0));
                }).reverse();
                return directors[key];
            }).filter(function (el) {
                return el.movies.length > 1;
            }).sort(function (a, b) {
                return (a.avgRating > b.avgRating ? 1 : (b.avgRating > a.avgRating ? -1 : 0));
            }).reverse();
        }
    },

    methods: {
        calcAvgRating: function (movies) {
            let sum = 0;

            for (let i = 0; i < movies.length; i++) {
                sum += movies[i]["You rated"];
            }

            return Math.round((sum / movies.length) * 10) / 10;
        }
    }
};