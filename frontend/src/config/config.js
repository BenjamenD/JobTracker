const BASE_URL = import.meta.env.MODE === "development" ? 
"http://localhost:5000": 
import.meta.env.VITE_PROD_URL;

export default BASE_URL;