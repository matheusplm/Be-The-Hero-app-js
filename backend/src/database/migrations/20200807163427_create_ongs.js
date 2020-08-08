exports.up = function(knex) {
  return knex.schema.createTable('ongs',function(table){
    table.string('id').primary();
    table.string('nome').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('cidade').notNullable();
    //esse 2 é o tamanho do campo
    table.string('UF',2).notNullable();
  });
};

exports.down = function(knex) {
  knex.schema.dropTable('ongs');
};
