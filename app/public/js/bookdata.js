const Books = {

    data() {
        return {
            books : [],
            selectedBook : null,
            bookForm : {}
        }
    },

    methods: {
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        selectBook(b) {
            if (b == this.selectedBook) {
                return;
            }
            this.selectedBook = b;
            this.books = [];
            this.fetchBookData(this.selectedBook);
        },
        fetchBookData() {
            fetch('api/books/')
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
        },
        postNewBook(evt) {        
            console.log("Creating!", this.bookForm);

            fetch('api/books/create.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;

                    this.bookForm = {};
          });
        },
    },   

    created() {
        this.fetchBookData();
    }
}
  
Vue.createApp(Books).mount('#booksApp');