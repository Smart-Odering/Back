"use strict";

const { resolveInclude } = require("ejs");
const db = require("../config/db");
const logger = require("../config/logger");

// 쿼리
const getCategoryQuery = "SELECT id FROM Category WHERE name = ?;"
const getMenuQueryByQuery = "SELECT * FROM Menu WHERE category_id = ?;"
const getMenuQuery = "SELECT * FROM Menu WHERE id = ?;"
class Menu{
	static async getMenuByCategory(categoryId)
	{
		return new Promise((resolve, reject) =>{
			const query = getMenuQueryByQuery;
			const execSql = db.query(query, [categoryId], (err, data) => {
				if (err) reject(err);
				else resolve(data);
			});
			logger.info(execSql.sql);
		});
	}

	static async getCategoryId(catergoryName)
	{
		return new Promise((resolve, reject) => {
			const query = getCategoryQuery;
			const execSql = db.query(query, [catergoryName], (err, data) => {
				if (err) reject(err);
				else resolve(data[0].id);
			});
			logger.info(execSql.sql);
		})
	}

	static async getMenu(menuID)
	{
		return new Promise((resolve, reject) => {
			const query = getMenuQuery;
			const execSql = db.query(query, [menuID], (err, data) => {
				if (err) reject(err);
				else resolve(data);
			});
			logger.info(execSql.sql);
		})
	}
}

module.exports = Menu;