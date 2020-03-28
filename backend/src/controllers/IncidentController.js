const connection = require('../database/connection');
module.exports = {
    async index (request, response){
        const {page = 1} = request.query;
        const [count] = await connection("incidents").count(); 
        console.log(count);
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=' , 'incidents.ong_id')
        .select([   'incidents.*',
                    'ongs.name', 
                    'ongs.whatsapp',
                    'ongs.email', 
                    'ongs.uf',
                    'ongs.city'])
        .limit(5)
        .offset((page-1)*5);
        response.header("X-Total-Count", count['count(*)']);
        return response.json(incidents);
        return response.json(incidents);
    },
    async create (request, response){
        const {name, descricao, value} = request.body;
        const ong_id = request.headers.authorization;
        const [id] = await connection('incidents').insert({
            name,
            descricao, 
            value, 
            ong_id
        });

        return response.json({id});
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if(incident.ong_id != ong_id){
            return response.status(401).json({error : "Operation  not permitted"});
        }
        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
    }
};