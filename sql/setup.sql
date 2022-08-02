-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
drop table if exists authors cascade;
drop table if exists books cascade;
drop table if exists books_authors cascade;

create table authors (
    id bigint generated always as identity primary key,
    author_name varchar not null,
    dob date,
    pob varchar
);

create table books (
    id bigint generated always as identity primary key,
    title varchar not null,
    released int not null
);


create table books_authors (
    id bigint generated always as identity,
    book_id int,
    author_id int,
    foreign key (book_id) references books(id),
    foreign key (author_id) references authors(id)
);


insert into authors (author_name, dob, pob) values
('James Rollins', '1961-08-20', 'Chicago'),
('Lee Child', '1954-10-29', 'Coventry'),
('H.P. Lovecraft', '1890-08-20', 'Providence');

insert into books (title, released) values
('The Call of Cthulu', 1928),
('Black Order', 2006),
('The 6th Extinction', 2014),
('The Judas Strain', 2007),
('Killing Floor', 1997),
('The Sentinel', 2020);

insert into books_authors (author_id, book_id) values
('3', '1');
