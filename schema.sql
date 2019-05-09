create database if not exists trivia_dev;
use trivia_dev;
CREATE TABLE if not exists users (
    name varchar(15) not null,
    dni int (8) not null,
    id int(11) not null auto_increment,
    admin BOOLEAN,
    password VARCHAR(56),
    primary key (id),
    unique(dni),
    created_at datetime,
    update_at datetime
    );

create table if not exists categories (
	id int(1) auto_increment  not null,
	category_name varchar(20),
	primary key(id),
    created_at datetime,
    update_at datetime
);

create table if not exists questions(
	id int auto_increment not null,
	descrip_q text, -- descripcion pregunta
	id_cat int(1) not null,
	user_id int(11),
    primary key (id),
    active BOOLEAN,
    constraint fkuser foreign key (user_id) references users (id),
	constraint fkquestion foreign key (id_cat) references categories (id),
    created_at datetime,
    update_at datetime
);
create table if not exists levels (
	id int(2) auto_increment not null,
    id_cate int(1) not null,
    constraint fklevel foreign key (id_cate) references categories (id),
    primary key(id),
    created_at datetime,
    update_at datetime
    );
    
create table if not exists options (
	id int(1) not null auto_increment primary key,
    descrip_o varchar(25),
    id_q int(1),
    correct boolean,
    constraint fktable foreign key (id_q) references questions (id)
    ON DELETE CASCADE,
    created_at datetime,
    update_at datetime
    );

create table if  not exists games(
	id int(50) not null auto_increment primary key,
    created_at datetime,
    update_at datetime
    );
    
create table if not exists answers (
	id int(1) not null auto_increment primary key,
    id_opcion int(1) not null,
    id_game int(50) not null,
    id_user int(50) not null,
    constraint fkgames foreign key (id_game) references games (id),
    constraint fkuser foreign key (id_user) references users(id),
    constraint fkanswer foreign key (id_opcion) references options(id),
    created_at datetime,
    update_at datetime
    );
    
create table if not exists statistics (
	id int(10) not null auto_increment primary key,
    created_at datetime,
    update_at datetime
    );


	
    
    
 

	
