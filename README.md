cat > README.md <<'EOF'
# Traxxia API (Express + SQLite)

Minimal REST API for Execution (projects) and Monitoring (watchers).

## Getting started
npm install
npm start
# http://localhost:4000

## Endpoints

### Projects
- GET    /projects
- POST   /projects
- PUT    /projects/:id
- DELETE /projects/:id

### Watchers
- GET    /watchers  (filters: ?status=Warning&type=internal)
- POST   /watchers
- PUT    /watchers/:id
- DELETE /watchers/:id

## Notes
- DB file: db.sqlite (auto-created; do not commit)
- CORS open for dev; add validation before prod
