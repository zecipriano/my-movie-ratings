const overratedMovies = {
    data: function () {
        return {
            sharedState: store.state
        }
    },

    template: `
        <div>
            <div class="page-header">
                <h2 class="page-header__title">Overrated Movies</h2>
                <p class="page-header__description">Movies that, in your opinion, are overrated.</p>
            </div>
            <div class="movies-list">
                <div class="movie" v-for="movie in overratedMovies">
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
        </div>
        
    `,

    computed: {
        overratedMovies: function () {
            let arrayLength = this.sharedState.ratings.length;

            let overratedMovies = this.sharedState.ratings.filter(function (el) {
                return el["You rated"] <= (el["IMDb Rating"] - 1);
            });

            return overratedMovies.sort(
                function (a, b) {
                    let aDiff = a["You rated"] - a["IMDb Rating"];
                    let bDiff = b["You rated"] - b["IMDb Rating"];
                    return (aDiff > bDiff) ? 1 : ((bDiff > aDiff) ? -1 : 0);
                }
            );
        }
    }
};