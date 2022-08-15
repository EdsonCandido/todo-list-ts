create table users (
	id int not null auto_increment,
	name varchar(255) not null,
	fullname varchar(255) not null,
	email varchar(255) not null,
	is_admin int not null default 0,
	document varchar(255) not null,
	password varchar(255) not null,
	created_at timestamp not null default current_timestamp,
	updated_at timestamp not null default current_timestamp,
	
	primary key(id)
);

create table todos(
	id int not null auto_increment,
	title varchar(255) not null,
	description text default null,
	
	user_id int not null,
	
	is_active int not null default 1,
	
	created_at timestamp not null default current_timestamp,
	updated_at timestamp not null default current_timestamp,
	
	primary key(id),
	
	foreign key (user_id) references users(id)
);