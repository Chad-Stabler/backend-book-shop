const pool = require('../utils/pool');

class Author {
  id;
  dob;
  pob;
  author_name;
  books;

  constructor(row) {
    this.id = row.id;
    this.dob = row.dob;
    this.author_name = row.author_name;
    this.books = row.books || [];
  }

  static async getAll() {
    const { rows } = await pool.query('select * from authors;');

    return rows.map(row => new Author(row));
  }

}

module.exports = Author;
