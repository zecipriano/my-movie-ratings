const worstMovies = {
    data: function () {
        return {
            sharedState: store.state
        }
    },

    template: `
        <div class="movies-list">
            <div class="movie" v-for="(movie, index) in worstMovies">
                <h3 class="movie__title">
                    <a :href='movie["URL"]' target="_blank">
                        {{ movie["Title"] }}
                    </a>
                </h3>
                <p class="movie__year">{{ movie["Year"] }}</p>
                <p class="movie__ratings">
                    <span class="movie__user-rating"><i class="fa fa-user" aria-hidden="true"></i> {{ movie["You rated"] }}</span>
                    <span class="movie__all-users-rating"><i class="fa fa-users" aria-hidden="true"></i> {{ movie["IMDb Rating"] }}</span>
                </p>
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
                let rating = movie["You rated"];

                if (rating < worstRating) {
                    worstMovies = [movie];
                    worstRating = rating;
                } else if (rating === worstRating) {
                    worstMovies.push(movie);
                }
            }

            return worstMovies.sort(
                function (a, b) {
                    return (a["Year"] > b["Year"]) ? 1 : ((b["Year"] > a["Year"]) ? -1 : 0);
                }
            ).reverse();
        }
    }
};