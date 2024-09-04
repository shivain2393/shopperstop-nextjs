import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link
      href={`/product/${product.id}/`}
      key={product.id}
      className="mt-20 w-400 h-400 cursor-pointer border p-4 rounded-lg shadow-md"
    >
      <Image
        src={product.thumbnail}
        width={300}
        height={300}
        alt="product-img"
        priority={true}
      />
      <h2 className="mt-2 text-center text-xl">{product.title}</h2>
    </Link>
  );
};

export default ProductCard;
