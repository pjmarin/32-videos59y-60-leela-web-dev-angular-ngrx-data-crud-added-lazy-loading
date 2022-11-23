Los videos 50 al 58 son un proyecto nuevo, instalamos todo:

@ngrx/store
@ngrx/devtools
@ngrx/effects
@ngrx/entity

y ademas instalamos un paquete nuevo, que es el que vamos a utilizar:

@ngrx/data

Con este paquete, el boilerplate necesario para hacer que funcione la store se reduce muchisimo.
Basicamente creamos un archivo entity-metadata.ts, donde definimos una constante entityMetaData, que definira nuestras entidades.
En nuestro caso de momento solo tenemos la entidad "Post". Podriamos haberlo definido como:



entityConfig

const entityMetaData: EntityMetadataMap = {
    Post
};

pero le hemos agregado la propiedad selectId dentro de esa entidad, ya que en mongo tenemos _id en lugar de id, nos queda asi:

const entityMetaData: EntityMetadataMap = {
    Post: {
        entityName: 'Post',
        selectId: (post) => post._id		
    }
};

y en nuestro caso tambien le agregamos las entityDispatcherOptions, quedando asi:

const entityMetaData: EntityMetadataMap = {
    Post: {
        // entityDispatcherOptions: {
        //     optimisticUpdate: true,
        //     optimisticDelete: false
        // },
        entityName: 'Post',
        selectId: (post) => post._id
    }
};

optimisticUpdate lo que hace es que primero lo actualiza en la store, y despues hace la peticion http (puede fallar, en cuyo caso no deberia actualizar la store)
optimisticDelete lo mismo, primero lo borra de la store, y despues hace la peticion de borrado al server (puede fallar, en cuyo caso no deberia actualizar la store)
Si lo dejamos a false, primero hace la peticion, y despues, en funcion del resultado de la peticion, actualiza o no la store, que es el orden correcto


Tambien creamos un servicio por defecto --> post.service.ts, que es el estandar en el cual se envian las peticiones http a las url generadas por @ngrs/data (api/post)
Necesitamos crear un nuevo servicio personalizado --> posts-data.service.ts, que sobreescriba los metodos que nos proporciona @ngrx/data (getAll, add, update, delete, ...)
con los nuestros propios, que apuntaran a las url correctas que nosotros definamos.

Tambien creamos un resolver en el archivo posts.resolver.ts, que nos permitira refrescar la pagina sin tener que hacer una nueva peticion al servidor, en el caso de que
ya existan datos en la store (en caso contrario, es decir cuando la store no tiene datos (posts), vuelve a realizar la peticcion http)

