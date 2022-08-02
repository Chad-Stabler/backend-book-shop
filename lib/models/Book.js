const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;
  authors;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    this.authors = row.authors || [];
  }

  static async getAll() {
    const { rows } = await pool.query('select * from books;');

    return rows.map(row => new Book(row));
  }

  static async getBookById(id) {
    const { rows } = await pool.query(`select books.*, 
    coalesce(
    json_agg(to_jsonb(authors))
    filter (where authors.id is not null), '[]') as authors from books
    left join books_authors on books_authors.book_id = books.id
    left join authors on books_authors.author_id = authors.id
    where books.id=$1
    group by books.id;`, [id]);
    return new Book(rows[0]);
  }
}

module.exports = Book;
