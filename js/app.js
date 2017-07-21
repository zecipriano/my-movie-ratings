let store = {
    state: {
        ratings: null
    },

    setRatings(newRatings) {
        this.state.ratings = newRatings
    },
};

const app = new Vue({
    el: '#app',

    router: new VueRouter({
        routes: [
            {path: '/best-per-year', component: bestPerYear},
            {path: '/best-movies', component: bestMovies},
            {path: '/worst-movies', component: worstMovies},
            {path: '/year/:year', name: 'year', component: yearMovies},
            {path: '/overrated-movies', component: overratedMovies}
        ],
    }),

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
