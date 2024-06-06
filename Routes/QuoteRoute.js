const express = require('express');
const router = express.Router();
const quoteController = require('../controller/quoteController');

router.get('/', quoteController.getQuotes);
router.get('/random', quoteController.getRandomQuote);
router.get('/:id', quoteController.getQuoteById);
router.post('/add', quoteController.addQuote);
router.put('/:id', quoteController.updateQuote);
router.delete('/:id', quoteController.deleteQuote);
router.post('/search', quoteController.searchQuotes);

module.exports = router;
