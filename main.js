var generarIdUnicoDesdeFecha=()=>{
    let fecha = new Date();//03/02/2021
    return Math.floor(fecha.getTime()/1000).toString(16);
}, db;
var appVue = new Vue({
    el:'#appSistema',
    data:{
        forms:{
            'clientes':{mostrar:false},
            'lecturas':{mostrar:false},
        }
    },
    methods:{
        abrirBd(){
            let indexDb = indexedDB.open('db_sistema_aguapotable',1);
            indexDb.onupgradeneeded=event=>{
                let req=event.target.result,
                tblclientes = req.createObjectStore('tblclientes',{keyPath:'idCliente'}),
                tbllecturas = req.createObjectStore('tbllecturas',{keyPath:'idLectura'})

                    tblclientes.createIndex('idCliente','idCliente',{unique:true});
                    tblclientes.createIndex('codigo','codigo',{unique:false});
                    tblclientes.createIndex('id','id',{unique:false});

                    tbllecturas.createIndex('idLectura','idLectura',{unique:true});
                    tbllecturas.createIndex('codigo','codigo',{unique:false});
                    tbllecturas.createIndex('id','id',{unique:false});
            };
            indexDb.onsuccess = evt=>{
                db=evt.target.result;
            };
            indexDb.onerror=e=>{
                console.log("Error al conectar a la BD", e);
            };
        }
    },
    created(){
        this.abrirBd();
    }
});

document.addEventListener("DOMContentLoaded",event=>{
    let el = document.querySelectorAll(".mostrar").forEach( (element, index)=>{
        element.addEventListener("click",evt=>{
            appVue.forms[evt.target.dataset.form].mostrar = true;
            appVue.$refs[evt.target.dataset.form].obtenerDatos();
        });
    } );
});