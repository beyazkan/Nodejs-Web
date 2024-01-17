const connection = require('../utility/database.js');

module.exports = class Category{

    constructor(name, description){
        this.name = name;
        this.description = description;
    }

    saveCategory(){
        return connection.execute('INSERT INTO categories(name, description) VALUES(?, ?)',[this.name, this.description])
    }

    static getAll(){
        return connection.execute('SELECT * FROM categories c');
    }

    static getByID(id){
        return connection.execute('SELECT * FROM categories c WHERE c.id = ?', [id])
    }

    static update(category){
        return connection.execute('UPDATE categories c SET c.name=?, c.description=?',[category.name, category.description]);
    }

    static deleteById(id){
        return connection.execute('DELETE FROM categories c WHERE c.id=?',[id]);
    }

}