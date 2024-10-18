import haversine from 'haversine-distance';
import { Client } from 'pg';


function calculateDistance(lat1, lon1, lat2, lon2) {
    const start = { lat: lat1, lng: lon1 };
    const end = { lat: lat2, lng: lon2 };
  
    const distance = haversine(start, end); // meters
  
    return distance;
}

export async function save_rider_position(rider_id, lat, long, timestamp) {
    const rows = await executeQuery("INSERT INTO rider_data (timestamp, lat, long, rider_id) VALUES ($1::timestamp, $2::numeric, $3::numeric, $4::int)", {timestamp, lat, long, rider_id});
}

export async function get_rider_for_restaurant(restaurant_id) {
    const {restaurant_lat, restaurant_long} = await executeQuery('SELECT lat as restaurant_lat, long as restaurant_long from restaurant WHERE restaurant_id=$1::int', [restaurant_id]);
    const info = await executeQuery("SELECT rider_id, lat, long FROM rider_data WHERE timestamp >= NOW() - INTERVAL '5 minutes'", []);
    const rider_distance_asc = info.map(entry => {
        const {rider_id, lat, long} = entry;
        const distance = calculateDistance(lat, long, restaurant_lat, restaurant_long);
        return {restaurant_id, rider_id, distance};
    }).sort((a, b) => a.distance - b.distance);
    return rider_distance_asc[0];
}

async function executeQuery(query, params) {
  const client = new Client({
    user: 'common',
    password: 'c0mm0n',
    database: 'test',
    host: '',
    port: 5432,
  });

  try {
    await client.connect();
    const result = await client.query(query, params);
    return result.rows;
  } catch (err) {
    console.error('Error executing query:', err);
  } finally {
    await client.end();
  }
}