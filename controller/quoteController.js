const Quote = require('../model/quote.js');

// Get all quotes
const getQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find();
        res.json(quotes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a random quote
const getRandomQuote = async (req, res) => {
    try {
        const quotes = await Quote.find().select("text -_id");
        if (quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            res.json(quotes[randomIndex]);
        } else {
            res.status(404).json({ message: 'No quotes found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific quote
const getQuoteById = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (quote) {
            res.json(quote);
        } else {
            res.status(404).json({ message: 'Quote not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new quote
const addQuote = async (req, res) => {
    const quote = new Quote({
        text: req.body.text,
        author: req.body.author,
    });

    try {
        const newQuote = await quote.save();
        res.status(201).json(newQuote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a quote
const updateQuote = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (quote) {
            quote.text = req.body.text || quote.text;
            quote.author = req.body.author || quote.author;
            const updatedQuote = await quote.save();
            res.json(updatedQuote);
        } else {
            res.status(404).json({ message: 'Quote not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a quote
const deleteQuote = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (quote) {
            await quote.remove();
            res.json({ message: 'Quote deleted' });
        } else {
            res.status(404).json({ message: 'Quote not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const searchQuotes = async (req, res) => {
    try {
        const author = req.body.author;
        if (author) {
            const quotes = await Quote.find({ author: new RegExp(author, 'i') }).select("text -_id");
            res.json(quotes);
        } else {
            res.status(400).json({ message: 'Author not specified' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getQuotes,
    getRandomQuote,
    getQuoteById,
    addQuote,
    updateQuote,
    deleteQuote,
    searchQuotes
};
