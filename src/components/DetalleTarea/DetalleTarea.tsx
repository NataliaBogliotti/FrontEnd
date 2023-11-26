import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Task } from '../../types/Task';
import { TaskService } from '../../services/TaskService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const DetalleTarea = () => {

  const { taskId } = useParams<{ taskId?: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [estado, setEstado] = useState<string>('');
  const [relatedTasks, setRelatedTasks] = useState<Task[]>([]);

  const navigate = useNavigate(); //Redirigir al usuario a la pagina principal

  useEffect(() => {
    // OBTENER UNA TAREA

    const fetchTask = async () => {
      try {
        if (taskId && !isNaN(parseInt(taskId, 10))) {
          const taskData = await TaskService.getOneTask(parseInt(taskId, 10));
          setTask(taskData);

          const tasksInCategory = await TaskService.getTasksInCategory(taskData.estado);
          setRelatedTasks(tasksInCategory);
        } else {
          console.error('Identificador de tarea no válido');
        }
      }
      catch (error) {
        console.error('Error al cargar ña tarea: ', error);
      }
    };

    fetchTask();
  }, ([taskId]));


  //Cambiar estado de tarea
  const handleUpdateState = async () => {
    if (estado !== '') {
      try {
        const updatedTask = await TaskService.updateStateTask(parseInt(taskId!, 10), estado);

        //Actualiza la tarea local con la tarea actualizada
        setTask(updatedTask);

        //Muestra una notificacion de exito utilizando react-toastify

        toast.success('Estado de la tarea actualizado correctamente', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } catch (error) {
        //Maneja errores de la actualizacion de la tarea y muestra una notificacion de error
        toast.error('Error al actualizar el estado de la tarea', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        console.error('Error al actualizar el estado de la tarea', error);
      }
    } else {
      //si el estado está vacio muestra un mensaje de error  y una notificación

      toast.error('Selecciona un estado válido', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      console.error('Selecciona un estado válido');
    }
  };

  //Eliminar una tarea
  const handleDeleteTask = async () => {
    try {
      if (taskId) {
        await TaskService.deleteTask(parseInt(taskId, 10));
        toast.success('Tarea eliminada correctamente', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        console.log('Tarea eliminada con éxito')

        // Redirige al usuario a la página principal después de eliminar la tarea
        navigate('/');
      }
    } catch (error) {
      toast.error('Error al eliminar la tarea', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      console.error('Error al eliminar la tarea: ', error);
    }
  };

  return (
    <div className='container mt-5'>
      {task && (
        <div className='row'>
          <div className='col-12 col-md-6'>
            <img src={task.imagen} alt={task.titulo} className='card-img-top mb-5' />
          </div>

          <div className='col-12 col-md-6'>
            <h1 className='display-5 fw-bolder'> Titulo: {task.titulo}</h1>
            <h3>Detalles de la tarea con ID: {task.id}</h3>
            <h5>Estado actual: {task.estado}</h5>
            <p className='lead'>Tiempo: {task.tiempo}</p>
            <p className='lead'>Responsable: {task.responsable}</p>
            <p className='lead'>Descripción: {task.descripcion}</p>

            <select className='form-select mb-3' style={{ width: '200px' }} onChange={(e) => setEstado(e.target.value)} value={estado}>
              <option value="">Seleccionar estado</option>
              <option value="PORHACER">Por hacer</option>
              <option value="ENPRODUCCION">En producción</option>
              <option value="PORTESTEAR">Por testear</option>
              <option value="COMPLETADA">Completada</option>
            </select>

            <button className='btn btn-danger' onClick={handleDeleteTask}><i><Icon.Trash3 /></i></button>
            <button className='btn btn-primary ms-2' onClick={handleUpdateState}> Cambiar Estado</button>
            <button className='btn btn-danger ms-2' onClick={() => navigate('/')}>Salir</button>

          </div>
        </div>
      )}

      <div className="row mt-5">
        {relatedTasks.map((relatedTask) => {
          return (
            <div className='col-12 col-md-4 mb-4' key={relatedTask.id}>
              <div className='card'>
                <img src={relatedTask.imagen} alt={relatedTask.titulo} className='card-img-top' />
                <div className="card-body">
                  <h5 className='card-title'>{relatedTask.titulo}</h5>
                  <p className='card-text'> Tiempo: {relatedTask.tiempo}</p>
                  <p className='card-text'> Responsable: {relatedTask.responsable}</p>
                  <Button variant="primary" onClick={() => navigate(`/detalle/${relatedTask.id}`)}>Ver más</Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )





  return (
    <div>DetalleTarea</div>
  )


}

export default DetalleTarea