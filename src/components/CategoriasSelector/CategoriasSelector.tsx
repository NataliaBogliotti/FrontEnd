import { CardList } from "react-bootstrap-icons";
import { BsBookmarkCheck, BsCheck, BsGear, BsPencilSquare } from "react-icons/bs";


interface CategoriasSelectorProps {
  onSelectedCategory: (categoria: string) => void;
}

const CategoriasSelector: React.FC<CategoriasSelectorProps> = ({ onSelectedCategory }) => {
  const categorias = [
    { nombre: "TODAS", icono: <CardList /> },
    { nombre: "PORHACER", icono: <BsCheck /> },
    { nombre: "ENPRODUCCION", icono: <BsGear /> },
    { nombre: "PORTESTEAR", icono: <BsPencilSquare /> },
    { nombre: "COMPLETADA", icono: <BsBookmarkCheck /> },

  ];

  return (
    <section className="container mt-3" id="selector-categorias">
      <p className="fs-3">Seleccione una categoria</p>
      <div className="row gap-4">
        {categorias.map((categoria, index) => (
          <div className="col d-flex justify-content-center p-0" key={index}>
            <button
              onClick={() => onSelectedCategory(categoria.nombre)}
              className="border border-1 border-black d-flex gap-1 align-items-center rounded p-1 text-decoration-none"
              style={{ cursor: 'pointer' }}>
              {categoria.icono} {categoria.nombre}</button>
          </div>
        ))}

      </div>
    </section>
  )
}

export default CategoriasSelector
