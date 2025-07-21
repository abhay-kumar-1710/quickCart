
import { Product } from "@/models/product";
import { Testimonials } from "@/models/testimonials";

export async function createReview(userId, productId, formData) {
  try {
    const newTestimonial = await Testimonials.create({
      userId,
      productId,
      rating: formData.rating,
      review: formData.review,
      reviewOnDate: Date.now(),
    });

    // update the product to include testimonial id
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
          $push: { testimonials : newTestimonial},
        }, {new : true});
    
        if (!updatedProduct) {
          throw new Error(
            "Failed To update the product to include testimonial id"
          );
        }

    return newTestimonial;
  } catch (error) {
    throw new Error(error);
  }
}