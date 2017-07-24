const bestPerYear = {
    data: function () {
        return {
            sharedState: store.state
        }
    },

    template: `
        <div>
            <div class="page-header">
                <h2 class="page-header__title">Best Movies per Year</h2>
                <p class="page-header__description">Your top rated movies in each year.</p>
            </div>
            <div class="ratings-list">
                <div class="year" v-for="year in Object.keys(bestPerYear).sort().reverse()">
                    <h2 class="year__title"><router-link :to="{ name: 'year', params: { year: year }}">{{ year }}</router-link></h2>
                    <div class="movie" v-for="(movie, index) in bestPerYear[year].movies">
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
        </div>       
    `,

    computed: {
        bestPerYear: function () {
            let arrayLength = this.sharedState.ratings.length;
            let bestPerYear = {};

            for (let i = 0; i < arrayLength; i++) {
                let movie = this.sharedState.ratings[i];
                let year = movie["Year"];
                let rating = movie["You rated"];

                if (!bestPerYear[year]) {
                    bestPerYear[year] = {
                        bestRating: rating,
                        movies: [movie]
                    }
                } else if (bestPerYear[year].bestRating < rating) {
                    bestPerYear[year].bestRating = rating;
                    bestPerYear[year].movies = [movie];
                } else if (bestPerYear[year].bestRating === rating) {
                    bestPerYear[year].movies.push(movie);
                }
            }

            return bestPerYear;
        }
    }
};