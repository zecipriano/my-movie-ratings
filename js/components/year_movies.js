const yearMovies = {
    data: function () {
        return {
            sharedState: store.state,
            year: this.$route.params.year
        }
    },

    template: `
        <div>
            <div class="page-header">
                <h2 class="page-header__title">{{ year }} Movies</h2>
                <p class="page-header__description">All the movies from {{ year}} that you rated, in order of preference.</p>
            </div>
            
            <div class="movies-list">
                <div class="movie" v-for="(movie, index) in yearMovies">
                    <h3 class="movie__title">
                        <a :href='movie.url' target="_blank">
                            {{ movie.title }}
                        </a>
                    </h3>
                    <p class="movie__ratings">
                        <span class="movie__user-rating"><i class="fa fa-user" aria-hidden="true"></i> {{ movie.userRating }}</span>
                        <span class="movie__all-users-rating"><i class="fa fa-users" aria-hidden="true"></i> {{ movie.imdbRating }}</span>
                    </p>
                </div>        
            </div>
        </div>
    `,

    computed: {
        yearMovies: function () {
            let yearMovies = this.sharedState.ratings.filter(function (el) {
                return el.year.toString() === this.year.toString();
            }.bind(this));

            yearMovies.sort(
                function (a, b) {
                    return (a.userRating > b.userRating) ? 1 : ((b.userRating > a.userRating) ? -1 : 0);
                }
            ).reverse();

            return yearMovies;
        }
    }
};