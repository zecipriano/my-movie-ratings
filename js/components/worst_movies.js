const worstMovies = {
    data: function () {
        return {
            sharedState: store.state
        }
    },

    template: `
        <div>
            <div class="page-header">
                <h2 class="page-header__title">Worst Movies</h2>
                <p class="page-header__description">Worst movies EVER!</p>
            </div>
            <div class="movies-list">
                <div class="movie" v-for="(movie, index) in worstMovies">
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
        worstMovies: function () {
            let arrayLength = this.sharedState.ratings.length;
            let worstRating = 11;
            let worstMovies = [];

            for (let i = 0; i < arrayLength; i++) {
                let movie = this.sharedState.ratings[i];
                let rating = movie.userRating;

                if (rating < worstRating) {
                    worstMovies = [movie];
                    worstRating = rating;
                } else if (rating === worstRating) {
                    worstMovies.push(movie);
                }
            }

            return worstMovies.sort(
                function (a, b) {
                    return (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0);
                }
            ).reverse();
        }
    }
};