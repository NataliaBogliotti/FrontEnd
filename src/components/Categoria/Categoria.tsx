import { useEffect, useState } from "react";
import { Task } from "../../types/Task";
import CategoriasSelector from "../CategoriasSelector/CategoriasSelector";
import CategoriasTareas from "../CategoriasTareas/CategoriasTareas";
import { TaskService } from "../../services/TaskService";

const Categoria = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); //Estado para la categoria seleccionar

  useEffect(() => {
    const fetchTasks = async () => {
      const taskData = await TaskService.getAllTasks();
      setTasks(taskData);
    };

    fetchTasks();
  }, []);

  //filtra las tareas por la categoria seleccionada

  const filteredTasks = selectedCategory
    ? selectedCategory !== "TODAS" ? tasks.filter(task => task.estado.toUpperCase() === selectedCategory.toUpperCase())
    : tasks : tasks;



  return (
    <div className="container mt-5">
      <CategoriasSelector onSelectedCategory={setSelectedCategory} />;{/*Pasa la funcion para manejar la seleccion de categoria*/}
      <CategoriasTareas tasks={filteredTasks} />{/*pasa las tareas filtradas al componenete categoriasTareas */}
    </div>

  )
}

export default Categoria
