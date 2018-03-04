const bestMovies = {
    data: function () {
        return {
            sharedState: store.state
        }
    },

    template: `
        <div>
            <div class="page-header">
                <h2 class="page-header__title">Best Movies</h2>
                <p class="page-header__description">Your top rated movies of all time.</p>
            </div>
                        
            <div class="movies-list">
                <div class="movie" v-for="movie in bestMovies">
                    <h3 class="movie__title">
                        <a :href='movie.url' target="_blank">
                            {{ movie.title }}
                        </a>
                    </h3>
                    <p class="movie__year">{{ movie.year }}</p>
                    <p class="movie__ratings">
                        <span class="movie__user-rating"><i class="fa fa-user" aria-hidden="true"></i> {{ movie.userRating }}</span>
                        <span class="movie__all-users-rating"><i class="fa fa-users" aria-hidden="true"></i> {{ movie.imdbRating }}</span>
                    </p>
                </div>        
            </div>
        </div>
    `,

    computed: {
        bestMovies: function () {
            let arrayLength = this.sharedState.ratings.length;
            let bestRating = 0;
            let bestMovies = [];

            for (let i = 0; i < arrayLength; i++) {
                let movie = this.sharedState.ratings[i];
                let rating = movie.userRating;

                if (rating > bestRating) {
                    bestMovies = [movie];
                    bestRating = rating;
                } else if (rating === bestRating) {
                    bestMovies.push(movie);
                }
            }

            return bestMovies.sort(
                function (a, b) {
                    return (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0);
                }
            ).reverse();
        }
    }
};