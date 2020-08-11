const connection = require('../database/connection');

module.exports={
    async create(request,response){
        const{titulo,descricao,valor}=request.body;

        const ong_id=request.headers.autenticar;
        const [id] = await connection('incidents').insert({
            titulo,
            descricao,
            valor,
            ong_id
        });

        return response.json({id});
    },

    async index(request,response){

        //paginação
        const{page= 1}=request.query;

        //contador de casos, no caso está entre cochetes para retornar apenas um valor
        const [numeroDeCasos]=await connection('incidents').count();

        //esses . imagina como se fosse uma programação no mysql workbench, igual tu aprendeu com o hudson
        const casos = await connection('incidents')
            .join('ongs','ongs.id','=','incidents.ong_id')
            .limit(5)
            .offset((page-1)*5)
            .select([
                'incidents.*'
                ,'ongs.nome'
                ,'ongs.UF'
                ,'ongs.cidade'
                ,'ongs.whatsapp'
                ,'ongs.email'
            ]);
        
        response.header('X-Total-Count',numeroDeCasos['count(*)']);

        return response.json(casos);
    },

    async delete(request,response){
        const {id} = request.params;
        const ong_id = request.headers.autenticar;

        const incident = await connection('incidents').where('id',id).select('ong_id').first();
        
        if(incident.ong_id!=ong_id){
            return response.status(401).json({error: 'não pode'});
        }

        await connection('incidents').where('id',id).delete();

        return response.status(204).send();
    }
}


