CREATE DATABASE blog;
use blog;

CREATE TABLE user (
  id INT NOT NULL auto_increment,
  roleId INT NOT NULL,
  firstName VARCHAR(80) NOT NULL,
  lastName VARCHAR(80) NOT NULL,
  email VARCHAR(100) NOT NULL,
  passwordHash VARCHAR(120) NOT NULL,
  slug VARCHAR(80) NOT NULL,
  birthDate DATETIME NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT(current_date()),
  updatedAt DATETIME NOT NULL DEFAULT(current_date()),
  CONSTRAINT PK_USER PRIMARY KEY (id),
  CONSTRAINT FK_USER_ROLEID_ROLE FOREIGN KEY (roleId) REFERENCES role(id) 
);
CREATE UNIQUE INDEX IX_USER_EMAIL ON user(email);
CREATE UNIQUE INDEX IX_USER_SLUG ON user(slug);

CREATE TABLE profile (
  id INT NOT NULL auto_increment,
  userId INT NOT NULL,
  bio VARCHAR(2000) NULL,
  image VARCHAR(1024) NULL,
  CONSTRAINT PK_PROFILE PRIMARY KEY (id),
  CONSTRAINT FK_PROFILE_USERID_USER FOREIGN KEY (userId) REFERENCES user(id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  slug VARCHAR(80) NOT NULL,
  CONSTRAINT PK_ROLE primary key (id)
);

CREATE UNIQUE INDEX IX_ROLE_SLUG on role(slug);

CREATE TABLE category(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  slug VARCHAR(80) NOT NULL,
  CONSTRAINT PK_CATEGORY PRIMARY KEY (id)
);

CREATE UNIQUE INDEX IX_CATEGORY_SLUG ON category(slug);

CREATE TABLE post (
  id INT NOT NULL AUTO_INCREMENT,
  categoryId INT NOT NULL,
  authorId INT NOT NULL,
  title VARCHAR(160) NOT NULL,
  summary varchar(255) NOT NULL,
  body TEXT NOT NULL,
  slug VARCHAR(80) NOT NULL,
  createdAt DATETIME DEFAULT(current_date()),
  updatedAt DATETIME DEFAULT(current_date()),
  CONSTRAINT PK_POST PRIMARY KEY (id),
  CONSTRAINT FK_POST_CATEGORY FOREIGN KEY (categoryId) REFERENCES category(id),
  CONSTRAINT FK_POST_AUTHOR FOREIGN KEY (authorId) REFERENCES user(id)
);
CREATE UNIQUE INDEX IX_POST_SLUG on post(slug);

CREATE TABLE tag (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  slug VARCHAR(80) NOT NULL,
  CONSTRAINT PK_TAG PRIMARY KEY (id)
);
CREATE UNIQUE INDEX IX_TAG_SLUG on tag(slug);

CREATE TABLE PostTag (
  tagId INT NOT NULL,
  postId INT NOT NULL,
  CONSTRAINT PK_POSTTAG PRIMARY KEY (tagId, postId)
);
