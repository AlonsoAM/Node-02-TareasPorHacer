const { v4: uuidv4 } = require('uuid')

class Tarea {
  id = ''
  descripcion = ''
  completadoEn = null

  constructor(desc) {
    this.id = uuidv4()
    this.descripcion = desc
    this.completadoEn = null
  }
}
module.exports = Tarea
