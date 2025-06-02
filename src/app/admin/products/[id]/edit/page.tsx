import ProductEditClient from "./ProductEditClient";

interface Props {
  params: { id: string };
}

export default function ProductEditPage({ params }: Props) {
  return <ProductEditClient id={Number(params.id)} />;
}
