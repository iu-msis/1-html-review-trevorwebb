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
        },
        postBook(evt) {
            console.log ("Test:", this.selectedBook);
          if (this.selectedBook) {
              this.postEditBook(evt);
          } else {
              this.postNewBook(evt);
          }
        },
        postEditBook(evt) {
            this.bookForm.bookId = this.selectedBook.bookId;        
            
            console.log("Editing!", this.bookForm);
    
            fetch('api/books/update.php', {
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
                
                // reset the form
                this.handleResetEdit();
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
                
                // reset the form
                this.handleResetEdit();
            })
            .catch( err => {
                alert("Something went horribly wrong.");
            });
        },
        postDeleteBook(b) {  
            if ( !confirm("Are you sure you want to delete the book " + b.title + "?") ) {
                return;
            }  
            
            console.log("Delete!", b);
    
            fetch('api/books/delete.php', {
                method:'POST',
                body: JSON.stringify(b),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
                
                // reset the form
                this.handleResetEdit();
              });
          },
          handleEditBook(book) {
              this.selectedBook = book;
              this.bookForm = Object.assign({}, this.selectedBook);
          },
          handleResetEdit() {
              this.selectedBook = null;
              this.bookForm = {};
          }
    },   

    created() {
        this.fetchBookData();
    }
}
  
Vue.createApp(Books).mount('#booksApp');