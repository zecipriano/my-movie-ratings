let store = {
    state: {
        ratings: null
    },

    setRatings(newRatings) {
        this.state.ratings = newRatings
    },
};

const about = {
    template: `
        <div>
            <p>This is a fake about page. Just to see the router working.</p>
            <p>Rhoncus odio? Montes velit, lundium egestas, elementum facilisis, tempor? Dis nisi integer, purus, porta penatibus? Montes! Lacus odio, tortor enim.</p>
            <p>Etiam proin porta? Amet vel cursus risus integer nec, montes eu dignissim ac amet augue adipiscing odio, massa egestas.</p>
        </div>`
};

const app = new Vue({
    el: '#app',

    router: new VueRouter({
        routes: [
            {path: '/best-per-year', component: bestPerYear},
            {path: '/about', component: about}
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
