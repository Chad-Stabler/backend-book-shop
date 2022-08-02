const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('get/books grabs all the books data', async () => {
    const res = await request(app).get('/books');
    expect(res.body.length).toEqual(6);
  });
  it('/books/:id should return data from a single book', async () => {
    const res = await request(app).get('/books/1');
    expect(res.body).toHaveProperty('id', '1');
    expect(res.body).toHaveProperty('title', 'The Call of Cthulu');
    expect(res.body).toHaveProperty('released', 1928);
    expect(res.body).toHaveProperty('authors');
    expect(res.body.authors[0]).toHaveProperty('dob');
    expect(res.body.authors[0]).toHaveProperty('pob');
    expect(res.body.authors[0]).toHaveProperty('id');
    expect(res.body.authors[0]).toHaveProperty('author_name');
  });
  it('/post should add new book to the array', async () => {
    const book = new Book({
      title: 'A new book',
      released: 2025
    });
    const res = await request(app).post('/books').send(book);
    expect(res.body.title).toEqual(book.title);
    expect(res.body.released).toEqual(book.released);
  });
  it('get/authors should return the list of authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(3);
  });
  afterAll(() => {
    pool.end();
  });
});
