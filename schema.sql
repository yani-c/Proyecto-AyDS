create database if not exists trivia_dev;
use trivia_dev;
CREATE TABLE if not exists users (
    username varchar(15) not null,
    dni int (8) not null,
    id int(11) not null auto_increment,
    administrator BOOLEAN,
    password VARCHAR(56),
    primary key (id),
    unique(dni), unique(username),
    created_at datetime,
    update_at datetime
    );

create table if not exists categories (
	id int(1) auto_increment  not null,
	category_name varchar(20) not null,
	primary key(id),
    unique(category_name),
    created_at datetime,
    update_at datetime
);

create table if not exists questions(
	id int auto_increment not null,
	description varchar(100), -- descripcion pregunta
	category_id int(1) not null,
	user_id int(11),
    primary key (id),
    active BOOLEAN,
    constraint fkuser foreign key (user_id) references users (id),
	constraint fkcategory foreign key (category_id) references categories (id),
    unique(description),
    created_at datetime,
    update_at datetime
);
create table if not exists levels (
	id int(2) auto_increment not null,
    lvl int(2) not null default 0,  
    category_id int(1) not null,
    constraint fklevel foreign key (category_id) references categories (id),
    primary key(id),
    created_at datetime,
    update_at datetime
    );
    
create table if not exists options (
	id int(1) not null auto_increment primary key,
    description varchar(100),
    question_id int(11),
    correct boolean,
    constraint fktable foreign key (question_id) references questions (id)
    ON DELETE CASCADE,
    unique(description),
    created_at datetime,
    update_at datetime
    );

create table if not exists answers (
	id int(1) not null auto_increment primary key,
    option_id int(1) not null,
    user_id int(50) not null,
    constraint fkusere foreign key (user_id) references users(id),
    constraint fkanswer foreign key (option_id) references options(id),
    created_at datetime,
    update_at datetime
    );

create table if not exists statistics (
	id int(11) not null auto_increment primary key,
	user_id int(50) not null,
    correct int(11), incorrect int(11),
    constraint fku foreign key(user_id) references users(id),
    created_at datetime,
    update_at datetime
    );
    
    

    
    
 

	
