
use r6cc;
create table Jogador(
	idJogador int primary key identity,
	nickname varchar(25) not null unique,
	email varchar(255) not null unique,
	senha varchar(255) not null,
	pontuacao int,
	adm int
);

create table Team(
	idTime int primary key identity,
	cor varchar(15)
);

create table Time_Jogador(
	idTime_Jogador int primary key,
	fkTime int, foreign key(fkTime) references Team(idTime),
	fkJogador int, foreign key(fkJogador) references Jogador(idJogador)
);

create table Confronto(
	idConfronto int primary key identity,
	fkTimeA int, foreign key(fkTimeA) references Time_Jogador(idTime_Jogador),
	fkTimeB int, foreign key(fkTimeB) references Time_Jogador(idTime_Jogador),
	vencedor char, check(vencedor = 'A' or vencedor = 'B'),
	dia date
);

SELECT * FROM Jogador;
