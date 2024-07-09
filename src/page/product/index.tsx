import usegetdata from "../hooks/usegetdata";
export default function Product() {
  const { data, isPending, error } = usegetdata("products", false);
  console.log(data, isPending, error);

  return <div>Product</div>;
}
