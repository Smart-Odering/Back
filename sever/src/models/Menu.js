"use strict";

const db = require("../config/db");

// 쿼리
const getCategoryQuery = "SELECT * FROM Menu WHERE catergory = ?;"

class Menu{
    static async getMenuByCategory(categoryId)
    {
        return new Promise((resolve, reject) =>{
            const query = getCategoryQuery;
            db.query(query, [categoryId], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
}
