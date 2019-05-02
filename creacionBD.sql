CREATE TABLE if not exists users (
    name varchar(15) not null,
    apellido varchar(15) not null,
    dni int (8) not null,
    primary key (dni),
    unique(dni),
    created_at datetime,
    update_at datetime
    );

create table if not exists categories (
	id_category int(1) auto_increment  not null,
	category_name enum ('1','2','3','4','5','6'),
	primary key(id_category),
    created_at datetime,
    update_at datetime
);

create table if not exists questions(
	id_q int auto_increment not null,
	descrip_q text, -- descripcion pregunta
	id_cat int(1) not null,
    primary key (id_q),
	constraint fkquestion foreign key (id_cat) references categories (id_category),
    created_at datetime,
    update_at datetime
);
create table if not exists levels (
	id_level int(2) auto_increment not null,
    id_cate int(1) not null,
    constraint fklevel foreign key (id_cate) references categories (id_category),
    primary key(id_level),
    created_at datetime,
    update_at datetime
    );
    
create table if not exists options (
	id_option int(1) not null auto_increment primary key,
    descrip_o varchar(25),
    id_q int(1),
    constraint fktable foreign key (id_q) references questions (id_q),
    created_at datetime,
    update_at datetime
    );

create table if not exists answers (
	id_answers int(1) not null auto_increment primary key,
    answ text not null,
    id_opcion int not null,
    constraint fkanswer foreign key (id_opcion) references options (id_option),
    created_at datetime,
    update_at datetime
    );
    
create table if not exists statistics (
	id_stat int(10) not null auto_increment primary key,
    created_at datetime,
    update_at datetime
    );

create table if  not exists games(
	id_game int not null auto_increment primary key,
    created_at datetime,
    update_at datetime
    );
	
    
    
 

	
