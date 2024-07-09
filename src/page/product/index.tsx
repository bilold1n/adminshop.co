import usegetdata from "../hooks/usegetdata";
export default function Product() {
  const { data, ispending, error } = usegetdata("products", "sa");
  console.log(data, ispending, error);

  return <div>Product</div>;
}
