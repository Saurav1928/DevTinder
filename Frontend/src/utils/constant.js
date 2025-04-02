const BACKEND_URL = window.location.hostname === "localhost"
    ? "http://localhost:7000"
    : "/api"

export default BACKEND_URL
