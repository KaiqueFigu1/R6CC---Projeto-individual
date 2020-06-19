'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Usuario = sequelize.define('Usuario',{
		id: {
			field: 'idjogador',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nickname: {
			field: 'nickname',
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			field: 'email',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			field: 'senha',
			type: DataTypes.STRING,
			allowNull: false
		},
		pontuacao: {
			field: 'pontuacao',
			type: DataTypes.INTEGER,
			allowNull: false
		},
	}, 
	{
		tableName: 'jogador', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Usuario;
};
