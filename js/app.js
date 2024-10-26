let store = {
    state: {
        ratings: null
    },

    setRatings(newRatings) {
        this.state.ratings = newRatings.filter(function (el) {
            return el['Title Type'].toLowerCase() === 'movie';
        }).map(function (el) {
            var normalized = {};

            normalized.directors = el['Directors'];
            normalized.imdbRating = el['IMDb Rating'];
            normalized.year = el['Year'];
            normalized.title = el['Title'];
            normalized.url = el['URL'];
            normalized.userRating = el['Your Rating'];

            return normalized;
        });
    },
};

const router = new VueRouter({
    routes: [
        { path: '/best-per-year', component: bestPerYear },
        { path: '/best-movies', component: bestMovies },
        { path: '/worst-movies', component: worstMovies },
        { path: '/year/:year', name: 'year', component: yearMovies },
        { path: '/overrated-movies', component: overratedMovies },
        { path: '/underrated-movies', component: underratedMovies },
        { path: '/directors', component: directors }
    ],
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
                    store.setRatings(results.data);
                }
            });

            router.push({ path: '/best-movies' });
        }
    }
});
