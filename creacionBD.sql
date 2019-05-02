CREATE TABLE if not exists users  (categories

    varchar(15) not null,
    dni int (8) not null,
    primary key (dni),
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
    
    
 

	
