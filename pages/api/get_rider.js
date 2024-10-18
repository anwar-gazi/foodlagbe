import { get_rider_for_restaurant } from "@/helpers/api";

export default function handler(request, response) {
    const {restaurant_id} = request.body;
    const {rider_id, distance} = get_rider_for_restaurant(restaurant_id);
    response.status(200).json({rider_id, distance});
}
