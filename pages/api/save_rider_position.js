import { save_rider_position } from "@/helpers/api";

export default function handler(request, response) {
    if (request.method === "POST") {
        const {rider_id, lat, long, timestamp} = request.body;
        const result = save_rider_position(rider_id, lat, long, timestamp);
        response.status(200).json({result});
    } else {
        response.status(401).json({error: "only POST request with {rider_id, lat, long, timestamp}"});
    }
}
