import React, { Component } from 'react'
import M from "materialize-css"

class App extends Component {
  constructor(){
    super()
    this.state = {
      titulo : '',
      descripcion : '',
      server: '',
      tareas: [],
      _id : ''
    }
    this.addTask = this.addTask.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.fetchTasks = this.fetchTasks.bind(this)
    this.eliminarTarea = this.eliminarTarea.bind(this)
    this.modificarTarea = this.modificarTarea.bind(this)
  }
  addTask(e) {
    e.preventDefault()
    if(this.state._id){
      fetch(`${this.state.server}/api/tasks/${this.state._id}`,{
        method: 'PUT',
        body: JSON.stringify(this.state),
        headers : {
          'Accept': 'application/json',
          'Content-Type' : 'application/json'
        }
      })
      .then(res=>res.json())
      .then(data=>{
        M.toast({
          html: 'Tarea modificada'
        })
        this.setState({
          titulo: '',
          descripcion: '',
          _id: ''
        })
        this.fetchTasks()
      })
    }else{
      fetch(this.state.server+'/api/tasks',{
        method: 'POST',
        body: JSON.stringify(this.state),
        headers : {
          'Accept': 'application/json',
          'Content-Type' : 'application/json'
        }
      })
      .then(res=>res.json())
      .then(data => {
        M.toast({
          html: 'Tarea guardada'
        })
        this.setState({
          titulo: '',
          descripcion: ''
        })
        this.fetchTasks()
      })
      .catch(err=>console.log(err))
    }
  }
  
  componentDidMount(){
    this.fetchTasks()
  }

  fetchTasks(){
    fetch(this.state.server+'/api/tasks')
        .then(res=>res.json())
        .then(data=> {
          this.setState({tareas: data})
        })
  }

  handleChange(e){
    const { name, value } = e.target
    this.setState({
      [name]:value
    })
  }

  modificarTarea(id){
    fetch(`${this.state.server}/api/tasks/${id}`)
    .then(res => res.json())
    .then(data=> {
      this.setState({
        titulo: data.titulo,
        descripcion: data.descripcion,
        _id : data._id
      })
    })
  }

  eliminarTarea(id){
    fetch(`${this.state.server}/api/tasks/${id}`,{
      method: 'DELETE',
      headers : {
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
      }
    })
    .then(res=> res.json())
    .then(data=>{
      M.toast({
        html:'Tarea eliminada'
      })
      this.fetchTasks()
    })   
  }

  render() {
    return (
      <div>
        {/* Navegación */}
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="/">MERN stack</a>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input type="text" placeholder="Titulo de la tarea" name="titulo" onChange={this.handleChange} value={this.state.titulo} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea className="materialize-textarea" placeholder="Descripcion" name="descripcion" onChange={this.handleChange}value={this.state.descripcion} ></textarea>
                      </div>
                    </div>
                    <button type="submit" className="btn light-blue darken-4">Enviar</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Titulo</th>
                    <th>Descripcion</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.tareas.map(task => {
                      return(
                        <tr key={task._id}>
                          <td>{task.titulo}</td>
                          <td>{task.descripcion}</td>
                          <td>
                            <button className="btn light-blue darken-4" onClick={()=> this.eliminarTarea(task._id)}>
                              <i className="material-icons">delete</i>
                            </button>
                            <button className="btn light-blue darken-4" style={{margin:'4px'}} onClick={()=>this.modificarTarea(task._id)}>
                              <i className="material-icons">edit</i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
