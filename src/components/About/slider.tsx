import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // Import the gallery styles

interface SliderProps {
  images: string[];
}

export function Slider({ images }: SliderProps) {
  const imageArray = images.map((image) => ({
    original: image,
    thumbnail: image, // You can provide a smaller version for the thumbnail
    // description: "Image description here", // Optional description for each image
  }));

  return (
    <div className="w-96 max-w-full sm:w-64 md:w-full h-auto">
      <ImageGallery items={imageArray} />
    </div>
  );
}
