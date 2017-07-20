let store = {
    state: {
        ratings: null
    },

    setRatings(newRatings) {
        this.state.ratings = newRatings
    },
};

const bestPerYear = {
    data: function () {
        return {
            sharedState: store.state
        }
    },

    template: `
        <div class="ratings-list">
            <div class="year" v-for="year in Object.keys(bestPerYear).sort().reverse()">
                <h2 class="year__title">{{ year }}</h2>
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

const about = {
    template: `
        <div>
            <p>This is a fake about page. Just to see the router working.</p>
            <p>Rhoncus odio? Montes velit, lundium egestas, elementum facilisis, tempor? Dis nisi integer, purus, porta penatibus? Montes! Lacus odio, tortor enim.</p>
            <p>Etiam proin porta? Amet vel cursus risus integer nec, montes eu dignissim ac amet augue adipiscing odio, massa egestas.</p>
        </div>`
};

const routes = [
    {path: '/best-per-year', component: bestPerYear},
    {path: '/about', component: about},
];

const router = new VueRouter({
    routes: routes
});

const app = new Vue({
    el: '#app',

    router: router,

    data: {
        sharedState: store.state,
    },

    methods: {
        onFileChange: function (e) {
            let files = e.target.files || e.dataTransfer.files;

            Papa.parse(files[0], {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: function (results) {
                    store.setRatings(results.data.filter(function (el) {
                        return el["Title type"] === "Feature Film"
                    }));
                }.bind(this)
            });
        }
    }
});
