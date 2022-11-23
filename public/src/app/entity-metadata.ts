import { EntityDataModuleConfig, EntityMetadataMap } from "@ngrx/data";

// const entityMetaData: EntityMetadataMap = {
//     Post: {}
// };

const entityMetaData: EntityMetadataMap = {
    // optimisticUpdate lo que hace es que primero lo actualiza en la store, y despues hace la peticion http (puede fallar, en cuyo caso no deberia actualizar la store)
    // optimisticDelete lo mismo, primero lo borra de la store, y despues hace la peticion de borrado al server (puede fallar, en cuyo caso no deberia actualizar la store)
    // Si lo dejamos a false, primero hace la peticion, y despues, en funcion del resultado de la peticion, actualiza o no la store, que es el orden correcto
    Post: {
        // entityDispatcherOptions: {
        //     optimisticUpdate: true,
        //     optimisticDelete: false
        // },
        entityName: 'Post',
        selectId: (post) => post._id // Generalmente no necesitariamos esta propiedad, pero la utilizamos ya que mongo usa _id en sus registros
    }
};

export const entityConfig: EntityDataModuleConfig = {
    entityMetadata: entityMetaData
};