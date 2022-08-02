-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
drop table if exists authors;
drop table if exists books;

create table authors (
    name varchar not null,
    dob date,
    pob varchar
);

create table books (
    title varchar not null,
    released int not null,
    author_name varchar not null
);

insert into authors (name, dob, pob) values
('James Rollins', '1961-08-20', 'Chicago'),
('Lee Child', '1954-10-29', 'Coventry'),
('H.P. Lovecraft', '1890-08-20', 'Providence');

insert into books (title, released, author_name) values
('The Call of Cthulu', 1928, 'H.P. Lovecraft'),
('Black Order', 2006, 'James Rollins'),
('The 6th Extinction', 2014, 'James Rollins'),
('The Judas Strain', 2007, 'James Rollins'),
('Killing Floor', 1997, 'Lee Child'),
('The Sentinel', 2020, 'Lee Child');

