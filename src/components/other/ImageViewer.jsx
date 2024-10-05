export default function ImageViwer({ imageList }) {
  if (!imageList) {
    imageList = [];
  }
  return (
    <div>
      <div className="carousel w-full bg-gray-200">
        {imageList.map((image, index) => (
          <div
            id={`image${index}`}
            className="carousel-item w-full"
            key={index}
          >
            <img src={image} className="w-full aspect-[16/9] object-contain" />
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        {imageList.map((image, index) => (
          <a
            href={`#image${index}`}
            key={index}
            className="btn btn-xs btn-warning aspect-square"
          >
            {index + 1}
          </a>
        ))}
      </div>
    </div>
  );
}
