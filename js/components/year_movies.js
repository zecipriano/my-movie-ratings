const yearMovies = {
    data: function () {
        return {
            sharedState: store.state,
            year: this.$route.params.year
        }
    },

    template: `
        <div>
            <h2 class="page-title">{{ year }}</h2>
            <div class="movies-list">
                <div class="movie" v-for="(movie, index) in yearMovies">
                    <h3 class="movie__title">
                        <a :href='movie["URL"]' target="_blank">
                            {{ movie["Title"] }}
                        </a>
                    </h3>
                    <p class="movie__ratings">
                        <span class="movie__user-rating"><i class="fa fa-user" aria-hidden="true"></i> {{ movie["You rated"] }}</span>
                        <span class="movie__all-users-rating"><i class="fa fa-users" aria-hidden="true"></i> {{ movie["IMDb Rating"] }}</span>
                    </p>
                </div>        
            </div>
        </div>
    `,

    computed: {
        yearMovies: function () {
            let yearMovies = this.sharedState.ratings.filter(function (el) {
                return el["Year"].toString() === this.year.toString();
            }.bind(this));

            yearMovies.sort(
                function (a, b) {
                    return (a["You rated"] > b["You rated"]) ? 1 : ((b["You rated"] > a["You rated"]) ? -1 : 0);
                }
            ).reverse();

            return yearMovies;
        }
    }
};