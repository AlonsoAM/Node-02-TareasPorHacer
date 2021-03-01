require('colors')
const { guardarDB, leerDB } = require('./helpers/guardarArchivo')
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} = require('./helpers/inquirer')
const Tareas = require('./models/tareas')

const main = async () => {
  let opt = ''
  const tareas = new Tareas()
  const tareasDB = leerDB()

  if (tareasDB) {
    // Establecer las tareas
    tareas.cargarTareasFromArray(tareasDB)
  }

  do {
    opt = await inquirerMenu()

    switch (opt) {
      case '1':
        //crear opcion
        const desc = await leerInput('Descrpción:')
        tareas.crearTarea(desc)
        break
      case '2':
        // Listar tareas
        tareas.listadoCompleto()
        break
      case '3':
        // Listar tareas completadas
        tareas.listarPendientesCompletadas(true)
        break
      case '4':
        // Listar tareas pendientes
        tareas.listarPendientesCompletadas(false)
        break
      case '5':
        // Completar tarea
        const ids = await mostrarListadoCheckList(tareas.listadoArr)
        tareas.toggleCompletadas(ids)
        break
      case '6':
        // Borrar tarea
        const id = await listadoTareasBorrar(tareas.listadoArr)
        if (id !== '0') {
          const ok = await confirmar('¿Está seguro?')
          if (ok) {
            tareas.borrarTarea(id)
            console.log('Tarea borrada con éxito')
          }
        }

        // TODO: pregguntar si está seguro
        break
    }

    guardarDB(tareas.listadoArr)

    await pausa()
  } while (opt !== '0')
}

main()
