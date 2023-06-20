// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');
const books = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', async(req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    try{
      //res.render('content/add', {title:'Books'})

      res.render('books/details', {title:'Books',  books: books})
    }catch(err){
      console.log(err);
    }

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', async(req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
   let newBook = new book({

      "Title":req.body.title,
        "Price": req.body.price,
        "Author":req.body.author,
        "Genre":req.body.genre
   });
   try {
    await newBook.save();
    res.redirect('/books')
   }catch(err){
    console.log(err);
    res.status(500).send(err);
   }

}); 

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', async(req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;
    try{
      let booksToEdit = await books.findById(id)
      res.render('books/details',{title:'Edit Books', books: booksToEdit});
    }catch(err){
      console.log(err);
      res.status(500).send(err);
    }
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', async(req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    let updatedBooks={
        "Title":req.body.title,
        "Price": req.body.price,
        "Author":req.body.author,
        "Genre":req.body.genre
    };
    try{
        await books.updateOne({_id:id}, updatedBooks);
        res.redirect('/books');
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }

});



// GET - process the delete by user id
router.get('/delete/:id', async(req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;
    try{
        await books.findByIdAndRemove(id);
        res.redirect('/books');
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});


module.exports = router;
