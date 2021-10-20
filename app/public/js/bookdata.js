const Books = {

    data() {
        return {
            "books" : undefined
        }
    },

    methods: {
        fetchBookData() {
            fetch('api/books/index.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });

        }
    },   

    created() {
        this.fetchBookData();
    }
}
  
Vue.createApp(Books).mount('#booksApp');