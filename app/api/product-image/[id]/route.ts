import products from "@/data/catalog.json";
import { Product } from "@/lib/types";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: RouteContext
) {
  const { id } = await params;

  const productList = products as Product[];

  const product = productList.find(
    (item) => item.id === id
  );

  const imageUrl =
    product?.images?.find(Boolean);

  if (!product || !imageUrl) {
    return new Response("Imagen no encontrada", {
      status: 404,
    });
  }

  try {
    const absoluteImageUrl = new URL(
      imageUrl,
      request.url
    );

    const imageResponse = await fetch(
      absoluteImageUrl,
      {
        cache: "force-cache",
      }
    );

    if (!imageResponse.ok) {
      return new Response(
        "No se pudo cargar la imagen",
        {
          status: 502,
        }
      );
    }

    const imageBuffer =
      await imageResponse.arrayBuffer();

    const contentType =
      imageResponse.headers.get(
        "content-type"
      ) ?? "image/jpeg";

    return new Response(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control":
          "public, max-age=86400, s-maxage=604800",
      },
    });
  } catch (error) {
    console.error(
      "Error loading product image:",
      error
    );

    return new Response(
      "No se pudo cargar la imagen",
      {
        status: 500,
      }
    );
  }
}