var app = new Vue({
    el: '#app',
    data: {
        ratings: null
    },
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;

            Papa.parse(files[0], {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: function(results) {
                    this.ratings = results.data;
                }.bind(this)
            });
        }
    }
})
