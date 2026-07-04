import { useParams } from 'react-router-dom';

export default function ItemDetail() {
  const { id } = useParams();
  const numericId = Number(id);

  return <h1>Item detail page — showing id: {numericId}</h1>;
}