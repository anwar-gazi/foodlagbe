# Backend_Minhajul

#### warning: unstable, untested

## Installation

### Database initialization

```sql
CREATE TABLE rider_data (
    timestamp TIMESTAMP NOT NULL,
    lat NUMERIC(10, 6) NOT NULL,
    long NUMERIC(10, 6) NOT NULL,
    rider_id INTEGER NOT NULL
);

CREATE TABLE restaurant (
    lat NUMERIC(10, 6) NOT NULL,
    long NUMERIC(10, 6) NOT NULL,
    restaurant_id INTEGER NOT NULL
);
```

#### improvement: using migration 

### scaffolding

`npm install`

## usage

### start dev server
`npm run dev`

### api endpoint to save rider position

POST: http://localhost:3000/api/save_rider_position
<br>
POST body: {rider_id, lat, long, timestamp}

### api endpoint to get closest rider (for a restaurant_id)

GET: http://localhost:3000/api/get_rider
<br>
GET param: {restaurant_id}