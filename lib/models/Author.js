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
    this.pob = row.pob;
    this.author_name = row.author_name;
    this.books = row.books || [];
  }

  static async getAll() {
    const { rows } = await pool.query('select * from authors;');

    return rows.map(row => new Author(row));
  }
  static async getAuthById(id) {
    const { rows } = await pool.query(`select authors.*, 
    coalesce(
    json_agg(to_jsonb(books))
    filter (where books.id is not null), '[]') as books from authors
    left join books_authors on books_authors.author_id = authors.id
    left join books on books_authors.book_id = books.id
    where authors.id=$1
    group by authors.id;`, [id]);
    return new Author(rows[0]);
  }

  static async addAuthor(author) {
    const { rows } = await pool.query('insert into authors (author_name, dob, pob) values ($1, $2, $3) returning *;', [author.author_name, author.dob, author.pob]);
    return new Author(rows[0]);
  }

}

module.exports = Author;
