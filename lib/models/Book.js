const pool = require('../utils/pool');

class Book {
  book_id;
  title;
  released;
  author_name;

  constructor(row) {
    this.book_id = row.book_id;
    this.title = row.title;
    this.released = row.released;
    this.author_name = row.author_name;
  }

  static async getAll() {
    const { rows } = await pool.query('select * from books;');

    return rows.map(row => new Book(row));
  }
}

module.exports = Book;
