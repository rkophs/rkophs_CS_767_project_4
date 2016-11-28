/*
* @Author: ryan
* @Date:   2016-11-25 09:18:56
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-25 12:30:53
*/

'use strict';

import { normalize, Schema, arrayOf } from 'normalizr';
import util from 'util'

class Table {
	constructor(name, schema) {
		this.name = name;
		this.schema = schema;
	}
	
	getName() {
		return this.name;
	}

	getSchema() {
		return this.schema;
	}

}

const handleObj(obj, tables, schemas) {
	Object.keys(obj).map(k => {
		const v = definition[k]
		if (v instanceof Table) {
			vName = v.getName();
			definition[k] = schemas[vName]
			console.log("FOUND TABLE")
		} else if (v instanceof Array) {

		} else if (v instanceof Object) {

		}
		console.log(v)
	})
	console.log(table.getSchema())
}

const helper = (tables) => {
	const schemas = tables.map(table => new Schema(table.getName()));
	tables.map(table => {
		return handleObj(table.getSchema(), tables, schemas)
	})
}
const generateSchema = (start, tables) => {
	return helper(tables);
}

const StateBuilder = (schema, start, tables ) => state => {

	generateSchema(start, tables);

	console.log(start)
	const startSchema = new Schema(start.getName());


	//console.log(schema.getItemSchema())
	const db = normalize(state, schema);
	Object.keys(db.entities).map((key) => {
		console.log(key)
		console.log(schema[key])
	})

	return {
		state: () => db
	}
}

const USER = new Table('users', {});

const ARTICLE = new Table('articles', {
	author: USER,
	readers: [USER]
});

const user = new Schema('users');
const article = new Schema('articles');
article.define({
  author: user,
  readers: arrayOf(user),
});
// console.log(article)
// console.log("====")
const state = [{
	  id: 1,
	  title: 'Some Article',
	  author: {
	    id: 1,
	    name: 'Dan'
	  },
	  readers: [{id: 3, name: 'Ryan'}, {id: 4, name: 'Jeff'}]
	}, {
	  id: 2,
	  title: 'Other Article',
	  author: {
	    id: 1,
	    name: 'Dan'
	  } 
	}];

const ArticleStateBuilder = StateBuilder(arrayOf(article), ARTICLE, [ARTICLE, USER]);
const result = ArticleStateBuilder(state).state();

console.log(util.inspect(result, false, null))
console.log(result.result)

result.result.map((r) => console.log(r + 2))

const iterOverride = (iter, funcName, ref) => {
	const oldFuncName = `old_${funcName}`;
	iter[oldFuncName] = iter[funcName];
	iter.map = oldLambda => iter[oldFuncName](id => oldLambda(ref[id]));
	return iter;
}

result.result = iterOverride(result.result, 'map', result.entities.articles)

result.result.map((r) => console.log(r))







