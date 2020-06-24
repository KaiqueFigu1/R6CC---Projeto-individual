var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let sessoes = [];

/* Recuperar usuário por login e senha */
router.post('/autenticar', function (req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var login = req.body.login; // depois de .body, use o nome (name) do campo em seu formulário de login
	var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login	

	let instrucaoSql = `select * from Jogador where email='${login}' and senha='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.login);
			console.log('sessoes: ', sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('Login e/ou senha inválido(s)');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo login e senha!');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* Cadastrar usuário */
router.post('/cadastrar', function (req, res, next) {
	console.log('Criando um usuário');

	Usuario.create({
		nickname: req.body.nick,
		email: req.body.email,
		senha: req.body.senha,
		pontuacao: 0,
		adm: 0
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
		res.send(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


/* Verificação de usuário */
router.get('/sessao/:login', function (req, res, next) {
	let login = req.params.email;
	console.log(`Verificando se o usuário ${login} tem sessão`);

	let tem_sessao = false;
	for (let u = 0; u < sessoes.length; u++) {
		if (sessoes[u] == login) {
			tem_sessao = true;
			break;
		}
	}

	if (tem_sessao) {
		let mensagem = `Usuário ${login} possui sessão ativa!`;
		console.log(mensagem);
		res.send(mensagem);
	} else {
		res.sendStatus(403);
	}

});


/* Logoff de usuário */
router.get('/sair/:login', function (req, res, next) {
	let login = req.params.login;
	console.log(`Finalizando a sessão do usuário ${login}`);
	let nova_sessoes = []
	for (let u = 0; u < sessoes.length; u++) {
		if (sessoes[u] != login) {
			nova_sessoes.push(sessoes[u]);
		}
	}
	sessoes = nova_sessoes;
	res.send(`Sessão do usuário ${login} finalizada com sucesso!`);
});


/* Recuperar todos os usuários */
router.get('/', function (req, res, next) {
	console.log('Recuperando todos os usuários');
	Usuario.findAndCountAll().then(resultado => {
		console.log(`${resultado.count} registros`);

		res.json(resultado.rows);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* Buscar os 100 jogadores com a maior pontuação */
router.get('/buscarlideres', function (req, res, next) {
	console.log('Buscando jogadores')

	let instrucaoSql = "SELECT TOP (100) * FROM Jogador order by pontuacao desc;";
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		if (resultado.length == 0) {
			let erro = { texto: "Nenhum jogador foi encontrado" }
			res.send(erro)
		} else {
			let lideres = resultado;
			for (let cont = 0; cont < lideres.length; cont++) {
				console.log(`Nickname: ${lideres[cont].dataValues.nickname}, Pontuação: ${lideres[cont].dataValues.pontuacao}`)
			}
			res.send(lideres)
		}



	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});

});

/* Lado do administrador */

/* Rota para aparecer de acordo com o nickname digitado*/
router.post('/procurar', function (req, res, next) {
	console.log('Procurando o usuario digitado');
	let Nickname = req.body.nickname;
	Usuario.findAll({
		where: {
			nickname: Nickname
		}
	}).then(function (resultado) {
		console.log(resultado)
		res.send(resultado)
	})
});


/* Rota para publicar as novas pontuações */
router.post('/publicar', function (req, res, next) {
	console.log('Iniciando alteração de pontuação');
	let Nickname = req.body.nickname;
	let Pontos = req.body.pontuacao;

	Usuario.update({
		pontuacao: Pontos
	}, {
		where: {
			nickname: Nickname
		}
	}).then(resultado => {
		if (resultado.length > 0) {
			console.log(`${resultado.length} jogadores alterados`);
			res.send(resultado);
		}
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* Rotas para procurar lobby */

router.get('/contarjogadores', function (req, res, next) {
	Usuario.findAll().then(function (numJogador) {
		res.send(numJogador)
	});
});

router.post('/selecionarjogador', function(req, res, next){
	let idSorteado = req.body.num;
	console.log('ID Sorteado'+idSorteado)

	Usuario.findAll({
		where:{
			id: idSorteado
		}
	}).then(function(resposta){
		console.log('Jogador selecionado' + resposta);
		res.send(resposta);
	})
});

router.get('/sortearmapa', function(req, res, next){
	let mapPool = [
		'fronteira',
		'consulado',
		'casa_de_campo',
		'mansao',
		'cafe_dostoyevsky',
		'parque_tematico',
		'litoral'
	];

	let random = parseInt(Math.random() * mapPool.length);
	let mapaSorteado = {};
	mapaSorteado.mapa = mapPool[random];
	console.log(mapaSorteado,'   ---   ',random);
	res.send(mapaSorteado);
});
module.exports = router;
